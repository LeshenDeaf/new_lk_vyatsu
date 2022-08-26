import { IDaySchedule } from '../../models/schedule';
import { basicVyatsu } from '../BasicVyatsu';

export const scheduleApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		personal: builder.query<IDaySchedule[], void>({
			query: () => 'api/edu/programs/personal',
		}),
	}),
});

export const { usePersonalQuery } = scheduleApi;
