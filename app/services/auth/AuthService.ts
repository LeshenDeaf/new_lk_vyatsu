import { IUser } from '../../models/IUser';
import { basicVyatsu } from '../BasicVyatsu';
import { AuthState } from '../../store/reducers/AuthSlice';
import { LoginRequest } from '../../models/api/auth/types';

export const authApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<AuthState, LoginRequest>({
			query: (credentials: LoginRequest) => ({
				url: 'api/auth/login/', //'api_mobile/v1/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: builder.mutation<null, void>({
			query: () => ({
				url: 'api/auth/logout/',
				method: 'POST',
				credentials: "include"
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => 'protected',
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useProtectedMutation } = authApi;
