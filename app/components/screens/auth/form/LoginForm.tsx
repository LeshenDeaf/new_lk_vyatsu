import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginInput from '../inputs/LoginInput';
import PasswordInput from '../inputs/PasswordInput';
import { ILoginFormFields, ILoginFormProps } from './types';

const LoginForm: FC<ILoginFormProps> = ({ onSubmit, isLoading }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFormFields>();

	return (
		<div className="m-auto w-1/2">
			<form onSubmit={handleSubmit(onSubmit)}>
				<LoginInput
					register={register}
					loginError={errors.login}
					label="Логин"
				/>
				<PasswordInput
					register={register}
					loginError={errors.password}
					label="Пароль"
				/>

				<button className={`${isLoading ? 'bg-gray-400' : 'bg-blue-600'} text-white w-[100px] block m-auto py-1 px-2 mt-2 rounded-lg `}
								{...isLoading && { 'disabled': true }}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
