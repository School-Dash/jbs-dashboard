module.exports = {
	reactStrictMode: true,
	async redirects() {
		return process.env.NODE_ENV != 'development'
			? [
					{
						source: '/:page*',
						destination: 'https://jbsdash.com/:page*',
						permanent: true
					}
			  ]
			: [];
	}
};
