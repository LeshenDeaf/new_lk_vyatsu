import { NextPage } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '../../app/components/ui/modal/Modal';
import DaySchedule from '../../app/components/ui/schedule/DaySchedule';
import dayjs from '../../app/configs/DayJS';
import { ScheduleColors } from '../../app/configs/ScheduleColors';
import { IPageLangProps } from '../../app/models/IPageLangProps';
import { IDaySchedule } from '../../app/models/schedule';
import {
	usePersonalQuery,
	useTeacherQuery,
} from '../../app/services/edu/ScheduleService';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

import en from '../../lang/en/schedule.json';
import ru from '../../lang/ru/schedule.json';

const Schedule: NextPage<IPageLangProps<typeof ru, typeof en>> = ({ lang }) => {
	const { data: schedule, isLoading } = usePersonalQuery();

	const [skip, setSkip] = useState<boolean>(true);
	const [tabnum, setTabnum] = useState(0);
	const [fio, setFio] = useState('');
	const [isVisible, setIsVisible] = useState(false);

	const {
		data: teacherSchedule,
		isLoading: isLoadingT,
		isError,
		isFetching,
	} = useTeacherQuery(tabnum, { skip });

	const ref = useRef<null | HTMLDivElement>(null);

	const teacherClicked = useCallback(async (tnum: number, fio: string) => {
		setTabnum(tnum);
		setFio(fio);
		setIsVisible(true);
		setSkip(false);
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView();
		}
		console.log(ref.current);
	}, [schedule]);

	let scrolled = false;

	const getJSXDaySchedule = (
		schedule: IDaySchedule,
		index: number,
		isModal: boolean = false
	) => {
		if (
			!scrolled &&
			dayjs(new Date()).isSameOrBefore(dayjs(schedule.date, 'DD.MM.YY'))
		) {
			scrolled = true;
			return (
				<div ref={ref}>
					<DaySchedule
						color={index % 2 === 0 ? ScheduleColors.odd : ScheduleColors.even}
						schedule={schedule}
						dayjs={dayjs}
						teacherClicked={teacherClicked}
						isModal={isModal}
						key={`${schedule.date}-${schedule.day_of_week}`}
					/>
				</div>
			);
		}

		return (
			<DaySchedule
				color={index % 2 === 0 ? ScheduleColors.odd : ScheduleColors.even}
				schedule={schedule}
				dayjs={dayjs}
				teacherClicked={teacherClicked}
				isModal={isModal}
				key={`${schedule.date}-${schedule.day_of_week}`}
			/>
		);
	};

	return (
		<>
			<div>
				{!isLoading && schedule?.length === 0 ? (
					<div className="text-3xl text-slate-800 font-medium">
						{lang.not_found}
					</div>
				) : (
					schedule?.map((e, i) => getJSXDaySchedule(e, i))
				)}
			</div>
			{teacherSchedule && !isFetching && !isError ? (
				<>
					{isLoadingT ? (
						<div> {lang.loading}</div>
					) : (
						<Modal
							isVisible={isVisible}
							isLoading={isLoadingT || isFetching}
							setIsVisible={setIsVisible}
							header={fio}
						>
							{teacherSchedule.map((e, i) => getJSXDaySchedule(e, i, true))}
						</Modal>
					)}
				</>
			) : (
				''
			)}
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx) => {
		store.dispatch(setTitle('Расписание'));

		return { props: { lang: ctx.locale === 'en' ? en : ru } };
	}
);

export default Schedule;
