import { client, connect } from '../../../lib/redis';

class RedisService {
	expiresIn;
	prefix;

	constructor(prefix: string, expiresIn: number = 3600) {
		this.prefix = prefix;
		this.expiresIn = expiresIn;
	}

	async create(data: any, id: number | string = '') {
		try{
			await connect();
		} catch (e) {
			return null;
		}

		if (!id){
			data.id = parseInt(data.id);
			id = data.id;
		}
		
		await client.execute([
			'JSON.SET',
			`${this.prefix}:${id}`,
			'$',
			JSON.stringify(data),
		]);
		await client.execute([
			'EXPIRE',
			`${this.prefix}:${id}`,
			this.expiresIn,
		]);

		return data.id;
	}

	async find(elementId: number | string) {
		try{
			await connect();
		} catch (e) {
			return null;
		}
		const res = (await client.execute([
			'JSON.GET',
			`${this.prefix}:${elementId}`,
		])) as string;

		return JSON.parse(res || '{}');
	}
}

export default RedisService;
