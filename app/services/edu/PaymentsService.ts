import { PaymentGraph, PaymentType } from '../../models/api/edu/paymentTypes';
import { basicVyatsu } from '../BasicVyatsu';

export const paymentsApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		typesList: builder.query<PaymentType[], void>({
			query: () => 'api/edu/payments/list',
			providesTags: ['Payments'],
		}),
		graph: builder.query<PaymentGraph[], string>({
			query: (paymentType) =>
				`api/edu/payments/graph/?payment_type=${paymentType}`,
			providesTags: ['Payments'],
		}),
	}),
});

export const { useTypesListQuery, useGraphQuery } = paymentsApi;
