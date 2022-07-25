import React from 'react';
import { animated } from 'react-spring';
import VyatsuLogo from './VyatsuLogo';
import ArrowMenu from './ArrowMenu';

interface Props {
	closeSidebar: () => void;
	styles: any;
}

const SideBar = ({ styles, closeSidebar }: Props) => {
	return (
		<>
			<animated.div
				id="left-menu"
				className={`fixed z-50 bg-vyatsu-blue rounded-b-2xl w-full sm:w-72 h-[95%] sm:h-[90%] sm:drop-shadow-lg sm:block`}
				style={styles}
			>
				{/* logo */}
				<VyatsuLogo closeSidebar={closeSidebar} />
				{/*arrow menu*/}
				<ArrowMenu />

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
