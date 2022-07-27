import { IPair } from '../../models/IPair';
import { basicVyatsu } from '../BasicVyatsu';

export const scheduleApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		personal: builder.query<IPair[], void>({
			query: () => 'api/edu/schedule/personal',
		}),
		byTabnum: builder.mutation<IPair[], number>({
			query: (tabnum) => ({
				url: 'api/edu/schedule/by_tabnum',
				method: 'POST',
				body: { tabnum },
			}),
		}),
	}),
});

export const { usePersonalQuery, useByTabnumMutation } = scheduleApi;
