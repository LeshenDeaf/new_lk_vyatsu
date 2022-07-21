import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const baseQuery = fetchBaseQuery({
	baseUrl: '/', //'https://new.vyatsu.ru',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;

		// If we have a token set in state, let's assume that we should be passing it.
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
	mode: 'cors',
});

export const basicVyatsu = createApi({
	baseQuery,
	endpoints: () => ({}),
});
