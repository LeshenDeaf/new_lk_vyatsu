import React, { FC, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import capitalizeFirstLetter from '../../../helpers/capitalize-first-letter';
import { IDaySchedule } from '../../../models/schedule';
import PairGroup from './PairGroup';
import styles from './Schedule.module.scss';

export interface IProps {
	color: string;
	schedule: IDaySchedule;
	dayjs: any;
	teacherClicked: (tabnum: number, fio: string) => void;
	isModal?: boolean;
}

const DaySchedule: FC<IProps> = ({
	color,
	schedule,
	dayjs,
	teacherClicked,
	isModal,
}) => {
	const myFormat = useMemo(() => 'DD.MM.YY', []);

	return (
		<div className={styles.daySchedule}>
			{/*  дата  */}
			<div className={styles.dateLabel} style={{ backgroundColor: color }}>
				<div className={styles.date}>
					{dayjs(schedule.date, myFormat).format('DD')}
				</div>
				<div className={styles.day}>
					{capitalizeFirstLetter(dayjs(schedule.date, myFormat).format('MMMM'))}
				</div>
				<div className={styles.day_of_week}>
					{capitalizeFirstLetter(schedule.day_of_week)}
				</div>
			</div>
			{/*  пары  */}
			<div className={styles.dayPairGroup}>
				{schedule.pairs.map((pairGroup) => (
					<PairGroup
						pairGroup={pairGroup}
						key={uuidv4()}
						teacherClicked={teacherClicked}
						isModal={isModal ?? false}
					/>
				))}
			</div>
		</div>
	);
};

export default React.memo(DaySchedule);
