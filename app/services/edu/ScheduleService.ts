import { ITechInfo } from './../../models/schedule';
import { IDaySchedule } from '../../models/schedule';
import { basicVyatsu } from '../BasicVyatsu';

export const scheduleApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		personal: builder.query<IDaySchedule[], void>({
			query: () => 'api/edu/schedule/personal',
			providesTags: ['Schedule'],
		}),
		teacher: builder.query<IDaySchedule[], number>({
			query: (tabnum) => ({
				url: 'api/edu/schedule/by_tabnum',
				method: 'POST',
				body: { tabnum },
				keepUnusedDataFor: 180,
			}),
			providesTags: ['Schedule'],
		}),
		byTabnum: builder.mutation<IDaySchedule[], number>({
			query: (tabnum) => ({
				url: 'api/edu/schedule/by_tabnum',
				method: 'POST',
				body: { tabnum },
				keepUnusedDataFor: 180,
			}),
		}),
		studList: builder.query<any, ITechInfo>({
			query: (techInfo) => ({
				url: 'api/edu/schedule/stud_list',
				method: 'POST',
				body: { techInfo },
			}),
			providesTags: ['Schedule'],
		}),
	}),
});

export const {
	usePersonalQuery,
	useTeacherQuery,
	useByTabnumMutation,
	useLazyStudListQuery,
} = scheduleApi;
