import axios from 'axios';
import { NextPage } from 'next';
import { useCallback, useMemo } from 'react';
import CheckboxInput from '../../app/components/ui/inputs/CheckboxInput';
import RadioInput from '../../app/components/ui/inputs/RadioInput';
import TextareaInput from '../../app/components/ui/inputs/TextareaInput';
import TextInput from '../../app/components/ui/inputs/TextInput';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';
import {
	IAnswer,
	IQuestion,
	IVoting,
} from './../../app/models/api/votings/types';

interface Props {
	voting: IVoting;
	questions: IQuestion[];
}

const VotingPage: NextPage<Props> = ({ voting, questions }) => {
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
		(answer: IAnswer, isRequired: boolean) => {
			const Component = inputTypes[answer.type];

			return (
				<Component
					isRequired={isRequired}
					name={answer.id}
					label={answer.message}
					params={answer.params}
				/>
			);
		},
		[inputTypes]
	);
	const makeQuestion = useCallback(
		(question: IQuestion) => {
			return (
				<div>
					<div>{question.title.replaceAll('&nbsp;', ' ')}</div>
					<div>
						{question.answers.map((a) => chooseInput(a, question.is_required))}
					</div>
				</div>
			);
		},
		[chooseInput]
	);

	return (
		<>
			{questions.map(makeQuestion)}

			<pre>{JSON.stringify(voting, null, 2)}</pre>
			<pre>{JSON.stringify(questions, null, 2)}</pre>
		</>
	);
};

export default VotingPage;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query }) => {
			const { auth } = store.getState();

			const [voting, questions] = await Promise.all([
				axios.get(process.env.APP_URL + '/api/votings/' + query.id, {
					headers: {
						authorization: `Bearer ${auth.token}`,
					},
				}),
				axios.post(
					process.env.APP_URL + '/api/votings/questions/',
					{ vote_id: query.id },
					{
						headers: {
							authorization: `Bearer ${auth.token}`,
						},
					}
				),
			]);

			store.dispatch(setTitle(voting.data.name));

			return {
				props: {
					voting: voting.data as IVoting,
					questions: questions.data as IQuestion[],
				},
			};
		}
);
