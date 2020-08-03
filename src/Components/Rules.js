import React from 'react';
import { globalState } from './GlobalState';

const Rules = () => {
	const printRule = (item,index) => {
		let	ruleText = item[1];
		
		if(ruleText !== undefined) {
			if(ruleText.startsWith('-')) {
				ruleText = "<br/>";
			}
			if(item[0].startsWith('gasp_')) {			
				if(ruleText.startsWith('• ')) {
					ruleText = "<li>"+ruleText.substring(2)+"</li>";
				}
				
				return (ruleText !== "-<br/>") ? (
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