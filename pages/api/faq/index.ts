// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';
import { IFaq } from '../../../app/models/api/IFaq';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IFaq[]>
) {
	return new Promise<void>((resolve) => {
		if (req.method === 'GET') {
			vyatsuApi
				.get('/api_mobile/v2/faq/get/', {
					headers: { Authorization: req.headers.authorization || '' },
				})
				.then((r: AxiosResponse<IFaq[]>) => {
					res.status(200).json(r.data);
					return resolve();
				})
				.catch((e) => {
					res.status(e.response?.status).json(e.response?.data);
					return resolve();
				});
		}
	});
}
