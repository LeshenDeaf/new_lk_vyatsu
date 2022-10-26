import axios from 'axios';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Suspense, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormFields } from '../../app/components/screens/auth/form/types';
import { useAppDispatch } from '../../app/hooks/redux';
import { LoginRequest } from '../../app/models/api/auth/types';
import { useLoginMutation } from '../../app/services/auth/AuthService';
import { setAuthData } from '../../app/store/reducers/AuthSlice';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { setUserData } from '../../app/store/reducers/UserSlice';
import { wrapper } from '../../app/store/store';

const DynamicLoginForm = dynamic(
	() => import('../../app/components/screens/auth/form/LoginForm'),
	{
		suspense: true,
		ssr: false,
	}
);

const Login: NextPage = () => {
	const [login, loginRes] = useLoginMutation();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<ILoginFormFields>();

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
			} else if (
				typeof res === 'string' || res instanceof String ||
				'error' in res &&
				'data' in res.error &&
				'errors' in (res.error.data as any)
			) {
				setError('login', {
					type: 'custom',
					message: 'Неверный логин или пароль',
				});
			}
		},
		[router, dispatch, login, setError]
	);

	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<DynamicLoginForm
				handleSubmit={handleSubmit(onSubmit)}
				errors={errors}
				register={register}
				isLoading={loginRes.isLoading}
			/>
		</Suspense>
	);
};

export default Login;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Авторизация'));

		return { props: {} };
	}
);
