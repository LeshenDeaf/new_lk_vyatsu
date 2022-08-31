import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';
import {
	AuthAPIResponse,
	AuthResponse,
	RefreshRequest,
} from '../../../app/models/api/auth/types';
import { setCookieTokens } from '../../../app/helpers/api/set-cookie-tokens';
import { parseCookies } from 'nookies';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse<AuthResponse>
) {
	return new Promise<void>((resolve) => {
		if (req.method === 'POST' || req.method === 'GET') {
			const reqData = {
				refresh_token: req.body.refresh_token || parseCookies({ req }).vyatsu_r_token || '',
			} as RefreshRequest;

			vyatsuApi
				.post('/api_mobile/v2/auth/refresh/', reqData)
				.then((result: AxiosResponse<AuthAPIResponse>) => {
					setCookieTokens(
						res,
						result.data.access_token,
						result.data.refresh_token
					);

					res.status(200).json({
						token: result.data.access_token,
						isAuth: true,
					});
					return resolve();
				})
				.catch((error) => {
					res.status(error.response.status).json(error.response.data);
					return resolve();
				});
		}
	});
}
