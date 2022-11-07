import { ChangeEvent } from "react";

export interface IInputProps {
	id: number;
	isRequired: boolean;
	label: string;
	name: string | number;
	params: string;
	defaultValue?: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}
