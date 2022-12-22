import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { v4 } from 'uuid';

export enum AlertTypes {
	Success,
	Info,
	Warning,
	Danger,
}

export type AlertWithoutType = {
	id?: string;
	title: string;
	text: string;
	time?: number;
};

export type AlertInfo = AlertWithoutType & { alertType: AlertTypes };

type AlertState = AlertInfo & {id: string}
export type AlertsState = Array<AlertState>;

const initialState: AlertsState = [];

export const alertsSlice = createSlice({
	name: 'alerts',
	initialState,
	reducers: {
		addSuccessAlert: (
			state: AlertsState,
			action: PayloadAction<AlertWithoutType>
		) => {
			state.push({ ...action.payload, alertType: AlertTypes.Success, id: v4() });
			return state;
		},
		addInfoAlert: (
			state: AlertsState,
			action: PayloadAction<AlertWithoutType>
		) => {
			state.push({ ...action.payload, alertType: AlertTypes.Info, id: v4() });
			return state;
		},
		addWarningAlert: (
			state: AlertsState,
			action: PayloadAction<AlertWithoutType>
		) => {
			state.push({ ...action.payload, alertType: AlertTypes.Warning, id: v4() });
			return state;
		},
		addDangerAlert: (
			state: AlertsState,
			action: PayloadAction<AlertWithoutType>
		) => {
			state.push({ ...action.payload, alertType: AlertTypes.Danger, id: v4() });
			return state;
		},

		addAlert: (state: AlertsState, action: PayloadAction<AlertInfo>) => {
			state.push({...action.payload, id: v4()});
			return state;
		},
		removeAlert: (state: AlertsState, action: PayloadAction<string>) => {
			return state.filter((value) => value.id !== action.payload);
		},
	},
});

export const {
	addAlert,
	addSuccessAlert,
	addInfoAlert,
	addWarningAlert,
	addDangerAlert,
	removeAlert,
} = alertsSlice.actions;

export const selectAlerts = (state: RootState) => state.alerts;
