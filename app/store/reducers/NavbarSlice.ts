import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';
import { NavList } from '../../configs/Pages';


export type NavbarState = {
	prevCategory: null|number;
	categoryIndex: number;
	categoriesCount: number;
};

const initialState: NavbarState = {
	prevCategory: null,
	categoryIndex: 0,
	categoriesCount: NavList.length,
};

const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {
		setNavbarIndex: (
			state: NavbarState,
			action: PayloadAction<number>
		) => {
			state.prevCategory = state.categoryIndex;
			state.categoryIndex = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.navbar,
			};
		},
	},
});

export const { setNavbarIndex } = navbarSlice.actions;

export default navbarSlice.reducer;

export const selectNavbar = (state: RootState) => state.navbar;
