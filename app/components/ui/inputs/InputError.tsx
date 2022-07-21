import React, { FC } from 'react';

interface IInputErrorsProps {
	condition: boolean;
	text: string | undefined;
}

const InputErrors: FC<IInputErrorsProps> = ({ condition, text }) => {
	return <> {condition && <span className='text-red-600'>{text}</span>} </>;
};

export default InputErrors;
