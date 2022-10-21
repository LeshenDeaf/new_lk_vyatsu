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
		loginAs: builder.mutation<AuthState, string>({
			query: (login: string) => ({
				url: 'api/auth/login_as/', //'api_mobile/v1/login',
				method: 'POST',
				body: { login },
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

export const { useLoginMutation, useLoginAsMutation, useLogoutMutation, useProtectedMutation } = authApi;
