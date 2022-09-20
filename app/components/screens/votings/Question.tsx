import { memo } from 'react';
import { IAnswer, IQuestion } from '../../../models/api/votings/types';

interface IProps {
	question: IQuestion;
  chooseInput: (answer: IAnswer, isRequired: boolean, name: string) => JSX.Element
}

export default memo(function Question({
	question,
  chooseInput
}: IProps) {
	return (
		<div className="mt-4">
			<div>
				{question.title.replaceAll('&nbsp;', ' ')}
				<span className="text-slate-700">{question.is_required ? ' *' : ''}</span>
			</div>
			<div className="ml-2">
				{question.answers.map((a) =>
					chooseInput(a, question.is_required, `${question.id}`)
				)}
			</div>
		</div>
	);
});
