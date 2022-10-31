import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { NextPage } from 'next';
import { useState } from 'react';
import {
	useGraphQuery,
	useTypesListQuery,
} from '../../app/services/edu/PaymentsService';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';
import { v4 as uuidv4 } from 'uuid';
import Accordion from '../../app/components/ui/accordion/Accordion';
import { dateFormat } from '../../app/configs/DateFormat';
import dayjs from 'dayjs';

const Payments: NextPage = () => {
	const [skip, setSkip] = useState(true);
	const [paymentType, setPaymentType] = useState('');
	const {
		data: types,
		isLoading,
		isFetching,
		isError,
		error,
	} = useTypesListQuery();

	const {
		data: graph,
		isLoading: isLoadingG,
		isFetching: isFetchingG,
		isError: isErrorG,
		error: errorG,
	} = useGraphQuery(paymentType, { skip });

	const loadGraph = (type: string) => {
		return () => {
			setPaymentType(type);
			setSkip(false);
		};
	};

	if (isLoading || isFetching) {
		return <>Загрузка...</>;
	}

	if (!isLoading && !isFetching && !isError && !types) {
		return <>404</>;
	}

	if (isError && error) {
		const err = error as FetchBaseQueryError;
		err.data = err.data as { message: string };
		return <>{err.data?.message}</>;
	}

	return (
		<div className="w-full">
			{types?.map((type) => (
				<Accordion
					key={type.payment_type}
					header={`${type.payment_type}. Долг: ${type.dept}`}
					onClick={loadGraph(type.payment_type)}
				>
					{graph?.map((el) => (
						<div key={el.graf_id} className="flex flex-column">
							<div className="mr-4">
								{el.grafic_pay.map((gpay) => (
									<div key={`${el.graf_id}-${gpay.DataPay}-${gpay.Summa}`}>
										{dayjs(gpay.DataPay).format(dateFormat)} - {gpay.Summa} ₽
									</div>
								))}
							</div>
							<div>
								{el.fact_pay.map((fpay) => (
									<div key={`${el.graf_id}-${fpay.DataPaySt}-${fpay.SummaSt}`}>
										{dayjs(fpay.DataPaySt).format(dateFormat)} - {fpay.SummaSt} ₽
									</div>
								))}
							</div>
						</div>
					))}
				</Accordion>
			))}
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Оплата обучения'));

		return {
			props: {},
		};
	}
);

export default Payments;
