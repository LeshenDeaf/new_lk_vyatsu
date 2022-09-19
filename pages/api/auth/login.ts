import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';
import {
	AuthAPIResponse,
	AuthResponse,
	LoginRequest,
} from '../../../app/models/api/auth/types';
import { setCookieTokens } from '../../../app/helpers/api/set-cookie-tokens';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse<AuthResponse>
) {
	return new Promise<void>((resolve) => {
		const reqData = {
			login: req.body.login,
			password: req.body.password,
		} as LoginRequest;

		vyatsuApi
			.post('/api_mobile/v2/auth/login/', reqData)
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
	});
}
