import Layout from '../components/Layout.js';

export default function Share() {
	return (
		<Layout>
			<div
				className="max-w-screen max-h-screen	top-20 absolute bg-center p-64 w-screen bg-no-repeat bg-contain"
				style={{ backgroundImage: 'url("/qr-code.png")' }}
			></div>
		</Layout>
	);
}
