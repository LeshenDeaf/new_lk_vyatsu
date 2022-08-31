import React, { useCallback, useState } from 'react';
import { IDaySchedule } from '../../app/models/schedule';
import {
	useByTabnumMutation,
	usePersonalQuery,
} from '../../app/services/edu/ScheduleService';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import DaySchedule from '../../app/components/ui/schedule/DaySchedule';
import Link from 'next/link';
import { ScheduleColors } from '../../app/configs/ScheduleColors';

const Schedule = () => {
	const { data: schedule, isLoading } = usePersonalQuery();
	const [getByTabnum, { isLoading: byTabnumLoading }] = useByTabnumMutation();
	// const {
	// 	data: teacherSchedule,
	// 	isLoading: isLoadingT,
	// } = useTeacherQuery();
	const [s, setS] = useState<IDaySchedule[] | null>(null);

	dayjs.extend(require('dayjs/plugin/customParseFormat'));
	dayjs.locale(require('dayjs/locale/ru'));

	const teacherClicked = useCallback(async (tabnum: number) => {
		const res = await getByTabnum(tabnum);
		if ('data' in res) {
			console.log(res.data)
			setS(res.data);
		}
	}, [getByTabnum]);

	const getJSXDaySchedule = (schedule: IDaySchedule, index: number) => (
		<DaySchedule
			color={index % 2 === 0 ? ScheduleColors.odd : ScheduleColors.even}
			schedule={schedule}
			dayjs={dayjs}
			teacherClicked={teacherClicked}
			key={`${schedule.date}-${schedule.day_of_week}`}
		/>
	);

	return (
		<>
			<div>{!isLoading && schedule?.map(getJSXDaySchedule)}</div>
			<div>
				<div>{byTabnumLoading && 'ЗАГРУЗКА'}</div>
				<div>{s && !byTabnumLoading ? s.map(getJSXDaySchedule) : ''}</div>
			</div>
		</>
	);
};

export default Schedule;
