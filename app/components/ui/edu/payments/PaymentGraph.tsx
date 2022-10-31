import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { FC, memo, useState } from 'react';
import { dateFormat } from '../../../../configs/DateFormat';
import dayjs from '../../../../configs/DayJS';
import { PaymentType } from '../../../../models/api/edu/paymentTypes';
import { useGraphQuery } from '../../../../services/edu/PaymentsService';
import Accordion from '../../accordion/Accordion';

interface PaymentGraphProps {
	type: PaymentType;
}

const PaymentGraph: FC<PaymentGraphProps> = ({ type }) => {
	const [skip, setSkip] = useState(true);

	const {
		data: graph,
		isLoading,
		isFetching,
		isError,
		error,
	} = useGraphQuery(type.payment_type, { skip });

	const loadGraph = () => {
		setSkip(false);
	};

	if (isError && error) {
		const err = error as FetchBaseQueryError;

		return <>{(err.data as { message: string })?.message}</>;
	}

	return (
		<Accordion
			header={`${type.payment_type}. Долг: ${type.dept}`}
			onClick={loadGraph}
		>
			{isLoading || isFetching ? 'Загрузка...' : ''}
			{graph?.map((el) => (
				<div key={el.graf_id} className="flex flex-column">
					<div className="mr-4">
						{el.grafic_pay.map((gpay) => (
							<div key={`${el.graf_id}-${gpay.DataPay}-${gpay.Summa}`}>
								{dayjs(gpay.DataPay).format(dateFormat)} — {gpay.Summa} ₽
							</div>
						))}
					</div>
					<div>
						{el.fact_pay.map((fpay) => (
							<div key={`${el.graf_id}-${fpay.DataPaySt}-${fpay.SummaSt}`}>
								{dayjs(fpay.DataPaySt).format(dateFormat)} — {fpay.SummaSt} ₽
							</div>
						))}
					</div>
				</div>
			))}
		</Accordion>
	);
};

export default memo(PaymentGraph);
