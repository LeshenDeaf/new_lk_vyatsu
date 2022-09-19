import axios from 'axios';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ILoginFormFields } from '../../app/components/screens/auth/form/types';
import { useAppDispatch } from '../../app/hooks/redux';
import { LoginRequest } from '../../app/models/api/auth/types';
import { useLoginMutation } from '../../app/services/auth/AuthService';
import { setAuthData } from '../../app/store/reducers/AuthSlice';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { setUserData } from '../../app/store/reducers/UserSlice';
import { wrapper } from '../../app/store/store';
// import LoginForm from '../../app/components/screens/auth/form/LoginForm';
const DynamicLoginForm = dynamic(
	() => import('../../app/components/screens/auth/form/LoginForm'),
	{
		suspense: true,
	}
);

const Login: NextPage = () => {
	const [login, loginRes] = useLoginMutation();
	const dispatch = useAppDispatch();
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
		<DynamicLoginForm onSubmit={onSubmit} isLoading={loginRes.isLoading} />
	);
};

export default Login;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Авторизация'));

		return { props: {} };
	}
);
