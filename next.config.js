module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: 'https://jbsdash.com/',
				permanent: true
			}
		];
	}
};
