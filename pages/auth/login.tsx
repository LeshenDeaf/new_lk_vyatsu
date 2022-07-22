import React, { useCallback } from 'react';
import { NextPage } from 'next';
import LoginForm from '../../app/components/screens/auth/form/LoginForm';
import Fio from '../../app/components/screens/user/Fio';
import Link from 'next/link';
import { useLoginMutation } from '../../app/services/auth/AuthService';
import { SubmitHandler } from 'react-hook-form';
import { selectAuth, setAuthData } from '../../app/store/reducers/AuthSlice';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { setUserData } from '../../app/store/reducers/UserSlice';
import { ILoginFormFields } from '../../app/components/screens/auth/form/types';
import { useRouter } from 'next/router';
import { LoginRequest } from '../../app/models/api/auth/types';

const Login: NextPage = () => {
	const [login, loginRes] = useLoginMutation();
	const dispatch = useAppDispatch();
	const { token } = useAppSelector(selectAuth);
	const router = useRouter();

	const onSubmit: SubmitHandler<ILoginFormFields> = useCallback(
		async (data) => {
			const res = await login(data as LoginRequest);

			if ('data' in res) {
				dispatch(setAuthData(res.data));

				try {
					const userData = await axios.get(
						`${process.env.APP_URL}/api/user/me`,
						{ headers: { authorization: `Bearer ${res.data.token}` } }
					);

					dispatch(setUserData(userData.data));

					await router.push('/');
				} catch (e) {
					console.error(e);
				}
			}
		},
		[router, dispatch, login]
	);

	return (
		<>
			<LoginForm onSubmit={onSubmit} isLoading={loginRes.isLoading} />
			<Fio />
			<Link href={process.env.APP_URL as string}>
				<a>Главная страница</a>
			</Link>
		</>
	);
};

// export const getServerSideProps: GetServerSideProps =
// 	wrapper.getServerSideProps((store) => async (ctx) => {
//
//
// 		return {
// 			props: { },
// 		};
// 	});

export default Login;
