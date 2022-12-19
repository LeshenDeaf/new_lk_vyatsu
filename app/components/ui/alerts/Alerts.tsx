import { useAppSelector } from '../../../hooks/redux';
import { selectAlerts } from '../../../store/reducers/AlertsSlice';
import { Alert } from './Alert';

export const Alerts = () => {
	const alerts = useAppSelector(selectAlerts);

	return (
		<div
			id="alerts"
			className="fixed flex flex-col-reverse right-0 top-10"
			style={{transition: ".2s all ease-in-out"}}
		>
			{alerts.map((alert) => {
				return <Alert key={alert.id} {...alert} />;
			})}
		</div>
	);
};
