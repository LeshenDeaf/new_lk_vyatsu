import React, { FC } from 'react';
import Head from 'next/head';
import { useAppSelector } from '../hooks/redux';
import { selectTitle } from '../store/reducers/TitleSlice';

type MetaProps = {
	description: string;
};

const Meta: FC<MetaProps> = ({ description }: MetaProps) => {
	const { title } = useAppSelector(selectTitle);
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

export default Meta;
