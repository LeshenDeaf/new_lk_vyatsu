import type { NextPage } from 'next';
import { useAppSelector } from '../app/hooks/redux';
import { selectUser } from '../app/store/reducers/UserSlice';

const Home: NextPage = () => {
	const { data: user } = useAppSelector(selectUser);

	return (
		<>
			<div>{user && `${user.fio.full}`}</div>
			<div>{JSON.stringify(user) || '!!!'}</div>
		</>
	);
};

export default Home;
