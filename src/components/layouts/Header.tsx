import React from 'react';

const Header: React.FC = () => {
	return (
		<header className='header'>
			<h1>{process.env.APP_NAME}</h1>
		</header>
	);
};

export default Header;
