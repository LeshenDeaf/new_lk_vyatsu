import Link from 'next/link';
import { FC, memo, useCallback } from 'react';
import { IFaq } from '../../../models/api/IFaq';
import { useFaqQuery } from '../../../services/faq/FaqService';
import FaqElement from './FaqElement';
import classNames from './Faq.module.scss';
import reactStringReplace from 'react-string-replace';

const Faq: FC = () => {
	const { isLoading, isError, data } = useFaqQuery();

	const makeLinks = useCallback((paragraph: string) => {
		const regex = /<a rel="noreferrer" href="(.*)">(.*)<\/a>/gm;

		return reactStringReplace(
			paragraph
				.replaceAll('&lt;', '<')
				.replaceAll('&gt;', '>')
				.replaceAll('&quot;', '"'),
			regex,
			(match) =>
				match ? (
					<><Link href={`https://new.vyatsu.ru${match}`} target="_blank" passHref>
						<a target="_blank" className={classNames.link}>{`https://new.vyatsu.ru${match}`}</a>
					</Link>{' '}</>
				) : (
					''
				)
		);
	}, []);

	return (
		<>
			{isLoading && 'Загрузка...'}
			{data &&
				data.map((el: IFaq) => (
					<FaqElement key={el.id} header={el.name}>
						{el.answer.map((ans, i) => (
							<div key={`${el.id}-${i}`}>{ makeLinks(ans) }</div>
						))}
					</FaqElement>
				))}
		</>
	);
};

export default memo(Faq);
