import { FC, memo } from 'react';
import { IFaq } from '../../../models/api/IFaq';
import { useFaqQuery } from '../../../services/faq/FaqService';
import FaqElement from './FaqElement';

const Faq: FC = () => {
	const { isLoading, isError, data } = useFaqQuery();

	return (
		<>
			{isLoading && 'Загрузка...'}
			{data &&
				data.map((el: IFaq) => (
					<FaqElement key={el.id} header={el.name}>
						{el.answer.map((ans, i) => (
							<div key={`${el.id}-${i}`}>{ans}</div>
						))}
					</FaqElement>
				))}
		</>
	);
};

export default memo(Faq);
