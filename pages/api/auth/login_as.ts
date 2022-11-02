import { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookieTokens } from '../../../app/helpers/api/set-cookie-tokens';
import {
	AuthAPIResponse,
	AuthResponse,
} from '../../../app/models/api/auth/types';
import vyatsuApi from '../../../app/services/VyatsuApi';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse<AuthResponse>
) {
	return new Promise<void>((resolve) => {
		const { login } = req.body;

		vyatsuApi
			.post(
				'/api_mobile/v2/auth/login_as/',
				{ login },
				{
					headers: { Authorization: req.headers.authorization || '' },
				}
			)
			.then((result: AxiosResponse<AuthAPIResponse>) => {
				if (!result.data.access_token || !result.data.refresh_token) {
					res.status(404).json({
						token: '',
						isAuth: false,
					});

					return resolve();
				}

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
