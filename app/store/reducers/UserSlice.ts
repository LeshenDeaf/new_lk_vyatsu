import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';

export type UserState = {
	data: IUser | null;
};

export const initialState: UserState = {
	data: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state: UserState, action: PayloadAction<IUser>) => {
			state.data = action.payload;
		},
		unsetUserData: (state: UserState) => {
			state.data = null;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.user,
			};
		},
	},
});

export const { setUserData, unsetUserData } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
