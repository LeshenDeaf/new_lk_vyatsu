import Image from 'next/image';
import { memo, useMemo } from 'react';
import { animated, Spring } from 'react-spring';
import useScrollDirection from '../../../../hooks/useScrollDirection';
import UserAvatar from './user/UserAvatar';

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
				</animated.div>
			)}
		</Spring>
	);
});
