import { ProgramsApiResponse } from '../../models/api/edu/programsTypes';
import { basicVyatsu } from '../BasicVyatsu';

export const programsApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		list: builder.query<ProgramsApiResponse, void>({
			query: () => 'api/edu/payments/list',
			providesTags: ['Payments'],
		}),
		graph: builder.query<ProgramsApiResponse, string>({
			query: (paymentType) =>
				`api/edu/payments/graph/?payment_type=${paymentType}`,
			providesTags: ['Payments'],
		}),
	}),
});

export const { useListQuery, useGraphQuery } = programsApi;
