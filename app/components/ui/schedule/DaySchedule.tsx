import dayjs from 'dayjs';
import React, { FC, useMemo } from 'react';
import capitalizeFirstLetter from '../../../helpers/capitalize-first-letter';
import { IDaySchedule } from '../../../models/schedule';
import { v4 as uuidv4 } from 'uuid';
import PairGroup from './PairGroup';
import styles from './Schedule.module.scss';

interface Props {
	color: string;
	schedule: IDaySchedule;
	dayjs: any;
	teacherClicked: (tabnum: number, fio: string) => void;
}

const DaySchedule: FC<Props> = ({ color, schedule, dayjs, teacherClicked }) => {
	const myFormat = useMemo(() => 'DD.MM.YY', []);

	return (
		<div className={styles.daySchedule} >
			{/*  дата  */}
			<div
				className={styles.dateLabel}
				style={{ backgroundColor: color }}
			>
				<div className={styles.date}>
					{dayjs(schedule.date, myFormat).format('DD')}
				</div>
				<div className={styles.day}>
					{capitalizeFirstLetter(dayjs(schedule.date, myFormat).format('MMMM'))}
				</div>
			</div>
			{/*  пары  */}
			<div>
				{schedule.pairs.map((pairGroup) => (
					<PairGroup pairGroup={pairGroup} key={uuidv4()} teacherClicked={teacherClicked} />
				))}
			</div>
		</div>
	);
};

export default React.memo(DaySchedule);
