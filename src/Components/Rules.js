import React from 'react';
import { globalState } from './GlobalState';

const Rules = () => {
	const printRule = (item,index) => {
		if(item[0].startsWith('gasp_')) {
			return (item[1] !== "-") ? (
				<span key={index} className="rulePosition" dangerouslySetInnerHTML={{ __html: item[1]}}></span>
			) : <span key={index}></span>;
		}
		
		return <span key={index}></span>;
	}
	
	return globalState.rulesData.map((item,index) => printRule(item,index));
}

export default Rules;