import { useAppDispatch } from './redux';
import {
	AlertTypes,
	addSuccessAlert,
	addInfoAlert,
	addDangerAlert,
	addWarningAlert,
} from '../../app/store/reducers/AlertsSlice';

type AlertArguments = {
	title: string;
	text: string;
	time?: number;
};

type AlertFunction = (alertInfo: AlertArguments) => void;

interface UseAlertResult {
	success: AlertFunction;
	info: AlertFunction;
	warning: AlertFunction;
	danger: AlertFunction;
}

export function useAlert(): UseAlertResult {
	const dispatch = useAppDispatch();

	return {
		success: (alertInfo) => dispatch(addSuccessAlert(alertInfo)),
		info: (alertInfo) => dispatch(addInfoAlert(alertInfo)),
		warning: (alertInfo) => dispatch(addWarningAlert(alertInfo)),
		danger: (alertInfo) => dispatch(addDangerAlert(alertInfo)),
	};
}
