import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Faq from '../app/components/ui/accordion/Faq';
import Card from '../app/components/ui/index/Card';
import { setTitle } from '../app/store/reducers/TitleSlice';
import { wrapper } from '../app/store/store';
import en from '../lang/en/index.json';
import ru from '../lang/ru/index.json';
import styles from '../styles/Home.module.scss';

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
				<Card
					text={lang.links.dirs}
					image={{ src: '/images/cap.png', alt: 'cap' }}
				/>
				<Card
					text={lang.links.prepare}
					image={{ src: '/images/book.png', alt: 'book' }}
				/>
				<Card
					text={lang.links.info}
					image={{ src: '/images/info.png', alt: 'info' }}
				/>
				<Card
					text={lang.links.calendar}
					image={{ src: '/images/calendar.png', alt: 'calendar' }}
				/>
				<Card
					text={lang.links.price}
					image={{ src: '/images/label-free.png', alt: 'price' }}
				/>
				<Card
					text={lang.links.results}
					image={{ src: '/images/list-check.png', alt: 'results' }}
				/>
			</div>

			<div className={styles.faq}>
				<h1 className={styles.title}>{lang.faq.title}</h1>
				<Faq header="Какой режим работы Приемной комиссии?">
					<div>В период приема документов:</div>
					<div>Приёмная комиссия работает с понедельника</div>{' '}
					<div>по пятницу с 9:00 до 16:00,</div>
					<div>в субботу – с 9:00 до 13:00.</div>
				</Faq>
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
