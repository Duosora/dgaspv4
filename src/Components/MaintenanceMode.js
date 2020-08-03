import React from 'react';
import { globalState } from './GlobalState';

const MaintenanceMode = () => {
	
	return (
		<div className="maintenancePage">
			<div>
				<h1>Hello!</h1>
				<h2>GASP is currently down.</h2>
				<h3>Please <a href={globalState.threadLink} rel="noopener noreferrer" target="_blank">check the thread</a><br/>for updates, or to leave us a message.</h3>
				<h2>Thank you for your patience!</h2>
			</div>
		</div>
	);
}

export default MaintenanceMode;