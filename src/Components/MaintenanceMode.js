import React from 'react';
import { globalState } from './GlobalState';

const MaintenanceMode = () => {

	return (
		<div className="maintenancePage">
			<div>
				<h1><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[27][0]}}></span></h1>
				<h2><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[28][0]}}></span></h2>
				<h3><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[29][0]}}></span></h3>
				<h2><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[30][0]}}></span></h2>
			</div>
		</div>
	);
}

export default MaintenanceMode;
