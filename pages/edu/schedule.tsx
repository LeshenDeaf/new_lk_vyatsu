import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import Modal from '../../app/components/ui/modal/Modal';
import DaySchedule from '../../app/components/ui/schedule/DaySchedule';
import { ScheduleColors } from '../../app/configs/ScheduleColors';
import { IDaySchedule } from '../../app/models/schedule';
import {
	usePersonalQuery,
	useTeacherQuery
} from '../../app/services/edu/ScheduleService';


const Schedule = () => {
	const { data: schedule, isLoading } = usePersonalQuery();
	// const [getByTabnum, { isLoading: byTabnumLoading }] = useByTabnumMutation();

	const [tabnum, setTabnum] = useState(0);
	const [fio, setFio] = useState('');
	const {
		data: teacherSchedule,
		isLoading: isLoadingT,
		isError,
		error,
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
					<div>{isLoading && 'ЗАГРУЗКА'}</div>
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

export default Schedule;
