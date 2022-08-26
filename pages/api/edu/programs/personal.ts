import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import vyatsuApi from '../../../../app/services/VyatsuApi';

enum ProgramTypes {
	universal,
	common,
	prof,
	other,
}
export interface ProgramDiscipline {
	zet: number;
	cp: number;
	color: ProgramTypes;
	subjectId: number;
	opId: number;
	name: string;
}
export interface ProgramCourse {
	course: number;
	disciplines: ProgramDiscipline[];
}
type ProgramTypesDescriptions = {
	[key in ProgramTypes]: string;
};
export interface ProgramsApiResponse {
	program: ProgramCourse[];
	colors: {
		used: string[];
		descriptions: ProgramTypesDescriptions;
	};
	courses: number;
}

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	return new Promise<void>((resolve) => {
		if (req.method === 'GET') {
			vyatsuApi
				.get('/api_mobile/v2/edu/programs/by_user/', {
					headers: { Authorization: req.headers.authorization || '' },
				})
				.then((r: AxiosResponse<any>) => {
					res.status(200).json(r.data);
					return resolve();
				})
				.catch((e) => {
					res.status(e.response.status).json(e.response.data);
					return resolve();
				});
		}
	});
}
