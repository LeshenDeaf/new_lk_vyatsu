import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import UserReducer from './reducers/UserSlice';
import NavbarReducer from './reducers/NavbarSlice';
import { basicVyatsu } from '../services/BasicVyatsu';
import { createWrapper } from 'next-redux-wrapper';
import TitleReducer from './reducers/TitleSlice';

const rootReducer = combineReducers({
	auth: AuthReducer,
	user: UserReducer,
	navbar: NavbarReducer,
	title: TitleReducer,
	[basicVyatsu.reducerPath]: basicVyatsu.reducer,
});

export const setupStore = () => configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(basicVyatsu.middleware),
});

export type RootStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action
>;
export type AppDispatch = RootStore['dispatch'];

export const wrapper = createWrapper<RootStore>(setupStore);
