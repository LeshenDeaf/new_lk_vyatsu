import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { setTitle } from '../app/store/reducers/TitleSlice';
import { wrapper } from '../app/store/store';
import en from '../lang/en/index.json';
import ru from '../lang/ru/index.json';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';

const Home: NextPage = () => {
	const { locale } = useRouter();
	const lang = locale === 'en' ? en : ru;

	return (
		<>
			<h1 className={styles.title}>{lang.main}</h1>
			<h2 className={styles.subtitle}>{lang.why}</h2>

			{lang.blocks.map((block) => (
				<div className={styles.block} key={block.title}>
					<h3 className={styles.block_title}>{block.title}</h3>
					<div className={styles.con}>
						{block.elements.map((column, cIndex) => (
							<div className={styles.list_col} key={cIndex}>
								{column.map((e, index) => (
									<div
										className={styles.list_element}
										key={`${cIndex}-${index}`}
									>
										{e.replace(/&quot;/g, '"')}
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			))}

			<h1 className={styles.blue_title}>{lang.blue_title}</h1>
			<div className={styles.con}>
				<div className={styles.list_col}>
					<div className={styles.subtitle}>{lang.admissions.title}</div>
					<div className={styles.info}>
						{lang.admissions.work_hours.mon_thur}
					</div>
					<div className={styles.info}>{lang.admissions.work_hours.friday}</div>
					<div className={styles.info}>{lang.admissions.phone_info}</div>
				</div>
				<div className={styles.list_col}>
					<div className={styles.subtitle}>{lang.courses.title}</div>
					<div className={styles.info}>{lang.courses.phone}</div>
					<div className={styles.info}>{lang.courses.address}</div>
					<div className={styles.info}>Соц.сети (подобрать)</div>
				</div>
			</div>

			<div className={styles.links}>
				<div className={styles.link_block}>
					<div className={styles.link_text}>{lang.links.dirs}</div>
					<div className={styles.image}>
						<Image src="/images/cap.png" alt="book" width="80" height="80" />
					</div>
				</div>
				<div className={styles.link_block}>
					<div className={styles.link_text}>{lang.links.prepare}</div>
					<div className={styles.image}>
						<Image src="/images/book.png" alt="book" width="80" height="80" />
					</div>
				</div>
				<div className={styles.link_block}>
					<div className={styles.link_text}>{lang.links.info}</div>
					<div className={styles.image}>
						<Image src="/images/info.png" alt="book" width="80" height="80" />
					</div>
				</div>
				<div className={styles.link_block}>
					<div className={styles.link_text}>{lang.links.calendar}</div>
					<div className={styles.image}>
						<Image
							src="/images/calendar.png"
							alt="book"
							width="80"
							height="80"
						/>
					</div>
				</div>
				<div className={styles.link_block}>
					<div className={styles.link_text}>{lang.links.price}</div>
					<div className={styles.image}>
						<Image
							src="/images/label-free.png"
							alt="book"
							width="80"
							height="80"
						/>
					</div>
				</div>
				<div className={styles.link_block}>
					<div className={styles.link_text}>{lang.links.results}</div>
					<div className={styles.image}>
						<Image
							src="/images/list-check.png"
							alt="book"
							width="80"
							height="80"
						/>
					</div>
				</div>
			</div>

			<h1 className={styles.title}>{lang.faq}</h1>
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
