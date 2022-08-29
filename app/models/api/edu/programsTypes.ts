export const enum ProgramTypes {
	universal,
	common,
	prof,
	other,
}
export interface ProgramDiscipline {
	zet: number;
	cp: number;
	color: ProgramTypes;
	subject_id: number;
	op_id: number;
	name: string;
}
export interface ProgramCourse {
	course: number;
	disciplines: ProgramDiscipline[];
}
export type ProgramTypesDescriptions = {
	[key in ProgramTypes]: string;
};
export interface ProgramColors {
	used: string[];
	descriptions: ProgramTypesDescriptions;
}
export interface ProgramsApiResponse {
	program: ProgramCourse[];
	colors: ProgramColors;
	courses: number;
}
