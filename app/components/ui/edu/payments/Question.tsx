import React, { FC, memo } from 'react';
import { PaymentQuestion } from '../../../../models/api/edu/paymentTypes';

const Question: FC<{ question: PaymentQuestion }> = ({ question }) => {
	return (
		<div className="my-6 relative p-6 pl-6 shadow-dark rounded-[10px] bg-white">
			<div className="pl-5">
				<span className="absolute text-blue-600 top-4 left-6 text-3xl">?</span>
				{question.text}
			</div>
			<div className="text-slate-800 mt-2 pl-5">
				<span className="absolute text-blue-600 top-12 left-6 text-2xl">✓</span>
				{question.answer}
			</div>
		</div>
	);
};

export default memo(Question);
