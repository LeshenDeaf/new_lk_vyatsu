import { FC, useState } from 'react';
import { animated, config, Spring } from 'react-spring';
import classNames from './Accordion.module.scss';

interface IProps {
	header: string;
	children?: React.ReactNode;
	getBody?: () => any;
}

const Accordion: FC<IProps> = ({ header, children, getBody }) => {
	const [isClosed, setIsClosed] = useState<boolean>(true);
	const [body, setBody] = useState(children);

	const expand = async () => {
		setBody(getBody ? await getBody() : {});
		setIsClosed((prev) => !prev);
	};

	return (
		<div className={classNames.block}>
			<Spring
				from={{ transform: 'rotate(135deg)', color: '#4080F5' }}
				to={{ transform: 'rotate(0deg)', color: '#1d1d1d' }}
				reverse={isClosed}
				config={config.stiff}
			>
				{(styles) => (
					// <animated.div style={styles} className={classNames.closeBtn}>
						<animated.svg
							className={classNames.closeBtn}
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							style={styles}
							height="22"
							width="22"
							xmlns="http://www.w3.org/2000/svg"
							onClick={expand}
						>
							<path
								fill="none"
								// stroke="#000"
								strokeWidth="2"
								d="M3,3 L21,21 M3,21 L21,3"
							></path>
						</animated.svg>
					// </animated.div>
				)}
			</Spring>

			<div className={classNames.header} onClick={expand}>
				{header}
			</div>

			<Spring
				// items={isOpen}
				from={{ maxHeight: '0px', marginTop: '0em' }}
				to={{ maxHeight: '200px', marginTop: '1em' }}
				reverse={isClosed}
				// config={config.stiff}
			>
				{(styles) => (
					<animated.div style={styles} className={classNames.body}>
						{JSON.stringify(body)}
					</animated.div>
				)}
			</Spring>
		</div>
	);
};

export default Accordion;
