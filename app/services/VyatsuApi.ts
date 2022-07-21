import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';

const vyatsuApi = axios.create({
	withCredentials: true,
	baseURL: process.env.API_URL,
});

export default vyatsuApi;
