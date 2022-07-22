import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';
import { NavList } from '../../utils/Pages';


export type NavbarState = {
	categoryIndex: number;
	categoriesCount: number;
};

const initialState: NavbarState = {
	categoryIndex: 0,
	categoriesCount: NavList.length,
};

const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {
		setNavbarIndex: (
			state,
			action: PayloadAction<number>
		) => {
			state.categoryIndex = action.payload;
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
		},
	},
});

export const { setNavbarIndex } = navbarSlice.actions;

export default navbarSlice.reducer;

export const selectNavbar = (state: RootState) => state.navbar;
