// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{has_voted: boolean}>
) {
	return new Promise<void>((resolve) => {
    vyatsuApi
      .get('/api_mobile/v2/votings/has_voted/', {
        headers: { Authorization: req.headers.authorization || '' },
      })
      .then((r: AxiosResponse<{has_voted: boolean}>) => {
        res.status(200).json(r.data);
        return resolve();
      })
      .catch((e) => {
        res.status(e.response?.status).json(e.response?.data);
        return resolve();
      });
	});
}
