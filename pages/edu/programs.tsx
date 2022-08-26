import axios from 'axios';
import React from 'react';
import Program from '../../app/components/ui/programs/Program';
import { ProgramsApiResponse } from '../../app/models/api/edu/programsTypes';
import { wrapper } from '../../app/store/store';

const Programs = ({programs}: {programs: ProgramsApiResponse}) => {
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

		return {
			props: {
				programs: programs.data as ProgramsApiResponse,
			},
		};
	}
);

export default Programs;
