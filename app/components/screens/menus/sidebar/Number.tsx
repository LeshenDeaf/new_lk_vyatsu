import React, { FC } from 'react';
import { animated, config, Spring } from 'react-spring';

interface Props {
	reset: boolean;
	reverse: boolean;
	number: number;
	onClick: () => void;
}

const Number: FC<Props> = ({ reset, reverse, number, onClick }) => {
	console.log(reset);
	return (
		<Spring
			from={{ fontSize: 18, fontWeight: 'normal' }}
			to={{ fontSize: 24, fontWeight: 'bold' }}
			reset={reset}
			reverse={reverse}
			config={config.gentle}
		>
			{(styles) => (
				<animated.div
					style={styles}
					className={
						'number-menu-item align-text-bottom cursor-pointer mr-4 last:mr-0 font-lg'
					}
					onClick={onClick}
				>
					{number}
				</animated.div>
			)}
		</Spring>
	);
};

export default React.memo(Number);
