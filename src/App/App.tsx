import React from 'react';

import './style.scss';
import Header from '../layouts/Header';

function App() {
	return (
		<div id='root'>
			<Header title='Header' />

			<main className='content'>
				<h1>Content</h1>
			</main>

			<footer className='footer'>
				<h1>footer</h1>
			</footer>
		</div>
	);
}

export default App;
