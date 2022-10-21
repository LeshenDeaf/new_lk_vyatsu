import Link from 'next/link';
import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../hooks/redux';
import { IPairGroup } from '../../../models/schedule';
import { selectUser } from '../../../store/reducers/UserSlice';
import styles from './Schedule.module.scss';

interface Props {
	pairGroup: IPairGroup;
	teacherClicked: (tabnum: number, fio: string) => void;
}

const PairGroup: FC<Props> = ({ pairGroup, teacherClicked }) => {
	const {data: user} = useAppSelector(selectUser);

	if (!user) {
		return <></>;
	}

	return (
		<div className={styles.pairGroup}>
			<div className={styles.time}>
				Пара {pairGroup.number}. С {pairGroup.time.replace('-', ' – ')}
			</div>
			{pairGroup.pairs.map((pair) => (
				<div className={styles.pair} key={uuidv4()}>
					{pair.subject_name}, {pair.norm_comment},{' '}
					{
						user.logged_as.rights.is_student 
							? <u
								className="cursor-pointer"
								onClick={() => teacherClicked(pair.sotr_tabnum, pair.sotr_fio)}
							>
								{pair.sotr_fio}
							</u>
							: <>{pair.group_name}</>
					}{', '}
					{pair.mesto.substring(0, 4) === 'http' ? (
						<Link href={pair.mesto}>
							<a className="underline" target="_blank">Ссылка на занятие</a>
						</Link>
					) : (
						pair.mesto
					)}
				</div>
			))}
		</div>
	);
};

export default React.memo(PairGroup);
