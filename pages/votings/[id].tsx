import { NextPage } from 'next';
import Link from 'next/dist/client/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
// import Voting from '../../app/components/screens/votings/Voting';
const Voting = dynamic(
	() => import('../../app/components/screens/votings/Voting'),
	{
		suspense: true,
		// ssr: false,
	}
);
import {
	useQuestionsQuery,
	useVotingQuery,
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

	return (
		<>
			<Link href={'/votings/'} passHref={true}>
				<a className="text-vyatsu-blue hover:text-vyatsu-darkblue">Обратно</a>
			</Link>
			{votingQuery.isLoading || questionsQuery.isLoading ? 'Загрузка...' : ''}
			{votingQuery.data && questionsQuery.data && (
				<Suspense>
					<Voting voting={votingQuery.data} questions={questionsQuery.data} />
				</Suspense>
			)}
		</>
	);
};

export default VotingPage;
