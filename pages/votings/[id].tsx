import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Voting from '../../app/components/screens/votings/Voting';
import {
	useQuestionsQuery,
	useVotingQuery
} from '../../app/services/votings/VotingsApi';
import { setTitle } from '../../app/store/reducers/TitleSlice';

const VotingPage: NextPage = () => {
	const dispatch = useDispatch();
	const { query } = useRouter();
	const id = useMemo(() => +(query?.id || 0), [query.id]);

	const votingQuery = useVotingQuery(id);
	const questionsQuery = useQuestionsQuery(id);

	useEffect(() => {
		if (votingQuery.data) {
			dispatch(setTitle(votingQuery.data.name));
		}
	}, [dispatch, votingQuery.data, votingQuery?.data?.name]);

	if (!id) {
		return <>Указан некорректный идентификатор опроса</>;
	}

	if (votingQuery.isError) {
		return <>Возникла ошибка при получении данных опроса, обновите страницу</>;
	}

	if (questionsQuery.isError) {
		return <>Возникла ошибка при получении данных опроса, обновите страницу</>;
	}


	console.log('!!!!');

	return (
		<>
			{votingQuery.isLoading || questionsQuery.isLoading ? 'Загрузка...' : ''}
			{votingQuery.data && questionsQuery.data && (
				<Voting voting={votingQuery.data} questions={questionsQuery.data} />
			)}
		</>
	);
};

export default VotingPage;
