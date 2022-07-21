import React, { FC } from 'react';
import styles from '../../../styles/Home.module.scss';
import Meta from '../../utils/Meta';
import { ILayoutProps } from './ILayoutProps';

const NotAuthLayout: FC<ILayoutProps> = ({ children, title, description }) => {
	return (
		<div className={styles.container}>
			<Meta title={title} description={description} />

			<main className={styles.main}>
				<>{ children }</>
			</main>

			<footer className={styles.footer}>

			</footer>
		</div>
	);
};

export default NotAuthLayout;
