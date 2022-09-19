import axios from 'axios';
import { NextPage } from 'next';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';
import { IQuestion, IVoting } from './../../app/models/api/votings/types';

interface Props {
	voting: IVoting;
  questions: IQuestion[];
}

const VotingPage: NextPage<Props> = ({ voting, questions }) => {
	// const router = useRouter();
	// const {id} = router.query;

	return (
    <>
    <pre>{JSON.stringify(voting, null, 2)}</pre>
    <pre>{JSON.stringify(questions, null, 2)}</pre>
    </>
  );
};

export default VotingPage;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query }) => {
			const { auth } = store.getState();

			const [voting, questions] = await Promise.all([
				axios.get(process.env.APP_URL + '/api/votings/' + query.id, {
					headers: {
						authorization: `Bearer ${auth.token}`,
					},
				}),
				axios.post(
					process.env.APP_URL + '/api/votings/questions/',
					{ vote_id: query.id },
					{
						headers: {
							authorization: `Bearer ${auth.token}`,
						},
					}
				),
			]);

      store.dispatch(setTitle(voting.data.name));

			return {
				props: {
					voting: voting.data as IVoting,
					questions: questions.data as IQuestion[],
				},
			};
		}
);
