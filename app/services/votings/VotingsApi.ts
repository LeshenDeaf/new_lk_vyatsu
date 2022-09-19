import { IVoting } from '../../models/api/votings/types';
import { basicVyatsu } from '../BasicVyatsu';

export const votingsApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		votings: builder.query<IVoting[], void>({
			query: () => 'api/votings/list',
		}),
	}),
});

export const { useVotingsQuery } = votingsApi;
