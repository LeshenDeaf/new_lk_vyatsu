import React, {
	FC,
	memo,
	MouseEventHandler,
	useMemo,
	useRef,
	useState,
} from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../../hooks/redux';
import { selectUser } from '../../../store/reducers/UserSlice';
import { useOnClickOutside } from 'usehooks-ts';
import UserDropDown from './UserDropDown';
import HeaderSearch from './HeaderSearch';

const Header = memo(function Header() {
	const { data: user } = useAppSelector(selectUser);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const ref = useRef(null);
	const avatarRef = useRef<HTMLDivElement>(null);
	const notifications = 0;

	const handleClickOutside = (e: MouseEvent) => {
		if (
			e.target !== avatarRef.current &&
			// @ts-ignore
			!avatarRef.current?.contains(e.target)
		) {
			setIsVisible(false);
		}
	};

	const avatarClicked = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsVisible((prev) => !prev);
	};

	useOnClickOutside(ref, handleClickOutside);

	if (!user) {
		return <header></header>;
	}

	return (
		<header>
			<div className="top-menu sm:h-36 top-24 sm:top-0 sm:left-72 relative sm:fixed bg-white sm:drop-shadow-lg sm:z-30 sm:flex justify-between">
				{/* search and tags */}
				{<HeaderSearch />}

				{/* user */}
				<div
					ref={avatarRef}
					onClick={avatarClicked}
					className="user-zone cursor-pointer hidden sm:flex items-center justify-center px-6 w-full sm:w-1/4 md:w-1/4 xl:w-1/3 2xl:w-1/4"
				>
					{/* avatar */}
					<div className="items-center justify-center min-w-[4rem] relative">
						<Image
							className="rounded-full"
							src="/images/user.svg"
							alt="avatar"
							height="64"
							width="64"
							loading="lazy"
						/>

						{notifications > 0 && (
							<div className="bg-red-600 rounded-full px-2 absolute right-0 top-0 text-white text-sm flex items-center justify-center">
								<div>{notifications}</div>
							</div>
						)}
					</div>
					{/* info */}
					<div className="hidden items-center px-6 xl:flex">
						<div className="flex flex-col">
							<div className="text-[#2E9ECB] text-lg whitespace-nowrap text-ellipsis overflow-hidden">
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
				</div>
			</div>

			{/* отдельно, т.к. в сафари сломаный position:fixed  */}
			{/* user-menu */}
			<UserDropDown user={user} isVisible={isVisible} ref={ref} />

			<div
				id="top-bar"
				className="fixed top-0 h-20 w-full bg-vyatsu-blue rounded-b-2xl z-50 flex sm:hidden justify-between items-center px-7"
			>
				<div className="cursor-pointer burger w-10 h-10 flex justify-center items-center">
					<Image
						className="w-6"
						src="/images/burger.svg"
						alt="menu"
						height="24"
						width="24"
						loading="lazy"
					/>
				</div>
				<div className="flex items-center justify-center w-10 relative">
					<Image
						className="rounded-full bg-white w-16 p-2"
						src="/images/user_mob.svg"
						alt="menu"
						height="48"
						width="48"
						loading="lazy"
					/>
					{notifications > 0 && (
						<div className="bg-red-600 rounded-full px-1 absolute right-0 top-0 text-white text-xs flex items-center justify-center">
							<div>{notifications}</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
});

export default Header;
