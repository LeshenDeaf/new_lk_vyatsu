const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
	i18n: {
		locales: ['ru', 'en'],
		defaultLocale: 'ru',
	}
};

module.exports = withBundleAnalyzer(nextConfig);
