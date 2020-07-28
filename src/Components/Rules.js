import React from 'react';
import { globalState } from './GlobalState';

const Rules = () => {
	const printRule = (item,index) => {
		let	ruleText = item[1];
		
		if(ruleText !== undefined) {
			if(item[0].startsWith('gasp_')) {			
				console.log(item[1]);
				if(ruleText.startsWith('• ')) {
					ruleText = "<li>"+ruleText.substring(2)+"</li>";
				}
				
				return (ruleText !== "-") ? (
					<span key={index} className="rulePosition" dangerouslySetInnerHTML={{ __html: ruleText}}></span>
				) : <span key={index}></span>;
			}
		}
		
		return <span key={index}></span>;
	}
	
	return (
		<ul>
			{ globalState.rulesData.map((item,index) => printRule(item,index)) }
		</ul>
	)
}

export default Rules;