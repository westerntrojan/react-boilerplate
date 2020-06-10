import React from 'react';

import './style.scss';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

const App: React.FC = () => {
	return (
		<div id='root'>
			<Header />

			<main className='content'>
				<h1>Content</h1>
			</main>

			<Footer />
		</div>
	);
};

export default App;
