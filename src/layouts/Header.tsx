import React from 'react';

type HeaderProps = {
	title: string;
};

function Header(props: HeaderProps) {
	return (
		<header className='header'>
			<h1>{props.title}</h1>
		</header>
	);
}

export default Header;
