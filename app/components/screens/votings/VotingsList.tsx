import React, { FC } from 'react'
import { IVoting } from '../../../models/api/votings/types';
import VotingsListElement from './VotingListElement';
import styles from '../../../../styles/Votings.module.scss';

interface Props {
  votings: IVoting[];
}

const VotingsList: FC<Props> = ({votings}) => {
  return (
    <div>
      {votings.map(voting => <VotingsListElement key={voting.id} voting={voting} />)}
    </div>
  );
}

export default VotingsList;
