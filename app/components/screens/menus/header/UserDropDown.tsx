import axios from 'axios';
import Image from 'next/image';
import React, { memo, useCallback, useMemo } from 'react';
import { animated } from 'react-spring';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IStudentInfo, IUser } from '../../../../models/IUser';
import { selectAuth } from '../../../../store/reducers/AuthSlice';
import { unsetUserData } from '../../../../store/reducers/UserSlice';

import { useRouter } from 'next/router';
import en from '../../../../../lang/en/header.json';
import ru from '../../../../../lang/ru/header.json';

interface IUserDropDownProps {
	user: IUser;
	// isVisible: boolean;
	styles: any;
}

const UserDropDown = memo(function UserDropDown({
	user,
	styles,
}: IUserDropDownProps) {
	const dispatch = useAppDispatch();
	// const router = useRouter();
	const { token } = useAppSelector(selectAuth);
	const { locale } = useRouter();
	const lang = useMemo(() => locale === 'en' ? en : ru, [locale]);
	
	const logout = useCallback(
		async (e: React.MouseEvent) => {
			try {
				const response = await axios.get(
					`${process.env.APP_URL}/api/auth/logout`,
					{
						headers: { authorization: `Bearer ${token}` },
						withCredentials: true,
					}
				);

				console.log(response);

				dispatch(unsetUserData());

				// await router.push('/auth/login');
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch /* router ,*/ , token]
	);

	const makeStudInfo = useCallback(() => {
		if (!user.logged_as.rights.is_student) {
			return '';
		}
		const studInfo = user.logged_as.info as IStudentInfo;
		return `Студент ${studInfo.faculty_full} группы ${studInfo.group_name}`;
	}, [])

	return (
		<animated.div
			className={
				'user-menu fixed top-[7.9rem] right-[5%] rounded-2xl py-4 px-5 w-[320px] min-h-[290px] bg-white z-30 drop-shadow-blue'
			}
			style={styles}
		>
			{/* указатель на меню  */}
			<div className="w-0 h-0 border-transparent border-l-[15px] border-r-[15px] border-b-[15px] border-b-white fixed top-[-15px] right-[10%]"></div>
			{/* информация о пользователе  */}
			<div>
				<div className="flex flex-row">
					<Image
						className="rounded-full w-14 mr-[12px]"
						src="/images/user.svg"
						alt="avatar"
						height="52"
						width="52"
					/>
					<div className="text-vyatsu-blue text-[16px] font-[400] leading-5 ml-3 flex flex-col">
						<div>{user.logged_as.fio.last_name}</div>
						<div>{user.logged_as.fio.first_name}</div>
						<div>{user.logged_as.fio.second_name || ''}</div>
					</div>
				</div>
				<div className="mt-3 text-[12px] font-[400]">
					{makeStudInfo()}
				</div>
				<div className="text-[#BFBFBF] text-[12px] mt-2">{user.logged_as.login}</div>
			</div>
			<div className="border mt-2"></div>
			<div className="flex flex-col">
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">
					{lang.dropdown.personal}
				</div>
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">
					{lang.dropdown.portfolio}
				</div>
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">
					{lang.dropdown.instructions}
				</div>
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">
					{lang.dropdown.certificates}
				</div>
			</div>
			<div className="border mt-[16px]"></div>
			<div
				onClick={logout}
				className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors"
			>
				{lang.dropdown.logout}
			</div>
		</animated.div>
	);
});

export default UserDropDown;
