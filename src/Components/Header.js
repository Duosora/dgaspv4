import React from 'react';
import logo from './../logo.png';
import { globalState } from './GlobalState';

class Header extends React.Component {
	render() {
		return (
			<div>
				<a rel="noopener noreferrer" target="_blank" href="http://www1.flightrising.com/forums/skin/2480522">
					<img alt="General Accent & Skin Pinglists - Logo" src={logo} />
				</a>

				<br/><br/>

				<p>
					<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[8][0]}}></span>
				</p>
			</div>
		);
	}
}

export default Header;
