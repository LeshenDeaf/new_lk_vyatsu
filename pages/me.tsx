import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import Meta from '../app/utils/Meta';
import { useAppSelector } from '../app/hooks/redux';
import { selectUser } from '../app/store/reducers/UserSlice';

const Home: NextPage = () => {
	const { data: user } = useAppSelector(selectUser);

	return (
		<div className={styles.container}>
			<Meta title="Главная страница" description="Главная страница" />

			<main className={styles.main}>
				<div>
					<div>{ user && `${user.fio.full}` }</div>
					<div>{ JSON.stringify(user) || '!!!'}</div>
				</div>
			</main>

			<footer className={styles.footer}>

			</footer>
		</div>
	)
}

export default Home
