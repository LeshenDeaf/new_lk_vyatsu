import { IVoteRequest, IVoting } from './../../../app/models/api/votings/types';
import { NextApiRequest, NextApiResponse } from "next"
import vyatsuApi from '../../../app/services/VyatsuApi';
import { AxiosResponse } from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IVoting>
) {
  const vote = req.body as IVoteRequest;
  return new Promise<void>((resolve) => {
    vyatsuApi
      .post('/api_mobile/v2/votings/vote/', vote, {
        headers: { Authorization: req.headers.authorization || '' }
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
