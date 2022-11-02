import { ILoggedAs } from './../../../app/models/IUser';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';
import { IUser } from '../../../app/models/IUser';
import jwtDecode from 'jwt-decode';
import { IToken } from '../../../app/models/IToken';
import redisUserService from '../../../app/services/redis/RedisUserService';

const getUserInfo = async (token: string) => {
	const decoded = jwtDecode(token) as IToken;
	const tokenValid = decoded.exp > Date.now() / 1000;

	if (!tokenValid) {
		return null;
	}

	const user = await redisUserService.find(decoded.logged_as);

	if (user) {
		return user;
	}
	const r = await vyatsuApi.get('/api_mobile/v2/user/logged_as/', {
		headers: { Authorization: token },
	});

	redisUserService.create(r.data);

	return r.data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	vyatsuApi
		.get('/api_mobile/v2/user/me/', {
			headers: { Authorization: req.headers.authorization || '' },
		})
		.then(async (r: AxiosResponse<IUser>) => {
			res
				.status(200)
				.json({
					...r.data,
					logged_as: await getUserInfo(req.headers.authorization || ''),
				});
		})
		.catch((e) => {
			res.status(e.response?.status).json(e.response?.data);
		});
}
