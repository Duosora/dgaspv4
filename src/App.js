import React from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Header from './Components/Header';
import Lipsum from './Components/Lipsum';
import Gasp from './Components/Gasp';
import Rules from './Components/Rules';
import PinglistForm from './Components/PinglistForm';
import './App.css';

const RULES_SHEET_ID = '1q68G1xsNyUGeZhkHFDqHyuzQKYuCw4BXFaSbmooX-PU';
const SHEET_ID       = '1eX0iu8pFksHIqu66dFc3HjsGwLg6c8ZZ9Q-67MuAQPk';
const API_KEY        = 'AIzaSyDGLVvBm5uNAMlLEV1q-h9Gpu1misQg6I8';

class App extends React.Component {
	// An object that retrieves the needed data for us to proceed.
	state = {
		breedList: {},
		keywordList: {},
		rulesList: {},
		langList: [],
		currentTranslation: 0
	}
	
	getSheetValues = (sheetID,tabName,cellRange) => {
		let requestRange = cellRange;
		
		if(tabName !== null) {
			requestRange = "'"+tabName+"'!"+requestRange;
		}
		
		return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${requestRange}?key=${API_KEY}`);
	}
	
	componentDidMount() {
		// Initializing breeds.
		this.getSheetValues(SHEET_ID,'Breed','A1:A')
			.then(response => response.json())
			.then(response => {
				let valuesArray = response.values;
				let breedsArray  = [];
				
				valuesArray.forEach(function(innerArray) {
					breedsArray.push(innerArray[0]);
				});
				
				this.setState({breedList: breedsArray});
			})
			.catch();
			
		// Initializing keywords
		this.getSheetValues(SHEET_ID,'Keywords','A1:A')
			.then(response => response.json())
			.then(response => {
				let valuesArray = response.values;
				let keywordsArray  = [];
				
				valuesArray.forEach(function(innerArray) {
					keywordsArray.push(innerArray[0]);
				});
				
				this.setState({keywordList: keywordsArray});
			})
			.catch();
			
		// Initializing rules
		this.getSheetValues(RULES_SHEET_ID,'Translations','A1:X')
			.then(response => response.json())
			.then(response => {
				let translationList = [];
				let languageList    = [];
				
				response.values.forEach(function (currentItem,currentIndex) {
					// This is the necessary transposing for the translations.
					// Else the work with them would be soooo messy I'm scared to think lol.
					for(let i=1;i<currentItem.length;i++) {
						if(Array.isArray(translationList[i-1]) === false) {
							translationList[i-1] = [];
						}
						translationList[i-1][currentItem[0]] = currentItem[i];
						if(currentItem[0] == 'native') {
							languageList.push(currentItem[i]);
						}
					}
				});
				
				console.log(languageList);
				
				this.setState({rulesList: translationList});
				this.setState({langList: languageList});
			})
			.catch();
	}
	
	constructor(props) {
		super(props);
		
		this.onLanguageChange = this.onLanguageChange.bind(this);
	}
	
	onLanguageChange(event) {
		this.setState({currentTranslation: event.target.value});
	}
	
  render() {
	  let breedsLoaded   = Object.entries(this.state.breedList).length !== 0;
	  let keywordsLoaded = Object.entries(this.state.keywordList).length !== 0;
	  let rulesLoaded    = Object.entries(this.state.rulesList).length !== 0;
	  let langLoaded     = Object.entries(this.state.langList).length !== 0;
	  let allLoaded      = breedsLoaded && keywordsLoaded && rulesLoaded && langLoaded;

	return allLoaded ? ( 
      <div className="App" >
		<Container fluid className="HeaderRow">
		  <Row>
			<Col><Header /></Col>
		  </Row>
		  <Row>
			<Col sm="12" md={{ size: 6, offset: 3 }}>
				<Input type="select" defaultValue="0" name="languageSelect" id="languageSelect" onChange={this.onLanguageChange}>
					{
						this.state.langList.map((item,index) => (
							<option key={index} value={index}>{item}</option>
						))
					}
				</Input>
			</Col>
		  </Row>
		</Container>
	  
		<Container fluid>
		  <Row>
			<Col className="RulesCol">
				<h3>{this.state.rulesList[this.state.currentTranslation]['rules']}</h3>
				<p>{this.state.rulesList[this.state.currentTranslation]['gasprulenote']}</p>
				<p><a target="_blank" href="http://www1.flightrising.com/forums/skin/2480522">{this.state.rulesList[this.state.currentTranslation]['gaspthread']}</a></p>
				<p><a target="_blank" href="http://www1.flightrising.com/forums/skin/2332244">{this.state.rulesList[this.state.currentTranslation]['gaspqueue']}</a></p>
				<p><a target="_blank" href="http://www.tracemyip.org/tools/remove-duplicate-words-in-text/">{this.state.rulesList[this.state.currentTranslation]['duplicateremover']}</a></p>
				<ul>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule1']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule2']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule3']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule4']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule5']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule6']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule7']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule8']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule9']}}></span><br/>
					<span dangerouslySetInnerHTML={{ __html: this.state.rulesList[this.state.currentTranslation]['gasprule10']}}></span><br/>
				</ul>
			</Col>
			<Col className="PinglistCol">
				<h3>Pings</h3>
				<PinglistForm
					breedlist={this.state.breedList}
					keywords={this.state.keywordList}
					translation={this.state.rulesList[this.state.currentTranslation]}
				/>
			</Col>
		  </Row>
		</Container>
      </div>
    ) : (
		<span>Loading . . .</span>
	);

  }
}

export default App;

/*
	Breed list: this.getSheetValues('Breed','A1:A')
	Keyword list: this.getSheetValues('Keywords','A1:A')
	
	Master list has Usernames, Breeds Genders, Skins/Accents,
		Specifics (keywords?) separated by comma and a single space,
		Don't ping for (also keywords?) separated by comma and a single space
*/