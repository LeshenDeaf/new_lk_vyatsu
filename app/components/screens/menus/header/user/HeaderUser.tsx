import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { IUser } from '../../../../../models/IUser';
import UserAvatar from './UserAvatar';
import UserInfo from './UserInfo';

interface Props {
	notifications: number;
	user: IUser;
	avatarClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default forwardRef(function HeaderUser(
	{ notifications, user, avatarClicked }: Props,
	ref: ForwardedRef<HTMLDivElement>
) {
	const size = useMemo(() => ({ height: 64, width: 64 }), []);

	return (
		<div
			ref={ref}
			onClick={avatarClicked}
			className="user-zone cursor-pointer hidden sm:flex items-center justify-center px-6 w-full sm:w-1/4 md:w-1/4 xl:w-1/3 2xl:w-1/4"
		>
			<UserAvatar notifications={notifications} size={size} />
			<UserInfo user={user} />
		</div>
	);
});
