export const enum ProgramTypes {
	universal = 'universal',
	common = 'common',
	prof = 'prof',
	other = 'other',
}
export interface IProgramDiscipline {
	zet: number;
	cp: number;
	color: ProgramTypes;
	subject_id: number;
	op_id: number;
	name: string;
}
export interface IProgramCourse {
	course: number;
	disciplines: IProgramDiscipline[];
}
export type ProgramTypesDescriptions = {
	[key in ProgramTypes]: string;
};
export interface IProgramColors {
	used: string[];
	descriptions: ProgramTypesDescriptions;
}
export interface ProgramsApiResponse {
	program: IProgramCourse[];
	colors: IProgramColors;
	courses: number;
}
