import { Router } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styles from '../../../../styles/PageLoader.module.scss';

interface PageLoaderProps {
	children: JSX.Element;
}

const PageLoader: FC<PageLoaderProps> = ({ children }) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		Router.events.on('routeChangeStart', () => setLoading(true));
		Router.events.on('routeChangeComplete', () => setLoading(false));
		Router.events.on('routeChangeError', () => setLoading(false));
		return () => {
			Router.events.off('routeChangeStart', () => setLoading(true));
			Router.events.off('routeChangeComplete', () => setLoading(false));
			Router.events.off('routeChangeError', () => setLoading(false));
		};
	}, []);

	return (
		<>
			{loading ? (
				<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 bg-opacity-10 opacity-100 flex flex-col items-center justify-center">
					<div
						className={
							styles.loader +
							' ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mb-4'
						}
					></div>
					<h2 className="text-center text-black text-xl font-semibold">
						Loading...
					</h2>
					<p className="w-1/3 text-center text-black">
						This may take a few seconds, please don{"'"}t close this page.
					</p>
				</div>
			) : (
				children
			)}
		</>
	);
};

export default PageLoader;
