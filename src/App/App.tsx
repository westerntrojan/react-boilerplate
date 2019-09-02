import React from 'react';

import './style.scss';
import Header from '../components/layouts/Header';

const App = () => {
	return (
		<div id='root'>
			<Header title='Header' />

			<main className='content'>
				<h1>Content</h1>
			</main>

			<footer className='footer'>
				<h1>Footer</h1>
			</footer>
		</div>
	);
};

export default App;
