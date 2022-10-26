import Link from 'next/link';
import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../hooks/redux';
import { IPairGroup, ITechInfo } from '../../../models/schedule';
import { useLazyStudListQuery } from '../../../services/edu/ScheduleService';
import { selectUser } from '../../../store/reducers/UserSlice';
import Accordion from '../accordion/Accordion';
import styles from './Schedule.module.scss';

interface IProps {
	pairGroup: IPairGroup;
	isModal?: boolean;
	teacherClicked: (tabnum: number, fio: string) => void;
}

const PairGroup: FC<IProps> = ({ pairGroup, teacherClicked, isModal }) => {
	const { data: user } = useAppSelector(selectUser);
	const [trigger, { isLoading, isFetching, isError, data, error }] =
		useLazyStudListQuery();

	if (!user) {
		return <></>;
	}

	const loadStudents = (techInfo: ITechInfo) => {
		return async () => {
			if (!data) {
				await trigger(techInfo);
			}
		};
	};

	return (
		<div className={styles.pairGroup}>
			<div className={styles.time}>
				Пара {pairGroup.number}. С {pairGroup.time.replace('-', ' – ')}
			</div>
			{pairGroup.pairs.map((pair) => {
				return (
					<>
						<div className={styles.pair} key={uuidv4()}>
							{pair.subject_name}, {pair.norm_comment},{' '}
							{user.logged_as.rights.is_student && !isModal ? (
								<u
									className="cursor-pointer"
									onClick={() =>
										teacherClicked(pair.sotr_tabnum, pair.sotr_fio)
									}
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
						<Accordion
							header="Студенты"
							onOpen={loadStudents(pair.tech_info)}
							key={uuidv4()}
						>
							{data
								? JSON.stringify(data)
								: isLoading || isFetching
								? 'Загрузка...'
								: ' '}
						</Accordion>
					</>
				);
			})}
		</div>
	);
};

export default React.memo(PairGroup);
