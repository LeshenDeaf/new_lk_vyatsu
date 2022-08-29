import React, { memo } from 'react';
import { ProgramDiscipline } from '../../../models/api/edu/programsTypes';

interface Props {
	isHidden: boolean;
	color: string;
	discipline: ProgramDiscipline;
}

export default memo(function ProgramDicsipline({
	isHidden,
	color,
	discipline,
}: Props) {
	return (
		<div
			className={`discipline hidden lg:grid lg:grid-cols-4 ${
				isHidden ? 'lg:hidden' : ''
			}`}
		>
			<div className="col-span-2  border px-10 py-[20px]">
				{discipline.name}
			</div>
			<div
				className={
					'border text-center py-[20px] flex justify-center items-center '
				}
				style={{ backgroundColor: color }}
			>
				{discipline.zet}
			</div>
			<div
				className="border text-center py-[20px] flex justify-center items-center"
				style={{ backgroundColor: color }}
			>
				{discipline.cp}
			</div>
		</div>
	);
});
