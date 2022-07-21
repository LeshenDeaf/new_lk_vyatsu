import React, { FC, memo, useMemo } from 'react';
import FancyInput from '../../../ui/inputs/FancyInput';
import { IInputProps } from './types';
import { ILoginFormFields } from '../form/types';

const LoginInput: FC<IInputProps<ILoginFormFields>> = (props) => {
	const options = useMemo(
		() =>
			props.validationOptions || {
				required: 'Логин не заполнен',
				minLength: 6,
				maxLength: 64,
			},
		[props.validationOptions]
	);

	const registered = props.register('login', options);

	return (
		<FancyInput
			label={props.label}
			errors={[props.loginError]}
			register={registered}
			options={options}
			ref={registered.ref}
		/>
	);
};

export default LoginInput;
