import React, { FC } from 'react'
import { IInputProps } from './types'

const RadioInput: FC<IInputProps> = (props) => {
  return (
    <div>
    <label>
      <input
        name={`${props.name}`}
        required={props.isRequired}
        value={props.defaultValue}
        type="radio"
      />
      {props.label}
    </label>

    
  </div>
  )
}

export default RadioInput;
