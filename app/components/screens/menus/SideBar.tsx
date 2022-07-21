import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { animated } from 'react-spring';
import { useAppSelector } from '../../../hooks/redux';
import { selectNavbar } from '../../../store/reducers/NavbarSlice';
import { NavList } from '../../../utils/Pages';

interface Props {
	closeSidebar: () => void;
	styles: any;
}

const SideBar = ({ styles, closeSidebar }: Props) => {
	const { categoryIndex } = useAppSelector(selectNavbar);
	const category = NavList[categoryIndex];

	return (
		<>
			<animated.div
				id="left-menu"
				className={`fixed z-50 bg-vyatsu-blue rounded-b-2xl w-full sm:w-72 h-[95%] sm:h-[90%] sm:drop-shadow-lg sm:block`}
				style={styles}
			>
				{/* logo */}
				<div className="h-20 sm:h-36 px-7 sm:px-0 flex justify-between sm:justify-center items-center sm:border-b border-vyatsu-darkblue">
					<Link href={process.env.APP_URL || ''}>
						<div className="flex flex-row items-center justify-evenly">
							<Image
								className="h-10 sm:h-14"
								src="/images/logo.svg"
								alt="logo"
								draggable="false"
								width="64"
								height="64"
							/>
							<div className="ml-3 flex flex-col text-white font-bold leading-4 sm:leading-5 text-sm sm:text-base">
								<div>Вятский</div>
								<div>Государственный</div>
								<div>Университет</div>
							</div>
						</div>
					</Link>

					<div
						className="cursor-pointer left-menu-close sm:hidden w-10 h-10 flex justify-center items-center"
						onClick={closeSidebar}
					>
						<Image
							src="/images/close.svg"
							alt="close"
							draggable="false"
							width="16"
							height="16"
						/>
					</div>
				</div>
				{/*arrow menu*/}
				<div className="w-full h-16 border-b border-vyatsu-darkblue justify-evenly items-center text-white flex">
					<div
						id="left-menu-left-arrow"
						className="cursor-pointer w-6 flex justify-center"
					>
						<Image
							src="/images/arrow_left.svg"
							alt="left"
							draggable="false"
							width="16"
							height="16"
						/>
					</div>
					<div className="flex">
						<span id="left-menu-number-top" className="mr-1"></span>
						<div className="left-menu-name">{category.name}</div>
					</div>
					<div
						id="left-menu-right-arrow"
						className="cursor-pointer w-6 flex justify-center"
					>
						<Image
							className="rotate-180"
							src="/images/arrow_left.svg"
							alt="right"
							draggable="false"
							width="16"
							height="16"
						/>
					</div>
				</div>

				{/*menu item list*/}
				<div
					id="left-menu-items"
					className="overflow-auto left-menu-cont-items scrollbar-thin scrollbar-color-main"
				>
					{category.pages.map((e) => (
						<Link href={e.link}>
							<a
								draggable="false"
								className="w-full h-16 px-5 border-t first:border-t-0 border-vyatsu-dark-blue flex justify-start items-center text-white text-[14px] sm:text-base cursor-pointer "
							>
								{e.name}
							</a>
						</Link>
					))}
				</div>

				<div className="h-72 w-full absolute bottom-20 sm:bottom-0 p-7 flex flex-col justify-between">
					{/* number-menu */}
					<div className="flex flex-col justify-between items-start">
						<div
							id="number-menu"
							className="text-white flex items-center"
						></div>
						<div className="left-menu-name font-bold text-white">Текст</div>
					</div>
					{/* centre-info */}
					<div className="text-white flex flex-col justify-between h-32">
						<div>
							Центр организации корпоративного обучения сотрудников и студентов
						</div>
						<div className="text-xl">742-752</div>
						<div className="underline opacity-50">
							<a href="mailto:ko@vyatsu.ru">ko@vyatsu.ru</a>
						</div>
					</div>
				</div>

				{/* feedback mobile */}
				<div className="flex sm:hidden fixed h-28 w-full bottom-0 justify-center items-center">
					<button className="border-2 border-white rounded-xl h-[50px] w-[240px] flex justify-center items-center">
						<div className="text-[14px] text-white">
							Оставить отзыв о странице
						</div>
					</button>
				</div>
			</animated.div>
			<div className="hidden sm:flex fixed h-[10%] w-72 bottom-0 justify-center items-center">
				<button className="border-2 border-vyatsu-blue rounded-xl h-[50px] w-[240px] flex justify-center items-center">
					<div className="text-[14px] text-vyatsu-blue">
						Оставить отзыв о странице
					</div>
				</button>
			</div>
		</>
	);
};

export default SideBar;
