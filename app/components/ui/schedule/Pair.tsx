import Link from 'next/link';
import { FC } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { IPair, ITechInfo } from '../../../models/schedule';
import {
  useLazyStudListQuery
} from '../../../services/edu/ScheduleService';
import { selectUser } from '../../../store/reducers/UserSlice';
import Accordion from '../accordion/Accordion';
import styles from './Schedule.module.scss';
import Student from './Student';

interface IProps {
	pair: IPair;
	isModal: boolean;
	teacherClicked: (tabnum: number, fio: string) => void;
}

const Pair: FC<IProps> = ({ pair, isModal, teacherClicked }) => {
	const { data: user } = useAppSelector(selectUser);
	const [trigger, { isLoading, isFetching, isError, data }] =
		useLazyStudListQuery();

	if (!user) {
		return <></>;
	}

	const loadStudents = (techInfo: ITechInfo) => {
		return async () => {
			if (!data && !isError) {
				await trigger(techInfo);
			}
			return data;
		};
	};

	return (
		<>
			<div className={styles.pair}>
				{pair.subject_name}, {pair.norm_comment},{' '}
				{user.logged_as.rights.is_student && !isModal ? (
					<u
						className="cursor-pointer"
						onClick={() => teacherClicked(pair.sotr_tabnum, pair.sotr_fio)}
					>
						{pair.sotr_fio}
					</u>
				) : (
					<>{pair.group_name}</>
				)}
				{', '}
				{pair.mesto.substring(0, 4) === 'http' ? (
					<Link href={pair.mesto}>
						<a className="underline" target="_blank">
							Ссылка на занятие
						</a>
					</Link>
				) : (
					pair.mesto
				)}
			</div>
			{user.logged_as.rights.is_employee ? (
				<Accordion header="Студенты" onClick={loadStudents(pair.tech_info)}>
          <div className='flex flex-row flex-wrap'>
					{isLoading
						? 'Загрузка...'
						: data?.map((student) => (
								<Student
									key={`${pair.tech_info}-${student.id}`}
									student={student}
								/>
              ))}
          </div>
				</Accordion>
			) : (
				''
			)}
		</>
	);
};

export default Pair;
