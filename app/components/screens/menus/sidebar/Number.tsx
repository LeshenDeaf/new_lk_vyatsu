import React, { FC } from 'react';
import { animated, config, useSpring } from 'react-spring';

interface Props {
	isSelected: boolean;
	isPrev: boolean;
	number: number;
	onClick: () => void;
}

const Number: FC<Props> = ({ isSelected, isPrev, number, onClick }) => {
	const props = useSpring({
		from: { fontSize: 18, fontWeight: 'normal' },
		to: { fontSize: isSelected || isPrev ? 24 : 18, fontWeight: isSelected || isPrev ? 'bold' : 'normal' },
		reverse: isPrev,
		fontSize: isSelected ? 24 : 18,
		config: config.gentle,
	});

	return (
		<animated.div
			style={props}
			className={
				'number-menu-item align-text-bottom cursor-pointer mr-4 last:mr-0 font-lg'
			}
			onClick={onClick}
		>
			{number}
		</animated.div>
	);
};

export default React.memo(Number);
