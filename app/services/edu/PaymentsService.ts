import { PaymentGraph, PaymentQuestion, PaymentType } from '../../models/api/edu/paymentTypes';
import { basicVyatsu } from '../BasicVyatsu';

export const paymentsApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		typesList: builder.query<PaymentType[], void>({
			query: () => 'api/edu/payments/list',
			providesTags: ['Payments'],
			keepUnusedDataFor: 180,
		}),
		graph: builder.query<PaymentGraph[], string>({
			query: (paymentType) =>
				`api/edu/payments/graph/?payment_type=${paymentType}`,
			providesTags: ['Payments'],
			keepUnusedDataFor: 180,
		}),
		paymentQuestions: builder.query<PaymentQuestion[], void>({
			query: () => 'api/edu/payments/questions',
			providesTags: ['Payments'],
			keepUnusedDataFor: 180,
		}),
	}),
});

export const { useTypesListQuery, useGraphQuery, usePaymentQuestionsQuery } = paymentsApi;
