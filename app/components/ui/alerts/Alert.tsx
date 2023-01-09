import { Transition, animated, easings, useSpring } from '@react-spring/web';
import { FC, useEffect, useRef, useState } from 'react';
import {
	MdCheckCircleOutline,
	MdClose,
	MdOutlineDangerous,
	MdOutlineInfo,
	MdOutlineWarningAmber,
} from 'react-icons/md';
import { useAppDispatch } from '../../../hooks/redux';
import { AlertTypes, removeAlert } from '../../../store/reducers/AlertsSlice';
import { Portal } from '../portals/Portal';
import { Timer } from '../../../helpers/timer';

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
	const [springProps, springApi] = useSpring(() => ({
		from: { width: '100%' },
		to: { width: '0%' },
		config: {
			duration: time,
		},
	}));
	const ref = useRef<HTMLDivElement>(null);
	const timer = useRef<Timer | null>(null);

	useEffect(() => {
		if (!timer.current) {
			timer.current = new Timer(() => setIsShown(false));
		}

		if (time && isShown) {
			timer.current.start(time);
		}

		return () => {
			timer.current && timer.current.stop();
			console.log(timer.current)
		};
	}, [time, isShown, setIsShown]);

	return (
		<Portal container={document && document.getElementById('alerts')}>
			<Transition
				items={isShown}
				from={{
					opacity: 0,
					transform: 'translateX(250px)',
					marginBottom: `-100px`,
				}}
				enter={{
					opacity: 1,
					transform: 'translateX(0px)',
					marginBottom: '20px',
				}}
				leave={{
					opacity: 0,
					transform: 'translateX(250px)',
					marginBottom: `-${ref?.current?.clientHeight || 0}px`,
				}}
				reverse={isShown}
				config={{ easing: easings.easeInOutCubic, tension: 400, friction: 26 }}
				onDestroyed={() => dispatch(removeAlert(id))}
			>
				{(styles, item) =>
					item && (
						<animated.div
							style={styles}
							className="right-10 relative z-[999] bg-white max-w-md p-4 pl-6 rounded-md shadow-dark overflow-hidden"
							// onClick={() => setIsShown(false)}
							ref={ref}
							onMouseEnter={() => {
								if (!timer.current) {
									return;
								}
								timer.current.pause();
								springApi.pause();
							}}
							onMouseLeave={() => {
								if (!timer.current) {
									return;
								}
								timer.current.resume();
								springApi.resume();
							}}
						>
							{!time && (
								<div
									className={`absolute top-0 left-0 h-full w-1`}
									style={{ backgroundColor: alertColors[alertType] }}
								></div>
							)}
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
									className="h-1 absolute bottom-0 left-0 right-0"
									style={{
										width: springProps.width.to((w) => `${w}`),
										backgroundColor: alertColors[alertType],
									}}
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
