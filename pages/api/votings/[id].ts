import { Voting } from './../../../app/models/api/votings/types';
import { NextApiRequest, NextApiResponse } from "next"
import vyatsuApi from '../../../app/services/VyatsuApi';
import { AxiosResponse } from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Voting>
) {
  const { id } = req.query
  return new Promise<void>((resolve) => {
    vyatsuApi
      .post('/api_mobile/v2/votings/list/', {
        headers: { Authorization: req.headers.authorization || '' },
        vote_id: id
      }, {
        headers: { Authorization: req.headers.authorization || '' }
      })
      .then((r: AxiosResponse<Voting>) => {
        res.status(200).json(r.data);
        return resolve();
      })
      .catch((e) => {
        res.status(e.response?.status).json(e.response?.data);
        return resolve();
      });
	});
}
