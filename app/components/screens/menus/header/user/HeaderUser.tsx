import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { IUser } from '../../../../../models/IUser';
import UserAvatar from './UserAvatar';
import UserInfo from './UserInfo';
import Image from 'next/image';
import { Spring, animated, config } from 'react-spring';

interface Props {
	notifications: number;
	user: IUser;
	avatarClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
	fullInfoVisible: boolean;
}

export default forwardRef(function HeaderUser(
	{ notifications, user, avatarClicked, fullInfoVisible }: Props,
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
			<Spring
				from={{rotate: 0}}
				to={{rotate: 180}}
				reverse={!fullInfoVisible}
				config={config.stiff}
			>
				{styles => (
					<animated.div style={styles}>
						<Image
							src="/images/arrow_down.svg"
							alt="down"
							draggable="false"
							width="16"
							height="16"
						/>
					</animated.div>
				)}
				
			</Spring>
			
		</div>
	);
});
