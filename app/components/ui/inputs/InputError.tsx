import React, { FC } from 'react';

interface IInputErrorProps {
	condition: boolean;
	text?: string;
}

const InputError: FC<IInputErrorProps> = ({ condition, text }) => {
	return <> {condition && <span className='text-red-600'>{text}</span>} </>;
};

export default InputError;
