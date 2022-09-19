import type { NextPage } from 'next';
import React from 'react';
import { useAppSelector } from '../app/hooks/redux';
import { selectUser } from '../app/store/reducers/UserSlice';
import { Spring, animated } from 'react-spring';
import Link from 'next/link';
import { wrapper } from '../app/store/store';
import { setTitle } from '../app/store/reducers/TitleSlice';

const Home: NextPage = () => {
	const user = useAppSelector(selectUser);

	return (
		<>
			<div>ASD ASD</div>
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
				{(styles) => (
					<animated.div style={styles}>{user.data?.login}</animated.div>
				)}
			</Spring>
			<Link href="/edu/schedule">
				<a draggable="false" className="">
					TEST
				</a>
			</Link>
			<div className="top-1/2 translate-y-[-50%] left-1/2 translate-x-[50%] text-8xl text-[#141414] opacity-10">
				Информация
			</div>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Личный кабинет'));

		return {
			props: {},
		};
	}
);

export default Home;
