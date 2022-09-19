import { NextPage } from 'next';
import Program from '../../app/components/ui/programs/Program';
import { useProgramsQuery } from '../../app/services/edu/ProgramsService';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

const Programs: NextPage = () => {
	const { data: programs, isLoading, isError } = useProgramsQuery();

	if (isError) {
		return <div>При загрузке данных произошла ошибка</div>;
	}

	return (
		<>
			{isLoading && 'Загрузка...'}
			{!isLoading && programs && <Program programs={programs} />}
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		// const { auth } = store.getState();
		// const programs = await axios.get(
		// 	process.env.APP_URL + '/api/edu/programs/personal',
		// 	{
		// 		headers: {
		// 			authorization: `Bearer ${auth.token}`,
		// 		},
		// 	}
		// );

		store.dispatch(setTitle('Программы'));

		return {
			props: {
				// programs: programs.data as ProgramsApiResponse,
			},
		};
	}
);

export default Programs;
