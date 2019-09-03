import React from 'react';

import './style.scss';
import Header from '../components/layouts/Header';

interface Props {
	children?: React.ReactNode;
}

const App = ({children}: Props) => {
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
