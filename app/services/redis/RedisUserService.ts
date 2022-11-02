import { Entity, Schema, Repository } from 'redis-om';
import { connect, client } from '../../../lib/redis';

class User extends Entity {}

class RedisUserService {
	schema: Schema<User>;
	repository: Repository<User>;
  expiresIn = 3600;

	constructor() {
		this.schema = new Schema(
			User,
			{
				id: { type: 'number' },
				name: { type: 'string' },
			},
			{
				dataStructure: 'JSON',
			}
		);

		this.repository = client.fetchRepository<User>(this.schema);
	}

	async create(data: any) {
		await connect();

		data.id = parseInt(data.id);

		const user = this.repository.createEntity(data);
		const id = await this.repository.save(user);
		await client.execute(['EXPIRE', `User:${id}`, this.expiresIn]);

		return id;
	}

	async get(id: string) {
		await connect();

		return await this.repository.fetch(id);
	}

	async find(userId: number) {
		await connect();

		await this.repository.createIndex();
		return await this.repository.search().where('id').equalTo(userId).first();
	}
}

const redisUserService = new RedisUserService();

export default redisUserService;
