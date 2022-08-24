import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '../app/store/store';
import Authenticate from '../app/providers/Authenticate';
import { parseCookies } from 'nookies';
import { setAuthData } from '../app/store/reducers/AuthSlice';
import axios from 'axios';
import { setUserData } from '../app/store/reducers/UserSlice';
import { AuthResponse, RefreshRequest } from '../app/models/api/auth/types';
import { useMemo } from 'react';

function App({ Component, pageProps }: AppProps) {
	return (
		<Authenticate><Component {...pageProps} /></Authenticate>
	);
}

App.getInitialProps = wrapper.getInitialAppProps(
	(store) =>
		async ({ ctx, Component }) => {
			const redirectToLogin = () => {
				console.log('redirectToLogin');

				if (ctx.res && ctx.asPath !== '/auth/login/') {
					console.log('redirected');

					ctx.res.writeHead(302, {
						Location: '/auth/login/',
						credentials: 'include',
					});

					ctx.res.end();
				}
			};

			const redirectToHome = () => {
				console.log('redirectToHome');

				if (ctx.res && ctx.asPath === '/auth/login/') {
					console.log('redirected');
					ctx.res.writeHead(302, {
						Location: '/',
						credentials: 'include',
					});
					ctx.res.end();
				}
			};

			const getAndSetUserData = async (
				token: string,
				isTokenNew: boolean = false
			) => {
				const userData = await axios.get(`${process.env.APP_URL}/api/user/me`, {
					headers: { authorization: `Bearer ${token}` },
				});

				if (!store.getState().user.data) {
					store.dispatch(setUserData(userData.data));
				}
				if (isTokenNew) {
					store.dispatch(setAuthData({ token, isAuth: true }));
				}
			};

			const refresh = async (rToken: string) => {
				console.log('refresh');

				const tokens = await axios.post<AuthResponse>(
					`${process.env.APP_URL}/api/auth/refresh`,
					{
						refresh_token: rToken,
					} as RefreshRequest,
					{ withCredentials: true }
				);

				tokens.headers['set-cookie']?.map((cookie) =>
					ctx.res?.setHeader('set-cookie', cookie)
				);

				return tokens.data;
			};

			const refreshAll = async (rToken: string) => {
				console.log('refreshAll');

				try {
					const { token } = await refresh(rToken);

					await getAndSetUserData(token, true);

					redirectToHome();
				} catch (e) {
					redirectToLogin();
				}
			};

			const token =
				parseCookies(ctx).vyatsu_a_token || store.getState().auth.token;
			const rToken = parseCookies(ctx).vyatsu_r_token;

			console.log(parseCookies(ctx));

			// store.dispatch(setAuthData({ token, isAuth: false }));

			if (token) {
				try {
					console.log(token);
					await getAndSetUserData(token);

					redirectToHome();
				} catch (e) {
					// @ts-ignore
					if (e?.response?.status !== 401 || !rToken) {
						redirectToLogin();
					}

					await refreshAll(rToken);
				}
			} else if (rToken) {
				await refreshAll(rToken);
			} else {
				redirectToLogin();
			}

			return {
				pageProps: {
					// Call page-level getInitialProps
					...(Component.getInitialProps
						? await Component?.getInitialProps({ ...ctx, store })
						: {}
					),
					// Some custom thing for all pages
					// pathname: ctx.pathname,
				},
			};
		}
);

export default wrapper.withRedux(App);
