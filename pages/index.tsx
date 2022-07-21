import type { NextPage } from 'next';
import React from 'react';
import { useAppSelector } from '../app/hooks/redux';
import { selectUser } from '../app/store/reducers/UserSlice';
import { Spring, animated } from 'react-spring';

const Home: NextPage = () => {
	const user = useAppSelector(selectUser);

	return (
		<>
			<div>ASD ASD</div>
			<Spring from={{opacity: 0}} to={{opacity: 1}}>
				{styles => (<animated.div style={styles}>{user.data?.login}</animated.div>)}
			</Spring>
		</>
	);
};

export default Home;
