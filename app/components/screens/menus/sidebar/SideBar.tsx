import React from 'react';
import { animated } from 'react-spring';
import VyatsuLogo from './VyatsuLogo';
import ArrowMenu from './ArrowMenu';
import ReviewButton from './ReviewButton';
import NumberMenu from './NumberMenu';

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
					<NumberMenu />
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
				<ReviewButton isMobile={true} />
			</animated.div>
			<ReviewButton isMobile={false} />
		</>
	);
};

export default SideBar;
