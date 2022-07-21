import React, { FC } from 'react';
import Head from 'next/head';

type MetaProps = {
	title: string;
	description: string;
};

const Meta: FC<MetaProps> = ({ title, description }: MetaProps) => (
	<Head>
		<title>{title}</title>
		<meta name="description" content={description} />
		<link rel="icon" href="/favicon.ico" />
	</Head>
);

export default Meta;
