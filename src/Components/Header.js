import React from 'react';
import logo from './../logo.png';

class Header extends React.Component {
	render() {
		return (
			<div>
				<a rel="noopener noreferrer" target="_blank" href="http://www1.flightrising.com/forums/skin/2480522">
					<img alt="General Accent & Skin Pinglists - Logo" src={logo} />
				</a>

				<br/><br/>

				<p>
					This application is in the process of active development. Please report any bugs or share your opinions on further improvement by messaging <a rel="noopener noreferrer" target="_blank" href="https://www1.flightrising.com/clan-profile/355822">Duosora</a> on Flight Rising.
				</p>
			</div>
		);
	}
}

export default Header;
