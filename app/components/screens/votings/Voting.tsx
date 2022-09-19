import { FC, useCallback, useMemo } from 'react';
import { IAnswer, IQuestion, IVoting } from '../../../models/api/votings/types';
import dynamic from 'next/dynamic';
// import RadioInput from '../../ui/inputs/RadioInput';
// import TextareaInput from '../../ui/inputs/TextareaInput';
// import TextInput from '../../ui/inputs/TextInput';
const RadioInput = dynamic(() => import('../../ui/inputs/RadioInput'), {
	suspense: true,
});
const CheckboxInput = dynamic(() => import('../../ui/inputs/CheckboxInput'), {
	suspense: true,
});
const TextareaInput = dynamic(() => import('../../ui/inputs/TextareaInput'), {
	suspense: true,
});
const TextInput = dynamic(() => import('../../ui/inputs/TextInput'), {
	suspense: true,
});

interface IProps {
	voting: IVoting;
	questions: IQuestion[];
}

const Voting: FC<IProps> = ({ voting, questions }) => {
	const inputTypes = useMemo(
		() => ({
			text: TextInput,
			checkbox: CheckboxInput,
			radio: RadioInput,
			textarea: TextareaInput,
		}),
		[]
	);
	const chooseInput = useCallback(
		(answer: IAnswer, isRequired: boolean, name: string) => {
			const Component = inputTypes[answer.type];

			return (
				<Component
					key={answer.id}
					isRequired={isRequired}
					name={name}
					label={answer.message}
					params={answer.params}
					defaultValue={`${answer.id}`}
				/>
			);
		},
		[inputTypes]
	);
	const makeQuestion = useCallback(
		(question: IQuestion) => {
			return (
				<div key={question.id}>
					<div>{question.title.replaceAll('&nbsp;', ' ')}{question.is_required ? ' *' : ''}</div>
					<div>
						{question.answers.map((a) =>
							chooseInput(a, question.is_required, `${question.id}`)
						)}
					</div>
				</div>
			);
		},
		[chooseInput]
	);
	return (
		<form>
			<div>{voting.name}</div>
			<div>{questions.map(makeQuestion)}</div>
      <button>Отправить</button>
		</form>
	);
};

export default Voting;
