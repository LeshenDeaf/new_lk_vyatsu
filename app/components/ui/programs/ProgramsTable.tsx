import React, { memo, useMemo, useState } from 'react';
import { ProgramDisciplineColors } from '../../../configs/ProgramDisciplineColors';
import { ProgramsApiResponse } from '../../../models/api/edu/programsTypes';
import ProgramDicsipline from './ProgramDicsipline';
interface Props {
	programs: ProgramsApiResponse;
}

export default memo(function ProgramsTable({ programs }: Props) {
	const [selectedCourse, setSelectedCourse] = useState(0);
	const courses = useMemo(
		() => [...Array(programs.courses).keys()],
		[programs.courses]
	);

	return (
		<>
			<div id="course-select" className="hidden lg:flex py-6 justify-between">
				<div
					className={
						'course py-[20px] w-full cursor-pointer rounded-2xl flex justify-center items-center mx-[20px] ' +
						(selectedCourse === 0 ? 'shadow-xl' : '')
					}
					onClick={() => setSelectedCourse(0)}
				>
					<div>Все курсы</div>
				</div>
				{courses.map((i) => (
					<div
						key={`course-${i + 1}`}
						className={
							'course py-[20px] w-full cursor-pointer rounded-2xl flex justify-center items-center mx-[20px] ' +
							(selectedCourse === i + 1 ? 'shadow-xl' : '')
						}
						onClick={() => setSelectedCourse(i + 1)}
					>
						{i + 1} курс
					</div>
				))}
			</div>
			<div className="mt-[30px] lg:mt-0 w-full rounded-2xl border overflow-hidden shadow-xl">
				<div className="hidden lg:grid grid-cols-4 grid-gap-0">
					<div className=" border pl-10 py-[20px] col-span-2 flex justify-center items-center">
						<div>Дисциплина</div>
					</div>
					<div className=" border text-center flex justify-center items-center">
						<div>ЗЕТ</div>
					</div>
					<div className=" border text-center flex justify-center items-center">
						Оценка зананий
					</div>
				</div>
				{/* <!-- mobile  --> */}
				<div className="lg:hidden grid grid-cols-${data.courses.length}">
					<div
						key={`course-0-mobile`}
						className={
							'course text-center py-[10px] ' +
							(selectedCourse === 0 ? 'bg-vyatsu-blue text-white' : '')
						}
						onClick={() => setSelectedCourse(0)}
					>
						Все курсы
					</div>
					{courses.map((i) => (
						<div
							key={`course-${i + 1}-mobile`}
							className={
								'course text-center py-[10px] ' +
								(selectedCourse === i + 1 ? 'bg-vyatsu-blue text-white' : '')
							}
							onClick={() => setSelectedCourse(i + 1)}
						>
							{i + 1} курс
						</div>
					))}
				</div>
				<div className="lg:hidden grid grid-cols-2">
					<div className="border text-center py-[10px]">ЗЕТ</div>
					<div className="border text-center py-[10px]">Оценка зананий</div>
				</div>
				{programs.program.map((courseDisciplines) =>
					courseDisciplines.disciplines.map((discipline) => (
						<ProgramDicsipline
							key={`${discipline.op_id || discipline.subject_id}-${
								courseDisciplines.course
							}`}
							isHidden={
								courseDisciplines.course !== selectedCourse &&
								selectedCourse !== 0
							}
							color={ProgramDisciplineColors[discipline.color] || ''}
							discipline={discipline}
						/>
					))
				)}
			</div>
		</>
	);
});
