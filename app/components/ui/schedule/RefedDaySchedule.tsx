import { ForwardedRef, forwardRef, useEffect } from 'react';
import DaySchedule, { IProps } from './DaySchedule';

const RefedDaySchedule = (props: IProps, ref: ForwardedRef<HTMLDivElement>) => {
	useEffect(() => {
		console.log('mounted');
	}, []);

	return (
		<div ref={ref}>
			<DaySchedule {...props} />
		</div>
	);
};

export default forwardRef<HTMLDivElement, IProps>(RefedDaySchedule);
