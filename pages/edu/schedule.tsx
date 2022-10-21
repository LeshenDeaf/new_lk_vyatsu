import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import Modal from '../../app/components/ui/modal/Modal';
import DaySchedule from '../../app/components/ui/schedule/DaySchedule';
import { ScheduleColors } from '../../app/configs/ScheduleColors';
import { IDaySchedule } from '../../app/models/schedule';
import {
	usePersonalQuery,
	useTeacherQuery,
} from '../../app/services/edu/ScheduleService';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

const Schedule: NextPage = () => {
	const { data: schedule, isLoading } = usePersonalQuery();

	const [tabnum, setTabnum] = useState(0);
	const [fio, setFio] = useState('');
	const {
		data: teacherSchedule,
		isLoading: isLoadingT,
		isError,
		isFetching,
	} = useTeacherQuery(tabnum, { skip: false });

	const [isVisible, setIsVisible] = useState(false);

	dayjs.extend(require('dayjs/plugin/customParseFormat'));
	dayjs.locale(require('dayjs/locale/ru'));

	const teacherClicked = useCallback(async (tnum: number, fio: string) => {
		setTabnum(tnum);
		setFio(fio);
		setIsVisible(true);
	}, []);

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
			{teacherSchedule && !isLoading && !isFetching && !isError ? (
				<>
					<div>{isLoading && 'Загрузка...'}</div>
					<Modal
						isVisible={isVisible}
						isLoading={isLoadingT || isFetching}
						setIsVisible={setIsVisible}
						header={fio}
					>
						{teacherSchedule.map(getJSXDaySchedule)}
					</Modal>
				</>
			) : (
				''
			)}
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Расписание'));

		return { props: {} };
	}
);

export default Schedule;
