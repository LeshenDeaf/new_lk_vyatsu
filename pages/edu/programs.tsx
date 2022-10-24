import { NextPage } from 'next';
import Program from '../../app/components/ui/programs/Program';
import { useProgramsQuery } from '../../app/services/edu/ProgramsService';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

const Programs: NextPage = () => {
	const { data: programs, isLoading, isError, isFetching } = useProgramsQuery();

	if (isError) {
		return <div>При загрузке данных произошла ошибка</div>;
	}

	return (
		<>
			{(isLoading || isFetching) && 'Загрузка...'}
			{!isLoading && programs && <Program programs={programs} />}
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Программы'));

		return {
			props: {},
		};
	}
);

export default Programs;
