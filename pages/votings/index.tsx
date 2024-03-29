import { NextPage } from 'next';
import VotingsList from '../../app/components/screens/votings/VotingsList';
import { useVotingsQuery } from '../../app/services/votings/VotingsApi';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

const Votings: NextPage = () => {
	const { data: votings, isLoading, isError, error } = useVotingsQuery();

	if (isError) {
		return <>{error}</>;
	}

	return (
		<>
			{isLoading && 'Загрузка...'}
			{!isLoading && votings && <VotingsList votings={votings} />}
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Опросы'));

		return { props: {} };
	}
);

export default Votings;
