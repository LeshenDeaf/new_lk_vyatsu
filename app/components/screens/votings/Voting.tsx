import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useMemo,
	useState,
} from 'react';
import {
	IAnswer,
	IQuestion,
	IRequestAnswer,
	IRequestQuestion,
	IVoteRequest,
	IVoting,
} from '../../../models/api/votings/types';
// import dynamic from 'next/dynamic';
import styles from '../../../../styles/Votings.module.scss';

import CheckboxInput from '../../ui/inputs/CheckboxInput';
import RadioInput from '../../ui/inputs/RadioInput';
import TextareaInput from '../../ui/inputs/TextareaInput';
import TextInput from '../../ui/inputs/TextInput';
import Question from './Question';
import { useVoteMutation } from '../../../services/votings/VotingsApi';

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

	const [vote, result] = useVoteMutation();

	const [formData, setFormData] = useState({});

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData: any) => ({
			...prevData,
			[e.target.name]: {
				// ...prevData[e.target.name],
				[e.target.attributes['attr-id' as any].value as any]: {
					value: e.target.value.trim(),
					is_checked: e.target.checked,
				},
			},
		}));
	}, []);

	const chooseInput = useCallback(
		(answer: IAnswer, isRequired: boolean, name: string) => {
			const Component = inputTypes[answer.type];

			return (
				<Component
					key={answer.id}
					id={answer.id}
					isRequired={isRequired}
					name={name}
					label={answer.message}
					params={answer.params}
					defaultValue={`${answer.id}`}
					handleChange={handleChange}
				/>
			);
		},
		[inputTypes, handleChange]
	);

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const fd = formData as any;

			const request = questions.map(
				(question) =>
					({
						...question,
						answers: question.answers.map((answer) =>
							fd[question.id][answer.id]
								? ({
										...answer,
										answer: fd[question.id][answer.id].value ?? '',
										is_select: fd[question.id][answer.id].is_checked ?? false,
								  } as IRequestAnswer)
								: ({
										...answer,
										answer: '',
										is_select: false,
								  } as IRequestAnswer)
						),
					} as IRequestQuestion)
			);

			// console.table(formData);
			// console.table(request);
			vote({ vote_id: voting.id, questions: request } as IVoteRequest);
		},
		[formData, questions, vote, voting.id]
	);

	console.log('!!!!');

	return (
		<form onSubmit={handleSubmit}>
			<div>{voting.name}</div>
			<div>
				{questions.map((q) => (
					<Question
						key={`question-${q.id}`}
						question={q}
						chooseInput={chooseInput}
					/>
				))}
			</div>
			<button className={styles.send}>Отправить</button>
		</form>
	);
};

export default Voting;
