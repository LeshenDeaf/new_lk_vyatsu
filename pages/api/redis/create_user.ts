import { NextApiRequest, NextApiResponse } from "next";
import redisUserService from "../../../app/services/redis/RedisUserService";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	// return new Promise<void>(async (resolve) => {
    const id = await redisUserService.create(req.body);
    res.status(200).json({id});
    // return resolve();
			// vyatsuApi
			// 	.get('/api_mobile/v2/user/me/', {
			// 		headers: { Authorization: req.headers.authorization || '' },
			// 	})
			// 	.then((r: AxiosResponse<IUser>) => {
			// 		res.status(200).json(r.data);
			// 		return resolve();
			// 	})
			// 	.catch((e) => {
			// 		res.status(e.response?.status).json(e.response?.data);
			// 		return resolve();
			// 	});
	// });
}
