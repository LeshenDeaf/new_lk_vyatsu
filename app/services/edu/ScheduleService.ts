import { IDaySchedule } from '../../models/schedule';
import { basicVyatsu } from '../BasicVyatsu';

export const scheduleApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		personal: builder.query<IDaySchedule[], void>({
			query: () => 'api/edu/schedule/personal',
		}),
		teacher: builder.query<IDaySchedule[], number>({
			query: (tabnum) => ({
				url: 'api/edu/schedule/by_tabnum',
				method: 'POST',
				body: {tabnum}
			})
		}),
		byTabnum: builder.mutation<IDaySchedule[], number>({
			query: (tabnum) => ({
				url: 'api/edu/schedule/by_tabnum',
				method: 'POST',
				body: { tabnum },
			}),
		}),
	}),
});

export const { usePersonalQuery, useTeacherQuery, useByTabnumMutation } = scheduleApi;
