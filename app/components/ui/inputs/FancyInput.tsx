import {
	forwardRef, InputHTMLAttributes,
	useCallback
} from 'react';
import {
	FieldError,
	RegisterOptions,
	UseFormRegisterReturn
} from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';
import InputError from './InputError';

interface IFancyInputProps {
	label: string;
	errors: [FieldError | undefined];
	register: UseFormRegisterReturn;
	options: RegisterOptions;
	attrs: InputHTMLAttributes<HTMLInputElement>;
	[x: string]: any;
}

const FancyInput = forwardRef<HTMLInputElement, IFancyInputProps>(
	function FancyInput(props, ref) {
		const getErrorText = useCallback((error?: FieldError): string | undefined => {
			if (error?.type) {
				switch (error.type) {
					case 'minLength':
						return `Длина значения должна быть не меньше ${props.options.minLength}`;
					case 'maxLength':
						return `Длина значения должна быть больше ${props.options.maxLength}`;
					case 'min':
						return `Значение должно быть не меньше ${props.options.min}`;
					case 'max':
						return `Значение должно быть не меньше ${props.options.max}`;
					default:
						break;
				}
			}

			return error?.message;
		}, [props.options.max, props.options.maxLength, props.options.min, props.options.minLength]);

		return (
			<label className="block mt-2 mx-auto md:w-1/2 w-full">
				{props.label}
				<input
					className="rounded-lg border px-2 py-1 w-full focus:outline-none outline-none focus:border-vyatsu-blue transition-all bg-white autofill:bg-white "
					{...props.register}
					{...props.attrs}
					ref={ref}
				/>
				{props.errors.map((error) => (
					<InputError
						key={uuid4()}
						condition={!!error}
						text={getErrorText(error)}
					/>
				))}
			</label>
		);
	}
);

export default FancyInput;
