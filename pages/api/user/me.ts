// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { serialize } from 'cookie';
import jwt_decode from 'jwt-decode';

type LoginResponse = {
	access_token: string;
	expires_in: number;
	refresh_token: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method === 'GET') {
		axios
			.get('https://new.vyatsu.ru/api_mobile/v1/me/', req.body)
			.then((r: AxiosResponse<LoginResponse>) => {
				const data = r.data;
				const serialized = serialize('refresh_token', data.refresh_token);
				const user = jwt_decode(r.data.access_token);

				res.setHeader('Set-Cookie', serialized);

				res.status(200).json({ user, token: r.data.access_token	});
			})
			.catch((e) => res.status(500).json(e));
	}
	// res.status(200).json({ name: 'John Doe' });
}
