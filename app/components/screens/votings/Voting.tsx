import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { IAnswer, IQuestion, IVoting } from '../../../models/api/votings/types';
// import dynamic from 'next/dynamic';
import styles from '../../../../styles/Votings.module.scss';

import RadioInput from '../../ui/inputs/RadioInput';
import CheckboxInput from '../../ui/inputs/CheckboxInput';
import TextareaInput from '../../ui/inputs/TextareaInput';
import TextInput from '../../ui/inputs/TextInput';

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

	const [formData, setFormData] = useState({});

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	}, [formData]);

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
					handleChange={handleChange}
				/>
			);
		},
		[inputTypes, handleChange]
	);

	const makeQuestion = useCallback(
		(question: IQuestion) => {
			return (
				<div key={question.id}>
					<div>
						{question.title.replaceAll('&nbsp;', ' ')}
						{question.is_required ? ' *' : ''}
					</div>
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

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.table(formData);
	}, [formData]);

	return (
		<form onSubmit={handleSubmit}>
			<div>{voting.name}</div>
			<div>{questions.map(makeQuestion)}</div>
			<button className={styles.send}>Отправить</button>
		</form>
	);
};

export default Voting;
