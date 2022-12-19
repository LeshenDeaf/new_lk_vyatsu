import React from 'react'
import { useAppSelector } from '../../../hooks/redux';
import { selectAlerts } from '../../../store/reducers/AlertsSlice';
import { Alert } from './Alert';

export const Alerts = () => {
  const alerts = useAppSelector(selectAlerts);

  return (
    <div id="alerts" className="fixed right-0 top-10">
      {alerts.map(alert => {
        console.log(alert.id)
        return <Alert key={alert.id} {...alert} />
      })}
    </div>
  )
}
