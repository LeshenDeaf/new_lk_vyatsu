import { Entity, Schema } from 'redis-om';
import { client, connect } from './../../../lib/redis';
import { IFaq } from './../../models/api/IFaq';

class Faq extends Entity {}

let schema = new Schema(Faq, {
	id: { type: 'number' },
	name: { type: 'string' },
	answer: { type: 'string[]' },
	url: { type: 'string[]' },
});

class RedisFaqService {
	prefix = 'Faq';
	expiresIn = 28800;

	async create(faqs: IFaq[]) {
		await connect();

		const repository = client.fetchRepository<Faq>(schema);
		faqs.map(async (faq) => {
			faq.url = faq.url.map((u) => encodeURIComponent(u));
			await repository.save(repository.createEntity(faq));
		});
	}

	async find(url: string) {
		await connect();

		const repository = client.fetchRepository<Faq>(schema);
		await repository.createIndex();

		return await repository
			.search()
			.where('url')
			.contains(encodeURIComponent(url))
			.returnAll();
	}
}

const redisFaqService = new RedisFaqService();

export default redisFaqService;
