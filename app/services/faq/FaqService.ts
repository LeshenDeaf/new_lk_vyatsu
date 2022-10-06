import { IFaq } from '../../models/api/IFaq';
import { basicVyatsu } from '../BasicVyatsu';

export const faqApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		faq: builder.query<IFaq[], string>({
			query: (url) => ({ 
				url: 'api/faq/', 
				method: 'POST',
				body: {url} 
			}),
		}),
	}),
});

export const { useFaqQuery } = faqApi;
