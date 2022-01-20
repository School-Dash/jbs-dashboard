module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: 'https://jbsdash.netlify.app/',
				destination: 'https://jbsdash.com',
				permanent: true
			}
		];
	}
};
