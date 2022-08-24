import React, { FC, useState, useMemo, useCallback } from 'react';
import FancyInput from '../../../ui/inputs/FancyInput';
import { IInputProps } from './types';
import { ILoginFormFields } from '../form/types';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput: FC<IInputProps<ILoginFormFields>> = (props) => {
	const options = props.validationOptions || {
		required: 'Пароль не заполнен',
		minLength: 6,
		maxLength: 64,
	};

	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	const togglePasswordVisiblity = useCallback(() => {
		setPasswordVisible(prev => !prev);
	}, [])

	const registered = useMemo(() => props.register('password', options), [options]);

	return (<>
		<FancyInput
			label={props.label}
			errors={[props.loginError]}
			register={registered}
			options={options}
			ref={registered.ref}
			attrs={{ type: passwordVisible ? 'text' : 'password' }}
		/>
		<i onClick={togglePasswordVisiblity}>{passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</i>{" "}	
	</>
	);
};

export default PasswordInput;
