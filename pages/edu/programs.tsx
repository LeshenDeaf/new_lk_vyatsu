import axios from 'axios';
import { NextPage } from 'next';
import React from 'react';
import Program from '../../app/components/ui/programs/Program';
import { ProgramsApiResponse } from '../../app/models/api/edu/programsTypes';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

const Programs: NextPage<{ programs: ProgramsApiResponse }> = ({
	programs,
}) => {
	return <Program programs={programs} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		const { auth } = store.getState();
		const programs = await axios.get(
			process.env.APP_URL + '/api/edu/programs/personal',
			{
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			}
		);

		store.dispatch(setTitle('Программы'));

		return {
			props: {
				programs: programs.data as ProgramsApiResponse,
			},
		};
	}
);

export default Programs;
