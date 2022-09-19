// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';
import { Voting } from '../../../app/models/api/votings/types';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Voting[]>
) {
	return new Promise<void>((resolve) => {
    vyatsuApi
      .get('/api_mobile/v2/votings/list/', {
        headers: { Authorization: req.headers.authorization || '' },
      })
      .then((r: AxiosResponse<Voting[]>) => {
        res.status(200).json(r.data);
        return resolve();
      })
      .catch((e) => {
        res.status(e.response?.status).json(e.response?.data);
        return resolve();
      });
	});
}
