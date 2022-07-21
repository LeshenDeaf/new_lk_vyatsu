import React, { memo, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../../../hooks/redux';
import { selectUser } from '../../../../store/reducers/UserSlice';
import { useOnClickOutside } from 'usehooks-ts';
import UserDropDown from './UserDropDown';
import HeaderSearch from './HeaderSearch';
import HeaderMobile from './HeaderMobile';
import { animated, Spring, Transition } from 'react-spring';
import HeaderUser from './user/HeaderUser';

interface Props {
	openSidebar: () => void;
}

const Header = memo(function Header({ openSidebar }: Props) {
	const { data: user } = useAppSelector(selectUser);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const avatarRef = useRef<HTMLDivElement | null>(null);
	const notifications = 0;

	const avatarClicked = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();

		console.log('avatar clicked');
		setIsVisible((prev) => !prev);
	}, []);

	useOnClickOutside(
		ref,
		useCallback((e: MouseEvent) => {
			console.log('clicked outside');
			if (
				isVisible &&
				e.target !== avatarRef.current &&
				// @ts-ignore
				!avatarRef.current?.contains(e.target)
			) {
				setIsVisible(false);
			}
		}, [isVisible])
	);

	if (!user) {
		return <header></header>;
	}

	return (
		<Spring
			from={{ opacity: 0, transform: 'translateY(-4rem)' }}
			to={{ opacity: 1, transform: 'translateY(0rem)' }}
			// config={{ duration: 2000 }}
		>
			{(styles) => (
				<animated.header style={styles}>
					<div className="top-menu sm:h-36 top-24 sm:top-0 sm:left-72 relative sm:fixed bg-white sm:drop-shadow-lg sm:z-30 sm:flex justify-between">
						{/* search and tags */}
						{<HeaderSearch />}

						{/* user */}
						<HeaderUser
							ref={avatarRef}
							avatarClicked={avatarClicked}
							notifications={notifications}
							user={user}
						/>
					</div>

					{/* user-menu */}
					<div ref={ref}>
						<Transition
							items={isVisible}
							from={{ opacity: 0, transform: 'translateY(-4rem)' }}
							enter={{ opacity: 1, transform: 'translateY(0rem)' }}
							leave={{ opacity: 0, transform: 'translateY(-4rem)' }}
							reverse={isVisible}
						>
							{(styles, item) =>
								item && <UserDropDown user={user} styles={styles} />
							}
						</Transition>
					</div>

					<HeaderMobile
						openSidebar={openSidebar}
						notifications={notifications}
					/>
				</animated.header>
			)}
		</Spring>
	);
});

export default Header;
