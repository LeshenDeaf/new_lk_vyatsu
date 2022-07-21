import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface IInputProps<T> {
	register: UseFormRegister<T>;
	validationOptions?: RegisterOptions;
	loginError?: FieldError;
	label?: string;
}
