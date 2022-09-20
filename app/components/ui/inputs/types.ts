import { ChangeEvent } from "react";

export interface IInputProps {
	isRequired: boolean;
	label: string;
	name: string | number;
	params: string;
	defaultValue?: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}
