import React, { memo, useCallback } from 'react';
import { IUser } from '../../../../models/IUser';
// import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { unsetUserData } from '../../../../store/reducers/UserSlice';
import axios from 'axios';
import { selectAuth } from '../../../../store/reducers/AuthSlice';
import { animated } from 'react-spring';
import Image from 'next/image'
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

	const logout = useCallback(async (e: React.MouseEvent) => {
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
	}, [dispatch, /* router */, token]);

	return (
		<animated.div
			className={
				'user-menu fixed top-[7.9rem] right-[5%] rounded-2xl py-4 px-5 w-[320px] min-h-[290px] bg-white z-30 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)]'
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
					<div className="text-vyatsu-blue text-[16px] font-[400] leading-5 mr-5 flex flex-col">
						<div>{user.fio.last_name}</div>
						<div>{user.fio.first_name}</div>
						<div>{user.fio.second_name || ''}</div>
					</div>
				</div>
				<div className="mt-3 text-[12px] font-[400]">
					Студент института математики и информационных систем кафедры
					прикладной математики и физики
				</div>
				<div className="text-[#BFBFBF] text-[12px] mt-2">{user.login}</div>
			</div>
			<div className="border mt-2"></div>
			<div className="flex flex-col">
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">
					Персональные данные
				</div>
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">Портфолио</div>
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">Инструкции</div>
				<div className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">
					Сертификаты COVID19
				</div>
			</div>
			<div className="border mt-[16px]"></div>
			<div onClick={logout} className="mt-[10px] hover:cursor-pointer hover:text-vyatsu-blue transition-colors">
				Выйти
			</div>
		</animated.div>
	);
});

export default UserDropDown;
