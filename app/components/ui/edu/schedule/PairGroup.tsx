import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../../hooks/redux';
import { IPairGroup } from '../../../../models/schedule';
import { selectUser } from '../../../../store/reducers/UserSlice';
import Pair from './Pair';
import styles from './Schedule.module.scss';

interface IProps {
	pairGroup: IPairGroup;
	isModal?: boolean;
	teacherClicked: (tabnum: number, fio: string) => void;
}

const PairGroup: FC<IProps> = ({ pairGroup, teacherClicked, isModal }) => {
	const { data: user } = useAppSelector(selectUser);

	if (!user) {
		return <></>;
	}

	return (
		<div className={styles.pairGroup}>
			<div className={styles.time}>
				Пара {pairGroup.number}. С {pairGroup.time.replace('-', ' – ')}
			</div>
			{pairGroup.pairs.map((pair) => (
				<Pair
					key={uuidv4()}
					pair={pair}
					isModal={isModal ?? false}
					teacherClicked={teacherClicked}
				/>
			))}
		</div>
	);
};

export default React.memo(PairGroup);
