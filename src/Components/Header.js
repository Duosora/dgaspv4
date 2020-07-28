import React from 'react';
import logo from './../logo.png';

class Header extends React.Component {
	render() {
		return (
			<div>
				<a rel="noopener noreferrer" target="_blank" href="http://www1.flightrising.com/forums/skin/2480522">
					<img alt="General Accent & Skin Pinglists - Logo" src={logo} />
				</a>
			</div>
		);
	}
}

export default Header;