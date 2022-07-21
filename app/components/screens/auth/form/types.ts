import { SubmitHandler } from 'react-hook-form';

export interface ILoginFormFields {
	login: string;
	password: string;
}

export interface ILoginFormProps {
	onSubmit: SubmitHandler<ILoginFormFields>;
	isLoading: boolean;
}
