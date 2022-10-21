import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { AuthResponse } from '../models/api/auth/types';
import { setAuthData } from '../store/reducers/AuthSlice';
import { unsetUserData } from '../store/reducers/UserSlice';
import { RootState } from '../store/store';

export const baseQuery = fetchBaseQuery({
	baseUrl: '/', //'https://new.vyatsu.ru',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;

		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
	mode: 'cors',
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery(
			'/api/auth/refresh/',
			api,
			extraOptions
		);

		if (refreshResult.data) {
			const res = refreshResult.data as AuthResponse;
			// store the new token
			api.dispatch(setAuthData(res));
			// retry the initial query
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(unsetUserData());
		}
	}

	return result;
};

export const basicVyatsu = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	tagTypes: ['User', 'Schedule', 'Payments', 'Votings', 'Programs'],
});
