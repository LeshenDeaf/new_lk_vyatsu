import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { v4 } from 'uuid';

export enum AlertTypes {
	Success,
	Info,
	Warning,
	Danger,
}

export type AlertInfo = {
  id?: string;
  title: string;
  text: string;
  alertType: AlertTypes
  time?: number;
}

export type AlertsState = Array<any>;

const initialState: AlertsState = [];

export const alertsSlice = createSlice({
	name: 'alerts',
	initialState,
	reducers: {
		add: (
			state: AlertsState,
			action: PayloadAction<AlertInfo>
		) => {
      action.payload.id ??= v4();
      state.push(action.payload);
      return state;
		},
    remove: (
      state: AlertsState,
      action: PayloadAction<string>
    ) => {
      return state.filter(value => value.id !== action.payload);
    }
	}
});

export const { add, remove } = alertsSlice.actions;

export const selectAlerts = (state: RootState) => state.alerts;
