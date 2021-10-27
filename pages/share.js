import Layout from '../components/Layout.js';

export default function Share() {
	return (
		<Layout>
			<div
				className="h-80 max-w-xs top-32 absolute left-1/2 transform -translate-x-1/2 bg-center w-2/3 bg-no-repeat bg-contain bg-opacity-50 bg-white rounded-lg"
				style={{ backgroundImage: 'url("/qr-code.png")' }}
			></div>
		</Layout>
	);
}
