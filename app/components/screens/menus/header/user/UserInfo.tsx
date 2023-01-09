import React, { memo, useMemo } from 'react';
import { IUser } from '../../../../../models/IUser';

interface Props {
	user: IUser;
}

export default memo(function UserInfo({ user }: Props) {
	const fioSmall = useMemo(() => {
		if ('fio_small' in user.logged_as.info && user.logged_as.info.fio_small) {
			return user.logged_as.info.fio_small;
		}

		return `${user.logged_as.fio.first_name[0]}. ${
			user.logged_as.fio.second_name
				? `${user.logged_as.fio.second_name[0]}.`
				: ''
		} ${user.logged_as.fio.last_name}`;
	}, [user.logged_as.fio, user.logged_as.info]);

	return (
		<div className="hidden items-center px-6 xl:flex">
			<div className="flex flex-col">
				<div className="text-vyatsu-blue text-lg whitespace-nowrap text-ellipsis overflow-hidden">
					{fioSmall}
				</div>
				<div>{user.logged_as.login}</div>
				<div>
					{user.logged_as.rights.is_employee
						? 'Сотрудник'
						: user.logged_as.rights.is_student
						? 'Студент'
						: ''}
				</div>
			</div>
		</div>
	);
});
