import { NextApiRequest, NextApiResponse } from "next";
import redisUserService from "../../../app/services/redis/RedisUserService";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
    const user = await redisUserService.get(req.query.id as string);
    res.status(200).json({user});
}
