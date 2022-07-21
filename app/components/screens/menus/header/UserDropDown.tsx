import React, { forwardRef } from 'react';
import { IUser } from '../../../models/IUser';

interface IUserDropDownProps {
	user: IUser;
	isVisible: boolean;
}

const UserDropDown = forwardRef<HTMLInputElement, IUserDropDownProps>(
	function UserDropDown({ user, isVisible }, ref) {
		return (
			<div
				ref={ref}
				className={
					(isVisible ? '' : 'hidden ') +
					'user-menu fixed top-[7.9rem] right-[5%] rounded-2xl py-4 px-5 w-[320px] min-h-[290px] bg-white z-30 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)]'
				}
			>
				{/* указатель на меню  */}
				<div className="w-0 h-0 border-transparent border-l-[15px] border-r-[15px] border-b-[15px] border-b-white fixed top-[7rem] right-[10%]"></div>
				{/* информация о пользователе  */}
				<div>
					<div className="flex flex-row">
						<img
							className="rounded-full w-14 mr-[12px]"
							src="/images/user.svg"
							alt="avatar"
						/>
						<div className="text-[#2E9ECB] text-[16px] font-[400] leading-5 mr-5 flex flex-col">
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
					<div className="mt-[10px] hover:cursor-pointer">
						Персональные данные
					</div>
					<div className="mt-[10px] hover:cursor-pointer">Портфолио</div>
					<div className="mt-[10px] hover:cursor-pointer">Инструкции</div>
					<div className="mt-[10px] hover:cursor-pointer">
						Сертификаты COVID19
					</div>
				</div>
				<div className="border mt-[16px]"></div>
				<div className="mt-[10px] hover:cursor-pointer">Выйти</div>
			</div>
		);
	}
);

export default UserDropDown;
