import axios from 'axios';
import { NextPage } from 'next';
import VotingsList from '../../app/components/screens/votings/VotingsList';
import { IVoting } from '../../app/models/api/votings/types';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

const Votings: NextPage<{ votings: IVoting[] }> = ({
	votings,
}: {
	votings: IVoting[];
}) => {
	return <VotingsList votings={votings} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		const { auth } = store.getState();
		const votings = await axios.get(
			process.env.APP_URL + '/api/votings/list/',
			{
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			}
		);

		store.dispatch(setTitle('Опросы'));

		return {
			props: {
				votings: votings.data as IVoting[],
			},
		};
	}
);

export default Votings;
