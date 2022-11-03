import { IVoting } from './../../../app/models/api/votings/types';
import { NextApiRequest, NextApiResponse } from "next"
import vyatsuApi from '../../../app/services/VyatsuApi';
import { AxiosResponse } from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IVoting>
) {
  const { id } = req.query
  return new Promise<void>((resolve) => {
    const token = req.headers.authorization || '';
    
    vyatsuApi
      .post('/api_mobile/v2/votings/list/', {
        headers: { Authorization: token },
        vote_id: id
      }, {
        headers: { Authorization: token }
      })
      .then((r: AxiosResponse<IVoting>) => {
        res.status(200).json(r.data);
        return resolve();
      })
      .catch((e) => {
        res.status(e.response?.status).json(e.response?.data);
        return resolve();
      });
	});
}
