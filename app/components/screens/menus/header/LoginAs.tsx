import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useState } from 'react';

import axios, { AxiosError } from 'axios';
import en from '../../../../../lang/en/header.json';
import ru from '../../../../../lang/ru/header.json';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useEnter } from '../../../../hooks/useEnter';
import {
	reducerInfo,
	useInvalidate,
	useInvalidateCallback,
} from '../../../../hooks/useInvalidate';
import { useLoginAsMutation } from '../../../../services/auth/AuthService';
import { paymentsInvalidation } from '../../../../services/edu/PaymentsService';
import { programsInvalidation } from '../../../../services/edu/ProgramsService';
import { scheduleInvalidation } from '../../../../services/edu/ScheduleService';
import { votingsInvalidation } from '../../../../services/votings/VotingsApi';
import { setAuthData } from '../../../../store/reducers/AuthSlice';
import { selectUser, setUserData } from '../../../../store/reducers/UserSlice';
import { useAlert } from '../../../../hooks/useAlert';

const mustBeInvalidated: reducerInfo[] = [
	programsInvalidation,
	scheduleInvalidation,
	votingsInvalidation,
	paymentsInvalidation,
];

const invalidateAll = (invalidate: useInvalidateCallback) =>
	mustBeInvalidated.forEach(invalidate);

type ProcessableErrorStatuses = 422 | 500 | 503;

const LoginAs: FC = () => {
	const { locale } = useRouter();
	const lang = useMemo(() => (locale === 'en' ? en : ru), [locale]);

	const user = useAppSelector(selectUser);

	const [login, setLogin] = useState<string>(user.data?.logged_as.login ?? '');
	const dispatch = useAppDispatch();
	const invalidate = useInvalidate();

	const [loginAs, loginAsRes] = useLoginAsMutation();

	const alerts = useAlert();

	const errors = useMemo<{
		[key in ProcessableErrorStatuses]: CallableFunction;
	}>(
		() => ({
			422: (login: string) =>
				alerts.danger({
					title: 'Ошибка смены логина',
					text: `Пользователь "${login}" не найден`,
					time: 3000,
				}),
			500: () =>
				alerts.danger({
					title: 'Ошибка сервера',
					text: `Попробуйте позже`,
					time: 3000,
				}),
			503: () =>
				alerts.danger({
					title: 'Слишком много запросов',
					text: 'Вы отправили слишком много запросов, попробуйте позже',
					time: 3000,
				}),
		}),
		[alerts]
	);

	const submit = useCallback(async () => {
		const res = await loginAs(login);

		if ('data' in res) {
			dispatch(setAuthData(res.data));

			try {
				const userData = await axios.get(`${process.env.APP_URL}/api/user/me`, {
					headers: { authorization: `Bearer ${res.data.token}` },
				});

				dispatch(setUserData(userData.data));
				invalidateAll(invalidate);
			} catch (e: any) {
				console.error(e);

				if ('response' in e && e.response.status) {
					const handler = errors[e.response.status as ProcessableErrorStatuses];

					if (handler) {
						handler(login);
					}
					return;
				}

				alerts.danger({
					title: `Неизвестная ошибка`,
					text: `Попробуйте перезагрузить страницу. Если ошибка повторится, обратитесь к администратору.`,
				});
			}
		} else if ('error' in res && 'data' in res.error) {
			const handler = errors[res.error.status as ProcessableErrorStatuses];

			if (handler) {
				handler(login);
				return;
			}
			
			alerts.danger({
				title: `Неизвестная ошибка ${res.error.status}`,
				text: `Попробуйте перезагрузить страницу. Если ошибка повторится, обратитесь к администратору. Статус запроса: ${res.error.status}`,
			});
		}
	}, [alerts, dispatch, errors, invalidate, login, loginAs]);

	const handleKeyDown = useEnter(submit);

	return (
		<div className="px-4 sm:px-10 flex flex-col justify-center w-full sm:w-1/4 md:w-1/4 xl:w-1/3 2xl:w-1/4">
			<div className="w-full flex border-b px-3">
				<input
					className="w-full border-0 outline-0 leading-10"
					placeholder={lang.loginAs}
					onChange={(e) => setLogin(e.target.value ?? '')}
					onKeyDown={handleKeyDown}
					value={login}
				/>
				<div
					className="cursor-pointer flex items-center justify-center w-6"
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
