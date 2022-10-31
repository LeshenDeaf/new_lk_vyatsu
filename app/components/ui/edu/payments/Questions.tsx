import React, { FC, memo } from 'react';
import { usePaymentQuestionsQuery } from '../../../../services/edu/PaymentsService';
import Question from './Question';

const Questions: FC = () => {
	const { data: questions, isLoading, isFetching } = usePaymentQuestionsQuery();

	if (isLoading || isFetching) {
		return <div>Загрузка...</div>;
	}

	return (
		<div>
			{questions?.map((q) => (
				<Question question={q} key={q.id} />
			))}
		</div>
	);
};

export default memo(Questions);
