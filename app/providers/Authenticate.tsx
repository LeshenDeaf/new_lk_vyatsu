import React, {
	FC,
	useCallback,
	useEffect,
} from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../components/layout/AuthLayout';
import NotAuthLayout from '../components/layout/NotAuthLayout';
import { useAppSelector } from '../hooks/redux';
import { selectUser } from '../store/reducers/UserSlice';

type AuthProps = {
	children: JSX.Element;
};

const Authenticate: FC<AuthProps> = ({ children }) => {
	const router = useRouter();
	const { data: user } = useAppSelector(selectUser);

	const authCheck = useCallback(
		(url: string) => {
			// redirect to login page if accessing a private page and not logged in
			const publicPaths = ['/auth/login/'];
			const path = url.split('?')[0];

			if (!user && !publicPaths.includes(path)) {
				router.push({
					pathname: '/auth/login',
					query: { returnUrl: router.asPath },
				});
			}
		},
		[router, user]
	);

	useEffect(() => {
		// run auth check on initial load
		authCheck(router.asPath);

		// run auth check on route change
		router.events.on('routeChangeComplete', authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			router.events.off('routeChangeComplete', authCheck);
		};
	}, [authCheck, router]);

	if (router.pathname === '/auth/login') {
		return (
			<NotAuthLayout description="DESC">
				{children}
			</NotAuthLayout>
		);
	}

	return (
		<AuthLayout description="DESC">
			{children}
		</AuthLayout>
	);
};

export default Authenticate;
