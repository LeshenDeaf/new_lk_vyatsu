import React, { FC } from 'react'
import { IInputProps } from './types';

const CheckboxInput: FC<IInputProps> = (props) => {
	return (
		<label>
      <input
        name={`${props.name}`}
        attr-id={props.id}
        required={props.isRequired}
        value={props.defaultValue}
        onChange={props.handleChange}
        type="checkbox"
      />
      {props.label}
    </label>
	);
};

export default CheckboxInput;
