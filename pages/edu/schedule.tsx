import React, { useState } from 'react';
import { IPair } from '../../app/models/IPair';
import {
	useByTabnumMutation,
	usePersonalQuery,
} from '../../app/services/edu/ScheduleService';

const Schedule = () => {
	const { data: schedule, isLoading } = usePersonalQuery();
	const [getByTabnum, { isLoading: byTabnumLoading }] = useByTabnumMutation();
	const [s, setS] = useState<IPair[] | null>(null);

	const getgetget = async () => {
		const res = await getByTabnum(21378);
		if ('data' in res) {
			setS(res.data);
		}
	};

	const getJSXPair = (pair: IPair) => (
		<div
			key={
				pair.date +
				pair.number +
				pair.time +
				pair.subject_name +
				pair.subgroup_id
			}
		>
			{JSON.stringify(pair)}
		</div>
	);

	return (
		<>
			<div>
				{!isLoading &&
					schedule?.map((pair) => (
						<div
							key={
								pair.date +
								pair.number +
								pair.time +
								pair.subject_name +
								pair.subgroup_id
							}
						>
							JSON.stringify(pair)
						</div>
					))}
			</div>
			<button onClick={getgetget}> GETGETGET </button>
			<div>
				<div>{byTabnumLoading && 'ЗАГРУЗКА'}</div>
				<div>{s && !byTabnumLoading ? JSON.stringify(s) : ''}</div>
			</div>
		</>
	);
};

export default Schedule;
