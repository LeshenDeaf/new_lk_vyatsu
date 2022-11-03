// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';
import { IQuestion } from '../../../app/models/api/votings/types';
import redisQuestionsService from '../../../app/services/redis/RedisQuestionsService';

async function getQuestions(voteId: number, token: string) {
	const questions = await redisQuestionsService.find(voteId);

	if (
		questions &&
		Object.keys(questions).length !== 0 &&
		questions.length !== 0
	) {
		console.log('Questions read from redis');
		return questions;
	}
  
  console.log('Questions read from API');

	const r = await vyatsuApi.post(
		'/api_mobile/v2/votings/questions/',
		{ vote_id: voteId },
		{ headers: { Authorization: token } }
	);

	redisQuestionsService.create(r.data, voteId);

	return r.data;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IQuestion[]>
) {
	return new Promise<void>((resolve) => {
		getQuestions(req.body.vote_id, req.headers.authorization || '')
			.then((questions) => {
				res.status(200).json(questions);
				return resolve();
			})
			.catch((e) => {
				res.status(e.response?.status).json(e.response?.data);
				return resolve();
			});
	});
}
