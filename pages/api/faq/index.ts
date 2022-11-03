// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse } from 'axios';
import vyatsuApi from '../../../app/services/VyatsuApi';
import { IFaq } from '../../../app/models/api/IFaq';
import redisFaqService from '../../../app/services/redis/RedisFaqService';

const getFaqInfo = async (url: string, token: string) => {
	const faq = await redisFaqService.find(url);

	if (faq && Object.keys(faq).length !== 0 && faq.length !== 0) {
		console.log('Faq read from redis');
		return faq;
	}
	console.log('Faq read from API');

	const r = (await vyatsuApi.post(
		'/api_mobile/v2/faq/get/',
		{ url },
		{ headers: { Authorization: token || '' } }
	)) as AxiosResponse<IFaq[]>;
	
	redisFaqService.create(r.data);

	return r.data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IFaq[]>
) {
	return new Promise<void>((resolve) => {
		getFaqInfo(req.body.url, req.headers.authorization || '')
			.then((faq) => {
				res.status(200).json(faq);
				return resolve();
			})
			.catch((error) => {
				res.status(error.response?.status || 400).json(error.response?.data || error.message);
				return resolve();
			});
	});
}
