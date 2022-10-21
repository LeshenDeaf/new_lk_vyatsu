import React, { FC, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import en from '../../../../../lang/en/header.json';
import ru from '../../../../../lang/ru/header.json';
import { useLoginAsMutation } from '../../../../services/auth/AuthService';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setAuthData } from '../../../../store/reducers/AuthSlice';
import axios from 'axios';
import { selectUser, setUserData } from '../../../../store/reducers/UserSlice';
import { scheduleApi } from '../../../../services/edu/ScheduleService';

const LoginAs: FC = () => {
	const { locale } = useRouter();
	const lang = useMemo(() => locale === 'en' ? en : ru, [locale]);

	const user = useAppSelector(selectUser);

	const [login, setLogin] = useState<string>(user.data?.logged_as.login ?? '');
  const dispatch = useAppDispatch();

	const [loginAs, loginAsRes] = useLoginAsMutation();

	const submit = useCallback(async () => {
		const res = await loginAs(login);

		if ('data' in res) {
			dispatch(setAuthData(res.data));

			try {
				const userData = await axios.get(`${process.env.APP_URL}/api/user/me`, {
					headers: { authorization: `Bearer ${res.data.token}` },
				});

				dispatch(setUserData(userData.data));

				dispatch({
					type: `${scheduleApi.reducerPath}/invalidateTags`,
					payload: ['Schedule']
				})

				// await router.push('/');
			} catch (e) {
				console.error(e);
			}
		} else if (
			'error' in res &&
			'data' in res.error &&
			'errors' in (res.error.data as any)
		) {
		}
	}, [dispatch, login, loginAs]);

	return (
		<div className="px-4 sm:px-10 flex flex-col justify-center w-full sm:w-1/4 md:w-1/4 xl:w-1/3 2xl:w-1/4">
			<div className="w-full flex border-b px-3">
				<input
					className="w-full border-0 outline-0 leading-10"
					placeholder={lang.loginAs}
          onChange={(e) => setLogin(e.target.value ?? '')}
          value={login}
				/>
				<div className="cursor-pointer flex items-center justify-center w-6"
          onClick={submit}
        >
					<Image
						src="/images/arrow_down.svg"
						alt="search"
						draggable="false"
						height="16"
						width="18"
						className="-rotate-90"
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginAs;
