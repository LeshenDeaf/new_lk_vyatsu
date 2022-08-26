import axios from 'axios';
import type { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { Provider } from 'react-redux';
import { AuthResponse, RefreshRequest } from '../app/models/api/auth/types';
import Authenticate from '../app/providers/Authenticate';
import { setAuthData } from '../app/store/reducers/AuthSlice';
import { setUserData } from '../app/store/reducers/UserSlice';
import { wrapper } from '../app/store/store';
import '../styles/globals.scss';

function App({ Component, ...rest }: AppProps) {
	const { store, props } = wrapper.useWrappedStore(rest);

	return (
		<Provider store={store}>
			<Authenticate>
				<Component {...props.pageProps} />
			</Authenticate>
		</Provider>
	);
}

App.getInitialProps = wrapper.getInitialAppProps(
	(store) =>
		async ({ ctx, Component }) => {
			const redirectToLogin = () => {
				if (ctx.res && ctx.asPath !== '/auth/login/') {
					ctx.res.writeHead(302, {
						Location: '/auth/login/',
						credentials: 'include',
					});

					ctx.res.end();
				}
			};

			const redirectToHome = () => {
				if (ctx.res && ctx.asPath === '/auth/login/') {
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
					console.log('setting auth data')
					store.dispatch(setAuthData({ token, isAuth: true }));
				}
			};

			const refresh = async (rToken: string) => {
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
				console.log('refreshed');
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

			if (token) {
				try {
					console.log('getting user data')
					await getAndSetUserData(token, true);

					redirectToHome();
				} catch (e) {
					console.log('trying to refresh')

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
						: {}),
					// Some custom thing for all pages
					// pathname: ctx.pathname,
				},
			};
		}
);

// export default wrapper.withRedux(App);
export default App;
