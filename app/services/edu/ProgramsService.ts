import { ProgramsApiResponse } from '../../models/api/edu/programsTypes';
import { basicVyatsu } from '../BasicVyatsu';

export const programsApi = basicVyatsu.injectEndpoints({
	endpoints: (builder) => ({
		programs: builder.query<ProgramsApiResponse, void>({
			query: () => 'api/edu/programs/personal',
		}),
	}),
});

export const { useProgramsQuery } = programsApi;
