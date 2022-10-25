import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ProgramsApiResponse } from '../../../../app/models/api/edu/programsTypes';
import vyatsuApi from '../../../../app/services/VyatsuApi';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse<ProgramsApiResponse>
) {
	return new Promise<void>((resolve) => {
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
	});
}
