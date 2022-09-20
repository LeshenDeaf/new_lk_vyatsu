import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import { IVoting } from '../../../models/api/votings/types';
import styles from '../../../../styles/Votings.module.scss';

interface Props {
	voting: IVoting;
}

const VotingsListElement: FC<Props> = ({ voting }) => {
	const backgrounds = useMemo(
		() => ({
			main: !voting.has_voted ? 'bg-vyatsu-blue/[0.15]' : 'bg-[#E7E7E7]/[0.15]',
			border: !voting.has_voted ? 'bg-vyatsu-blue' : 'bg-[#E7E7E7]',
			button: !voting.has_voted
				? 'bg-vyatsu-blue hover:bg-vyatsu-darkblue'
				: 'bg-[#E7E7E7]',
			buttonText: !voting.has_voted ? 'text-white' : 'text-black',
		}),
		[voting.has_voted]
	);

	const { asPath } = useRouter();

	return (
		<div className={`${styles.votingElement} ${backgrounds.main}`}>
			<div className={`${styles.bar} ${backgrounds.border}`}></div>
			<div className={styles.content}>
				<div className={styles.name}>{voting.name}</div>
				<div>
					<Link href={`${asPath}${voting.id}/`}>
						<a
							className={`${backgrounds.button} ${backgrounds.buttonText} ${styles.link}`}
						>
							Пройти
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default VotingsListElement;
