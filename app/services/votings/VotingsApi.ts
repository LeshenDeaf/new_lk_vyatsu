import { IVoting } from '../../models/api/votings/types';
import { basicVyatsu } from '../BasicVyatsu';
import { IQuestion } from './../../models/api/votings/types';

export const votingsApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		votings: builder.query<IVoting[], void>({
			query: () => 'api/votings/list',
			providesTags: ['Votings']
		}),
		voting: builder.query<IVoting, number>({
			query: (votingId) => `api/votings/${votingId}`,
			providesTags: ['Votings']
		}),
		questions: builder.query<IQuestion[], number>({
			query: (vote_id: number) => ({
				url: `api/votings/questions`,
				method: 'POST',
				body: {vote_id}
			}),
		})
	}),
});

export const { useVotingsQuery, useVotingQuery, useQuestionsQuery } = votingsApi;
