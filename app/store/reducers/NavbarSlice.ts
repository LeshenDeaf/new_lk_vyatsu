import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';

export interface INavbarAction {
	categoryIndex: number;
}

export type NavbarState = {
	categoryIndex: number;
}

const initialState: NavbarState = {
	categoryIndex: 0
}

const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {
		setNavbarIndex: (state, action: PayloadAction<INavbarAction|NavbarState>) => {
			state.categoryIndex = action.payload.categoryIndex;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			// state.token = action.payload.token;
			// state.isAuth = action.payload.isAuth;
			return {
				...state,
				...action.payload.navbar,
			};
		}
	}
});

export const { setNavbarIndex } = navbarSlice.actions;

export default navbarSlice.reducer;

export const selectNavbar = (state: RootState) => state.navbar;
