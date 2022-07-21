import React, {
	FC,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
import useIsServer from '../hooks/useIsServer';
import AuthLayout from '../components/layout/AuthLayout';
import NotAuthLayout from '../components/layout/NotAuthLayout';
import PageLoader from '../components/screens/loaders/PageLoader';
import { useAppSelector } from '../hooks/redux';
import { selectUser } from '../store/reducers/UserSlice';

type AuthProps = {
	children: JSX.Element;
};

const Authenticate: FC<AuthProps> = ({ children }) => {
	const router = useRouter();
	const { data: user } = useAppSelector(selectUser);
	const [authorized, setAuthorized] = useState(false);

	const authCheck = useCallback(
		(url: string) => {
			// redirect to login page if accessing a private page and not logged in
			const publicPaths = ['/auth/login/'];
			const path = url.split('?')[0];

			if (!user && !publicPaths.includes(path)) {
				setAuthorized(false);
				router.push({
					pathname: '/auth/login',
					query: { returnUrl: router.asPath },
				});
			} else {
				setAuthorized(true);
			}
		},
		[router, user]
	);

	useEffect(() => {
		// run auth check on initial load
		authCheck(router.asPath);

		// set authorized to false to hide page content while changing routes
		const hideContent = () => setAuthorized(false);
		router.events.on('routeChangeStart', hideContent);

		// run auth check on route change
		router.events.on('routeChangeComplete', authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			router.events.off('routeChangeStart', hideContent);
			router.events.off('routeChangeComplete', authCheck);
		};
	}, [authCheck, router]);

	if (router.pathname === '/auth/login') {
		return (
			<NotAuthLayout title="TITLE" description="DESC">
				{children}
			</NotAuthLayout>
		);
	}

	return (
		<AuthLayout title="TITLE" description="DESC">
			{children}
		</AuthLayout>
	);
};

export default Authenticate;
