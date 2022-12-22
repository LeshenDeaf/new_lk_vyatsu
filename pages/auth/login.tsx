import axios from 'axios';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Suspense, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormFields } from '../../app/components/screens/auth/form/types';
import { useAlert } from '../../app/hooks/useAlert';
import { LoginRequest } from '../../app/models/api/auth/types';
import { useLoginMutation } from '../../app/services/auth/AuthService';
import { setAuthData } from '../../app/store/reducers/AuthSlice';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { setUserData } from '../../app/store/reducers/UserSlice';
import { wrapper } from '../../app/store/store';
import { useAppDispatch } from '../../app/hooks/redux';

const DynamicLoginForm = dynamic(
	() => import('../../app/components/screens/auth/form/LoginForm'),
	{
		suspense: true,
		ssr: false,
	}
);

const Login: NextPage = () => {
	const [login, loginRes] = useLoginMutation();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<ILoginFormFields>();
	const alerts = useAlert();

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
					alerts.success({
						title: 'Вы авторизованы',
						text: '',
						time: 2000,
					});
				} catch (e) {
					console.error(e);
					alerts.danger({
						title: 'Ошибка получения данных о пользователе',
						text: 'Во время авторизации произошла ошибка. Перезагрузите страницу.',
					});
				}
			} else if ('status' in res.error && res.error.status === 503) {
				alerts.danger({
					title: 'Ошибка авторизации',
					text: `Сервис авторизации временно недоступен. 
					Перезагрузите страницу и повторите попытку позже. 
					Если ошибка не исчезнет, обратитесь к администратору`,
					time: 10000
				});
			} else {
				setError('login', {
					type: 'custom',
					message: 'Неверный логин или пароль',
				});
			}
		},
		[login, dispatch, router, alerts, setError]
	);

	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<DynamicLoginForm
				handleSubmit={handleSubmit(onSubmit)}
				errors={errors}
				register={register}
				isLoading={loginRes.isLoading}
			/>

			<button
				onClick={() =>
					alerts.success({
						title: 'Title of notification',
						text: 'And this is a text uaaaAnd this is a text uaaaAnd this is a text uaaaAnd this is a text uaaaAnd this is a text uaaaAnd this is a text uaaa',
						time: 5000,
					})
				}
			>
				SHOW|HIDE
			</button>
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
