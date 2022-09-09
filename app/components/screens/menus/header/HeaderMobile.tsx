import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import UserAvatar from './user/UserAvatar';
import useScrollDirection from '../../../../hooks/useScrollDirection';
import { Spring, animated } from 'react-spring';

// const HeaderMobile: FC = ;

interface Props {
	notifications: number;
	openSidebar: () => void;
}

export default memo(function HeaderMobile({
	notifications,
	openSidebar,
}: Props) {
	const size = useMemo(() => ({ height: 48, width: 48 }), []);
	const scrollDirection = useScrollDirection();
	return (
		<Spring
			from={{ top: '-100em' }}
			to={{ top: '0px' }}
			reverse={scrollDirection === 'down' && scrollDirection !== null}
			// config={{ duration: 2000 }}
		>
			{(styles) => (
				<animated.div
					id="top-bar"
					style={styles}
					className={`fixed h-20 w-full bg-vyatsu-blue rounded-b-2xl z-40 flex sm:hidden justify-between items-center px-7`}
				>
					<UserAvatar notifications={notifications} size={size} />
					<div
						className="cursor-pointer burger w-10 h-10 flex justify-center items-center"
						onClick={openSidebar}
					>
						<Image
							className="w-6"
							src="/images/burger.svg"
							alt="menu"
							height="24"
							width="24"
							loading="lazy"
						/>
					</div>
					{/*<div className="flex items-center justify-center w-10 relative">*/}
					{/*	<Image*/}
					{/*		className="rounded-full bg-white w-16 p-2"*/}
					{/*		src="/images/user_mob.svg"*/}
					{/*		alt="menu"*/}
					{/*		height="48"*/}
					{/*		width="48"*/}
					{/*		loading="lazy"*/}
					{/*	/>*/}
					{/*	{notifications > 0 && (*/}
					{/*		<div className="bg-red-600 rounded-full px-1 absolute right-0 top-0 text-white text-xs flex items-center justify-center">*/}
					{/*			<div>{notifications}</div>*/}
					{/*		</div>*/}
					{/*	)}*/}
					{/*</div>*/}
				</animated.div>
			)}
		</Spring>
	);
});
