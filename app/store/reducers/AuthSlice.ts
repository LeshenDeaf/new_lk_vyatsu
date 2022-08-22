import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

export type AuthState = {
	token: string | null;
	isAuth: boolean | null;
};

interface IAuthAction {
	token: string;
	isAuth: boolean;
}

export const initialState: AuthState = {
	token: null,
	isAuth: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthData: (state: AuthState, action: PayloadAction<IAuthAction|AuthState>) => {
			state.token = action.payload.token;
			state.isAuth = action.payload.isAuth;
		},
		changeToken: (state: AuthState, action: PayloadAction<{ token: string }>) => {
			state.token = action.payload.token;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			// state.token = action.payload.token;
			// state.isAuth = action.payload.isAuth;
			return {
				...state,
				...action.payload.auth,
			};
		}
	}
});

export const { setAuthData, changeToken } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
