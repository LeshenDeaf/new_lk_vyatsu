import React, { FC } from 'react';
import { selectAuth } from '../../../store/reducers/AuthSlice';
import { useAppSelector } from '../../../hooks/redux';
import { selectUser } from '../../../store/reducers/UserSlice';


const Fio: FC = () => {
	// const { token } = useAppSelector(selectAuth);
	// const { data: user } = useAppSelector(selectUser);

	return (
		<div>
			{/*{token}*/}
			{/* { user && user.fio.full } */}
			test
		</div>
	);
};


export default Fio;
