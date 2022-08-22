import React, { useState } from 'react';
import { IDaySchedule } from '../../app/models/schedule';
import {
	useByTabnumMutation,
	usePersonalQuery,
} from '../../app/services/edu/ScheduleService';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import DaySchedule from '../../app/components/ui/schedule/DaySchedule';
import Link from 'next/link';

const Schedule = () => {
	const { data: schedule, isLoading } = usePersonalQuery();
	const [getByTabnum, { isLoading: byTabnumLoading }] = useByTabnumMutation();
	const [s, setS] = useState<IDaySchedule[] | null>(null);

	dayjs.extend(require('dayjs/plugin/customParseFormat'));
	dayjs.locale(require('dayjs/locale/ru'));

	const getgetget = async () => {
		const res = await getByTabnum(21378);
		if ('data' in res) {
			setS(res.data);
		}
	};

	const getJSXDaySchedule = (schedule: IDaySchedule) => (
		<DaySchedule schedule={schedule} dayjs={dayjs} key={uuidv4()} />
	);

	return (
		<>
			<div>{!isLoading && schedule?.map(getJSXDaySchedule)}</div>
			<button onClick={getgetget}> GETGETGET </button>
			<div>
				<div>{byTabnumLoading && 'ЗАГРУЗКА'}</div>
				<div>{s && !byTabnumLoading ? s.map(getJSXDaySchedule) : ''}</div>
			</div>
			<Link href='/'>
				<a
					draggable="false"
					className=""
				>
					TEST
				</a>
			</Link>
		</>
	);
};

export default Schedule;
