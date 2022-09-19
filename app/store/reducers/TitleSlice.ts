import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';

export type TitleState = {
	title: string;
};

const initialState: TitleState = {
	title: 'TITLE'
};

const titleSlice = createSlice({
	name: 'title',
	initialState,
	reducers: {
		setTitle: (
			state: TitleState,
			action: PayloadAction<string>
		) => {
			state.title = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.title,
			};
		},
	},
});

export const { setTitle } = titleSlice.actions;

export default titleSlice.reducer;

export const selectTitle = (state: RootState) => state.title;
