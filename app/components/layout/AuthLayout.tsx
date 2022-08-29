import React, { FC, useEffect, useState } from 'react';
import styles from '../../../styles/Home.module.scss';
import Meta from '../../utils/Meta';
import SideBar from '../screens/menus/sidebar/SideBar';
import Header from '../screens/menus/header/Header';
import { ILayoutProps } from './ILayoutProps';
import { Spring, Transition, animated } from 'react-spring';
import { isMobile } from 'react-device-detect';

const AuthLayout: FC<ILayoutProps> = ({ children, title, description }) => {
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

	useEffect(() => setIsSidebarVisible(!isMobile), []);

	return (
		<div className={styles.container}>
			<Meta title={title} description={description} />

			<Transition
				items={isSidebarVisible}
				from={{ transform: 'translateY(-100%)' }}
				enter={{ transform: 'translateY(0%)' }}
				leave={{ transform: 'translateY(-100%)' }}
				reverse={isSidebarVisible}
			>
				{(styles, item) =>
					item && (
						<SideBar
							styles={styles}
							closeSidebar={() => setIsSidebarVisible(false)}
						/>
					)
				}
			</Transition>

			<Header openSidebar={() => setIsSidebarVisible(true)} />

			{/* <main className="body-page absolute text-justify top-48 sm:top-36 sm:left-72 p-4 sm:p-10"> */}
				<Spring
					from={{ opacity: 0, translateY: '100%' }}
					to={{ opacity: 1, translateY: '0%' }}
				>
					{(styles) => (
						<animated.main
							className="body-page absolute text-justify top-48 sm:top-36 sm:left-72 p-4 sm:p-10 z-[-1]"
							style={styles}
						>
							{children}
						</animated.main>
					)}
				</Spring>
			{/* </main> */}

			<footer className={styles.footer}></footer>
		</div>
	);
};

export default AuthLayout;
