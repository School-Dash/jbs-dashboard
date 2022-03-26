module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['i.imgur.com']
	},
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
