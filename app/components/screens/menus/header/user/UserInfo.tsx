import React, { memo } from 'react';
import { IUser } from '../../../../../models/IUser';

interface Props {
	user: IUser;
}

export default memo(function UserInfo({ user }: Props) {
	return (
		<div className="hidden items-center px-6 xl:flex">
			<div className="flex flex-col">
				<div className="text-vyatsu-blue text-lg whitespace-nowrap text-ellipsis overflow-hidden">
					{user.fio.first_name[0]}.{' '}
					{user.fio.second_name ? `${user.fio.second_name[0]}.` : ''}{' '}
					{user.fio.last_name}
				</div>
				<div>{user.login}</div>
				<div>
					{user.groups.includes(17)
						? 'Сотрудник'
						: user.groups.includes(15)
						? 'Студент'
						: ''}
				</div>
			</div>
		</div>
	);
});
