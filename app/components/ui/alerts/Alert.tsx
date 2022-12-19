import React, { FC, useEffect, useState } from 'react';
import { Portal } from '../portals/Portal';
import {
	MdOutlineInfo,
	MdClose,
	MdOutlineDangerous,
	MdOutlineWarningAmber,
	MdCheckCircleOutline,
} from 'react-icons/md';
import {
	Transition,
	Spring,
	animated,
	config,
	useSpring,
} from '@react-spring/web';
import { AlertTypes, remove } from '../../../store/reducers/AlertsSlice';
import { useAppDispatch } from '../../../hooks/redux';

const alertColors = {
	[AlertTypes.Success]: 'rgb(22 163 74)',
	[AlertTypes.Info]: '#4080F5',
	[AlertTypes.Warning]: '#f59e0b',
	[AlertTypes.Danger]: '#dc2626',
};

const alertIcons = {
	[AlertTypes.Success]: (
		<MdCheckCircleOutline
			className={`w-6 h-6`}
			style={{ color: alertColors[AlertTypes.Success] }}
		/>
	),
	[AlertTypes.Info]: (
		<MdOutlineInfo
			className={`w-6 h-6`}
			style={{ color: alertColors[AlertTypes.Info] }}
		/>
	),
	[AlertTypes.Warning]: (
		<MdOutlineWarningAmber
			className={`w-6 h-6`}
			style={{ color: alertColors[AlertTypes.Warning] }}
		/>
	),
	[AlertTypes.Danger]: (
		<MdOutlineDangerous
			className={`w-6 h-6`}
			style={{ color: alertColors[AlertTypes.Danger] }}
		/>
	),
};

interface AlertProps {
	id: string;
	title: string;
	text: string | JSX.Element;
	alertType: AlertTypes;
	time?: number;
}

export const Alert: FC<AlertProps> = ({ id, title, text, alertType, time }) => {
	const [isShown, setIsShown] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const springProps = useSpring({
		from: { width: '0%' },
		to: { width: '100%' },
		config: {
			duration: time
		}
	});

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		if (time && isShown) {
			timeoutId = setTimeout(() => setIsShown(false), time);
		}

		return () => {
			timeoutId && window.clearTimeout(timeoutId);
		};
	}, [time, isShown, setIsShown]);

	return (
		<Portal container={document && document.getElementById('alerts')}>
			<Transition
				items={isShown}
				from={{ opacity: 0, right: '-250px', marginLeft: '0px' }}
				enter={{ opacity: 1, right: '16px', marginLeft: '16px' }}
				leave={{ opacity: 0, right: '-250px', marginLeft: '0px' }}
				reverse={isShown}
				config={config.stiff}
				onDestroyed={() => dispatch(remove(id))}
			>
				{(styles, item) =>
					item && (
						<animated.div
							style={styles}
							className="cursor-pointer relative mb-10 z-[999] bg-white max-w-md p-4 pl-6 rounded-md shadow-dark overflow-hidden"
							onClick={() => setIsShown(false)}
						>
							<div
								className={`absolute top-0 left-0 h-full w-1`}
								style={{ backgroundColor: alertColors[alertType] }}
							></div>
							<div className="flex">
								<div className="h-full w-6 mr-4">{alertIcons[alertType]}</div>
								<div className="text break-words">
									<div className="text-lg">{title}</div>
									<div className="text-slate-800">{text}</div>
								</div>
								<div>
									<MdClose
										onClick={() => setIsShown(false)}
										className=" w-6 h-6 text-slate-400 hover:text-slate-800"
									/>
								</div>
							</div>
							{time && (
								<animated.div
									className="bg-red-500 h-5"
									style={{ width: springProps.width.to((w) => `${w}`) }}
								></animated.div>
							)}
						</animated.div>
					)
				}
			</Transition>
		</Portal>
	);
};
export { AlertTypes };
