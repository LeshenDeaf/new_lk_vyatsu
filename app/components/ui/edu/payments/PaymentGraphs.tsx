import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { FC, memo, useState } from 'react';
import { dateFormat } from '../../../../configs/DateFormat';
import dayjs from '../../../../configs/DayJS';
import {
	useGraphQuery,
	useTypesListQuery,
} from '../../../../services/edu/PaymentsService';
import Accordion from '../../accordion/Accordion';
import PaymentGraph from './PaymentGraph';

const PaymentGraphs: FC = () => {
	const {
		data: types,
		isLoading,
		isFetching,
		isError,
		error,
	} = useTypesListQuery();

	if (isLoading || isFetching) {
		return <>Загрузка...</>;
	}

	if (!isLoading && !isFetching && !isError && !types) {
		return <>404</>;
	}

	if (isError && error) {
		const err = error as FetchBaseQueryError;

		return <>{(err.data as { message: string })?.message}</>;
	}

	return (
		<div className="w-full">
			{types?.map((type) => (
				<PaymentGraph
					type={type}
					key={type.payment_type}
				/>
			))}
		</div>
	);
};

export default memo(PaymentGraphs);
