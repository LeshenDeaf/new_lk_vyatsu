export interface IVoting {
	id: number;
	name: string;
	description: string;
	created_at: number;
	has_voted: boolean;
}

export interface IQuestion {
	id: number;
	title: string;
	is_required: boolean;
	answers: IAnswer[];
}

type answerTypes = "text" | "checkbox" | "radio" | "textarea";

export interface IAnswer {
	id: number;
	message: string;
	type: answerTypes;
	params: string;
}

export interface IRequestAnswer {
  id: number;
  message: string;
  type: answerTypes;
}

export interface IRequestQuestion {
  id: number;
  title: string;
  is_required: boolean;
  answers: IRequestAnswer[]
}

export interface IVoteRequest {
  id: number;
  questions: IRequestQuestion[]
}
