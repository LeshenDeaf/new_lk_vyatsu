import { basicVyatsu } from '../BasicVyatsu';
import { IUser } from '../../models/IUser';

export const userApi = basicVyatsu.injectEndpoints({
	endpoints: builder => ({
		me: builder.query<IUser, void>({
			query: () => 'api/user/me',
		})
	})
});

export const { useMeQuery } = userApi

