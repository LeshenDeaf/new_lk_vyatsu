import axios from 'axios';

const vyatsuApi = axios.create({
	withCredentials: true,
	baseURL: process.env.API_URL,
});

export default vyatsuApi;
