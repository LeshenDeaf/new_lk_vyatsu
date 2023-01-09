import React, { FC } from 'react';
import { IInputProps } from './types';

const RadioInput: FC<IInputProps> = (props) => {
	return (
		<div>
			<label>
				<input
					name={`${props.name}`}
					attr-id={props.id}
					required={props.isRequired}
					value={props.defaultValue}
					onChange={props.handleChange}
					type="radio"
				/>
				{props.label}
			</label>
		</div>
	);
};

export default RadioInput;
