import { IVoting } from '../../models/api/votings/types';
import { basicVyatsu } from '../BasicVyatsu';
import { IQuestion, IVoteRequest } from './../../models/api/votings/types';

export const votingsApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		votings: builder.query<IVoting[], void>({
			query: () => 'api/votings/list',
			providesTags: ['Votings'],
		}),
		voting: builder.query<IVoting, number>({
			query: (votingId) => `api/votings/${votingId}`,
			providesTags: ['Votings'],
		}),
		questions: builder.query<IQuestion[], number>({
			query: (vote_id: number) => ({
				url: `api/votings/questions`,
				method: 'POST',
				body: { vote_id },
			}),
		}),
		vote: builder.mutation<void, IVoteRequest>({
			query: (req) => ({
				url: 'api/votings/vote',
				method: 'POST',
				body: req,
			}),
			invalidatesTags: ['Votings'],
		}),
	}),
});

export const {
	useVotingsQuery,
	useVotingQuery,
	useQuestionsQuery,
	useVoteMutation,
} = votingsApi;
