import React, { useMemo } from 'react';
import { animated } from 'react-spring';
import VyatsuLogo from './VyatsuLogo';
import ArrowMenu from './ArrowMenu';
import ReviewButton from './ReviewButton';
import NumberMenu from './NumberMenu';

import en from '../../../../../lang/en/header.json';
import ru from '../../../../../lang/ru/header.json';
import { useRouter } from 'next/router';

interface Props {
	closeSidebar: () => void;
	styles: any;
}

const SideBar = ({ styles, closeSidebar }: Props) => {
	const { locale } = useRouter();
	const lang = useMemo(() => locale === 'en' ? en : ru, [locale]);

	return (
		<>
			<animated.div
				id="left-menu"
				className={`fixed z-50 bg-vyatsu-blue rounded-b-2xl w-full sm:w-72 h-[95%] sm:h-[90%] sm:block shadow-side-blue `}
				style={styles}
			>
				{/* logo */}
				<VyatsuLogo closeSidebar={closeSidebar} />
				{/*arrow menu*/}
				<ArrowMenu />

				<div className="absolute h-72 w-full  bottom-20 sm:bottom-0 p-7 flex flex-col justify-between">
					{/* number-menu */}
					<NumberMenu />
					{/* centre-info */}
					<div className="text-white flex flex-col justify-between h-32">
						<div>
							{lang.org_center}
						</div>
						<div className="text-xl">742-752</div>
						<div className="underline opacity-50">
							<a href="mailto:ko@vyatsu.ru">ko@vyatsu.ru</a>
						</div>
					</div>
				</div>

				{/* feedback mobile */}
				<ReviewButton isMobile={true} text={lang.leave_a_review} />
			</animated.div>
			<ReviewButton isMobile={false} text={lang.leave_a_review} />
		</>
	);
};

export default SideBar;
