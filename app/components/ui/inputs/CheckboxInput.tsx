import React, { FC } from 'react'
import { IInputProps } from './types';

const CheckboxInput: FC<IInputProps> = (props) => {
	return (
		<label>
      <input
        name={`${props.name}`}
        required={props.isRequired}
        value={props.defaultValue}
        type="checkbox"
      />
      {props.label}
    </label>
	);
};

export default CheckboxInput;