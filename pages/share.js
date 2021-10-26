import Layout from '../components/Layout.js';

export default function Share() {
	return (
		<Layout>
			<div
				className="w-1/2 h-1/2 max-w-screen max-h-screen top-20 absolute bg-center w-screen bg-no-repeat bg-contain"
				style={{ backgroundImage: 'url("/qr-code.png")' }}
			></div>
		</Layout>
	);
}
