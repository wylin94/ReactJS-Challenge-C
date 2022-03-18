import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';

function Header() {
	return (
		<header className='header'>
			<NavLink to='/' exact={true}>
				<img className='headerLogo' src='../images/home.ico' alt='home'></img>
			</NavLink>
			<div className='headerTitle'>Financial Advisor</div>
		</header>
  )
}

export default Header;