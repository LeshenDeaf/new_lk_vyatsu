import dayjs from 'dayjs';
import React, { FC } from 'react';
import capitalizeFirstLetter from '../../../helpers/capitalize-first-letter';
import { IDaySchedule } from '../../../models/schedule';
import { v4 as uuidv4 } from 'uuid';
import Pair from './PairGroup';


const DaySchedule: FC<{ schedule: IDaySchedule, dayjs: any }> = ({ schedule, dayjs }) => {
	
	const myFormat = 'DD.MM.YY';

	return (
		<div>
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
					{schedule.pairs.map((pairGroup) => (<Pair pairGroup={pairGroup} key={uuidv4()} />))}
				</div>
			</div>
		</div>
	);
};

export default React.memo(DaySchedule);
