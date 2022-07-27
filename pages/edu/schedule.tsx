import React, { useState } from 'react';
import { IDaySchedule } from '../../app/models/schedule';
import {
	useByTabnumMutation,
	usePersonalQuery,
} from '../../app/services/edu/ScheduleService';
import dayjs from 'dayjs';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const Schedule = () => {
	const { data: schedule, isLoading } = usePersonalQuery();
	const [getByTabnum, { isLoading: byTabnumLoading }] = useByTabnumMutation();
	const [s, setS] = useState<IDaySchedule[] | null>(null);

	dayjs.extend(require('dayjs/plugin/customParseFormat'));
	dayjs.locale(require('dayjs/locale/ru'));

	const myFormat = 'DD.MM.YY';

	const getgetget = async () => {
		const res = await getByTabnum(21378);
		if ('data' in res) {
			setS(res.data);
		}
	};

	const getJSXDaySchedule = (schedule: IDaySchedule) => (
		<div key={schedule.date}>
			<div className="min-h-[205px] sm:min-h-[130px] bg-[#F7F8FA] mb-4 last:mb-0 flex flex-col sm:flex-row sm:rounded-tl-2xl sm:rounded-bl-2xl">
				{/*  дата  */}
				<div className="sm:min-w-[103px] min-h-[70px] sm:min-h-[130px] bg-[#6BCB2C] flex justify-start sm:justify-start items-center sm:items-center sm:flex-col p-4 sm:py-5 sm:rounded-tl-2xl sm:rounded-bl-2xl">
					<div className="text-white font-bold text-4xl">
						{dayjs(schedule.date, myFormat).format('DD')}
					</div>
					<div className="text-white font-light ml-4 sm:ml-0">
						{capitalizeFirstLetter(
							dayjs(schedule.date, myFormat).format('MMMM')
						)}
					</div>
				</div>
				{/*  пары  */}
				<div>
					{schedule.pairs.map((pairGroup) => (
						<div
							className="flex flex-col p-4 pr-8"
							key={pairGroup.number + schedule.date}
						>
							<div className="text-vyatsu-blue font-bold">
								Пара {pairGroup.number}. С {pairGroup.time.replace('-', ' – ')}
							</div>
							{pairGroup.pairs.map((pair, index) => (
								<div key={pairGroup.time + index}>
									{pair.subject_name}, {pair.norm_comment},{' '}
									<u className="cursor-pointer">{pair.sotr_fio}</u> {pair.mesto}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);

	return (
		<>
			<div>{!isLoading && schedule?.map(getJSXDaySchedule)}</div>
			<button onClick={getgetget}> GETGETGET </button>
			<div>
				<div>{byTabnumLoading && 'ЗАГРУЗКА'}</div>
				<div>{s && !byTabnumLoading ? s.map(getJSXDaySchedule) : ''}</div>
			</div>
		</>
	);
};

export default Schedule;
