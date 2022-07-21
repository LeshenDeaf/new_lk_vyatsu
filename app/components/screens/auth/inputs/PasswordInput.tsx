import React, { FC } from 'react';
import FancyInput from '../../../ui/inputs/FancyInput';
import { IInputProps } from './types';
import { ILoginFormFields } from '../form/types';

const PasswordInput: FC<IInputProps<ILoginFormFields>> = (props) => {
	const options = props.validationOptions || {
		required: 'Пароль не заполнен',
		minLength: 6,
		maxLength: 64,
	};

	const registered = props.register('password', options);

	return (
		<FancyInput
			label={props.label}
			errors={[props.loginError]}
			register={registered}
			options={options}
			ref={registered.ref}
			attrs={{ type: 'password' }}
		/>
	);
};

export default PasswordInput;
