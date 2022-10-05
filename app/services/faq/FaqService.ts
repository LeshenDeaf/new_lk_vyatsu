import { IFaq } from '../../models/api/IFaq';
import { basicVyatsu } from '../BasicVyatsu';

export const faqApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		faq: builder.query<IFaq[], void>({
			query: () => 'api/faq/',
		}),
	}),
});

export const { useFaqQuery } = faqApi;
