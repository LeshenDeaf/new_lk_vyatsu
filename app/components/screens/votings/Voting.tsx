import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { IAnswer, IQuestion, IVoting } from '../../../models/api/votings/types';
// import dynamic from 'next/dynamic';
import styles from '../../../../styles/Votings.module.scss';

import CheckboxInput from '../../ui/inputs/CheckboxInput';
import RadioInput from '../../ui/inputs/RadioInput';
import TextareaInput from '../../ui/inputs/TextareaInput';
import TextInput from '../../ui/inputs/TextInput';
import Question from './Question';

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
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value.trim(),
		}));
	}, []);

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

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			console.table(formData);
		},
		[formData]
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
