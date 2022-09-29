import { FC, useCallback, useState } from 'react';
import { Transition, config, animated, useSpring, Spring } from 'react-spring';
import classNames from './Faq.module.scss';

interface IProps {
	header: string;
	body: string;
}

const Faq: FC<IProps> = ({ header, body }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const expand = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={classNames.block}>
			<div className={classNames.header} onClick={expand}>
				{header}
			</div>

			<Spring
				// items={isOpen}
				from={{ maxHeight: '0px' }}
				to={{ maxHeight: '100px' }}
				reverse={isOpen}
				config={config.stiff}
			>
				{(styles) => (
					<animated.div style={styles} className={classNames.body}>
						{body}
					</animated.div>
				)}
			</Spring>
		</div>
	);
};

export default Faq;
