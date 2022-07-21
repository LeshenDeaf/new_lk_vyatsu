import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '../app/store/store';
import Authenticate from '../app/providers/Authenticate';
import { parseCookies } from 'nookies';
import { setAuthData } from '../app/store/reducers/AuthSlice';
import axios from 'axios';
import { setUserData } from '../app/store/reducers/UserSlice';
import { AuthResponse, RefreshRequest } from '../app/models/api/auth/types';

function App({ Component, pageProps }: AppProps) {
	return (
		<Authenticate>
			{/*<PageLoader>*/}
				<Component {...pageProps} />
			{/*</PageLoader>*/}
		</Authenticate>
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
					// ctx.res.setHeader('Status', 302);
					// ctx.res.setHeader('Location', '/');
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

			const getAndSetUserData = async (token: string) => {
				console.log('getAndSetUserData');
				const userData = await axios.get(`${process.env.APP_URL}/api/user/me`, {
					headers: { authorization: `Bearer ${token}` },
				});

				store.dispatch(setUserData(userData.data));
				store.dispatch(setAuthData({ token, isAuth: true }));
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

				store.dispatch(setAuthData({ token: tokens.data.token, isAuth: true }));

				return tokens.data;
			};

			const refreshAll = async (rToken: string) => {
				console.log('refreshAll');

				try {
					const { token } = await refresh(rToken);
					store.dispatch(setAuthData({ token, isAuth: true }));

					await getAndSetUserData(token);

					redirectToHome();
				} catch (e) {
					redirectToLogin();
				}
			};

			const token = parseCookies(ctx).vyatsu_a_token;
			const rToken = parseCookies(ctx).vyatsu_r_token;

			console.log(parseCookies(ctx));

			// store.dispatch(setAuthData({ token, isAuth: false }));

			if (token) {
				try {
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
				pageProps: Component.getInitialProps
					? await Component.getInitialProps({ ...ctx, store })
					: {},
			};
		}
);

export default wrapper.withRedux(App);
