import { NextApiRequest, NextApiResponse } from 'next';
import vyatsuApi from '../../../app/services/VyatsuApi';
import { unsetCookieTokens } from '../../../app/helpers/api/set-cookie-tokens';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse<null>
) {
	return new Promise<void>((resolve) => {
		vyatsuApi
			.get('/api_mobile/v2/user/me/', {
				headers: { Authorization: req.headers.authorization || '' },
			})
			.then(() => {
				unsetCookieTokens(res);
				res.status(200).json(null);
			})
			.catch((e) => {
				res.status(e.response.status).json(e.response.body);
			})
			.finally(() => resolve());
	});
}
