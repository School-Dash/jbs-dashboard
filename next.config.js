module.exports = {
	reactStrictMode: true,
	async redirects() {
		return process.env.NODE_ENV != 'development'
			? [
					{
						source: '/',
						destination: 'https://jbsdash.com/',
						permanent: true
					}
			  ]
			: [];
	}
};
