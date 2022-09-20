import { BaseSyntheticEvent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface ILoginFormFields {
	login: string;
	password: string;
}

export interface ILoginFormProps {
	// onSubmit: SubmitHandler<ILoginFormFields>;
	isLoading: boolean;
	register: UseFormRegister<ILoginFormFields>;
	handleSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
	errors: FieldErrors<ILoginFormFields>; 
}
