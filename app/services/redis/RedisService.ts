import { client, connect } from '../../../lib/redis';

class RedisService {
	expiresIn;
	prefix;

	constructor(prefix: string, expiresIn: number = 3600) {
		this.prefix = prefix;
		this.expiresIn = expiresIn;
	}

	async create(data: any) {
		await connect();

		data.id = parseInt(data.id);

		await client.execute([
			'JSON.SET',
			`${this.prefix}:${data.id}`,
			'$',
			JSON.stringify(data),
		]);
		await client.execute([
			'EXPIRE',
			`${this.prefix}:${data.id}`,
			this.expiresIn,
		]);

		return data.id;
	}

	async find(elementId: number) {
		await connect();

		const res = (await client.execute([
			'JSON.GET',
			`${this.prefix}:${elementId}`,
		])) as string;

		return JSON.parse(res);
	}
}

export default RedisService;
