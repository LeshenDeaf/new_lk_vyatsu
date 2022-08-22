const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	trailingSlash: true,
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	env: {
		APP_URL: process.env.APP_URL,
	},
};

module.exports = nextConfig;
