import React, { FC } from 'react';
import styles from '../../../styles/Home.module.scss';
import Meta from '../../utils/Meta';
import SideBar from '../screens/menus/SideBar';
import Header from '../screens/menus/Header';

interface Props {
	children: JSX.Element
}

const AppLayout: FC<Props> = ({ children }) => {

	return (
	<div className={styles.container}>
		<Meta title="Главная страница" description="Главная страница" />
		<SideBar />
		<Header />

		<main className={styles.main}>
			<>{ children }</>
		</main>

		<footer className={styles.footer}>

		</footer>
	</div>
	);
};

export default AppLayout;
