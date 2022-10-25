import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import vyatsuApi from '../../../../app/services/VyatsuApi';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	return new Promise<void>((resolve) => {
		vyatsuApi
			.post(
				'/api_mobile/v2/edu/payments/types/',
				{ payment_type: req.body.payment_type },
				{
					headers: { Authorization: req.headers.authorization || '' },
				}
			)
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
