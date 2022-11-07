type answerTypes = 'text' | 'checkbox' | 'radio' | 'textarea';

export interface IVoting {
	id: number;
	name: string;
	description: string;
	created_at: number;
	has_voted: boolean;
}

interface IQuestionInfo {
	id: number;
	title: string;
	is_required: boolean;
}

interface IAnswerInfo {
	id: number;
	message: string;
	type: answerTypes;
}

export interface IQuestion extends IQuestionInfo {
	answers: IAnswer[];
}

export interface IRequestQuestion extends IQuestionInfo {
	answers: IRequestAnswer[];
}

export interface IAnswer extends IAnswerInfo {
	params: string;
}

export interface IRequestAnswer extends IAnswerInfo {
	answer: string;
	is_select: boolean;
}

export interface IVoteRequest {
	vote_id: number;
	questions: IRequestQuestion[];
}
