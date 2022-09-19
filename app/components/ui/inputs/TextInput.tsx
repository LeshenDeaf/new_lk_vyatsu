import React, { FC } from 'react';
import { IInputProps } from './types';

const TextInput: FC<IInputProps> = (props) => {
	return (
		<div>
			<label>{props.label}</label>
			<input
				name={`${props.name}`}
				required={props.isRequired}
				defaultValue={props.defaultValue}
				// {props.params}
			/>
		</div>
	);
};

export default TextInput;
