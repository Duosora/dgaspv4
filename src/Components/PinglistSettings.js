import React from 'react';
import { globalState } from './GlobalState';
import { Container, Row, Col, Button, Form, Input } from 'reactstrap';
import KeywordForm from './KeywordForm';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class PinglistSettings extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selectedBreed		 : 0,
			selectedType		 : 0,
			selectedResell	 : 0,
			selectedKeywords : [],
			currentPinglist	 : ''
		}
	}
	
	updateFilter = (filterKey,filterValue) => {
		this.setState({[filterKey]: filterValue, currentPinglist: ''});
	}
	
	onChangeHandler = (event) => {
		const filterName  = event.target.name;
		const filterValue = event.target.value;
		
		this.updateFilter(filterName,filterValue);
	}
	
	inArray(whichArray,whichValue,deep=false) {
		let finalResult = whichArray.includes(whichValue);
		
		// If the value is found, there is no need for deep search.
		if(!finalResult) {
			if(deep) {
				whichArray.forEach(e => {
					if(Array.isArray(e)) {
						if(!finalResult) {
							finalResult = this.inArray(e,whichValue,true);
						}
					}
				});
			}
		}
		
		return finalResult;
	}
	
	isGenerationAllowed = () => {
		return 		(!!this.state.selectedBreed)
					 && (!!this.state.selectedType)
					 && (!!this.state.selectedResell)
					 && (this.state.selectedKeywords.length > 0);
	}
	
	updateKeywords = (selectedKeywords) => {
		this.updateFilter('selectedKeywords',Array.from(selectedKeywords));
	}
	
	componentDidMount = () => {
		this.onChangeHandler			= this.onChangeHandler.bind(this);
		this.updateFilter					= this.updateFilter.bind(this);
		this.updateKeywords 			= this.updateKeywords.bind(this);
		this.isGenerationAllowed	= this.isGenerationAllowed.bind(this);
		
		this.checkPinglistUser  	= this.checkPinglistUser.bind(this);
		this.generatePinglist			= this.generatePinglist.bind(this);
		this.userWantsPings				= this.userWantsPings.bind(this);
		
		this.inArray							= this.inArray.bind(this);
	}
	
	// On executing this, there is a guarantee the user WANTS pings of some kind.
	checkPinglistUser = (userData) => {
		const userBreeds					 = userData[1].split(', '),
					userSkinAccent			 = userData[2].split(', '),
					userKeywords				 = userData[3].split(', '),
					userUnwantedKeywords = (userData.length > 4) ? userData[4].split(', ') : [],
					wantedKeywords			 = this.state.selectedKeywords.filter(e => !userUnwantedKeywords.includes(e)),
					matchedKeywords			 = Array.from(wantedKeywords).filter(e => userKeywords.includes(e));
		
		// If wantedKeywords.length === 0, it means no keywords from filter request are wanted by user.
		if(wantedKeywords.length === 0) {
			return false;
		}
		
		if(this.state.selectedResell === "Yes") {
			// If the user doesn't want to be pinged for resells, filter them out now.
			if(userUnwantedKeywords.includes('resell')) {
				return false;
			}
		}
		
		// If the necessary breed option is absent in this user's preference, filter them out.
		if(!userBreeds.includes(this.state.selectedBreed)) {
			return false;
		}
		
		// Same for type.
		if(!userSkinAccent.includes(this.state.selectedType)) {
			return false;
		}
		
		// No preference on keywords + userUnwantedKeywords = user wants any keyword except the unwanted ones.
		// Else the user wants *matching* keywords strictly
		if(!userKeywords.includes('no preference')) {
			if(matchedKeywords.length === 0) {
				return false;
			}
		}
		
		return true;
	}
	
	userWantsPings = (userName) => {
		return !this.inArray(globalState.doNotPingList,userName,true);
	}
	
	generatePinglist = () => {
		const pinglistArray = [];

		globalState.masterList.forEach(currentUser => {
			if(this.userWantsPings(currentUser[0].trim())) {
				if(this.checkPinglistUser(currentUser)) {
					// user matches the filters, include into pinglist.
					pinglistArray.push('@'+currentUser[0].trim());
				}
			}
		});
		
		let pinglistString = "[center][url=http://www1.flightrising.com/forums/skin/2480522]Please click here to go to the GASP thread![/url][br][br]Keywords selected: "+this.state.selectedBreed+', '+this.state.selectedKeywords.join(', ')+"[br][br]- Pings auto-hidden -[/center][br][size=0][size=0][size=0][size=0][size=0]"+pinglistArray.join(' ')+"[/size][/size][/size][/size][/size]";
			
		this.setState({currentPinglist: pinglistString});
	}
	
	render () {
		return (
			<Form>
				<Container>
					<Row xs="1" sm="1" md="1" lg="1" xl="3" className="PinglistSelectors">
						<Col>
							<Input
								type="select"
								defaultValue="0"
								name="selectedBreed"
								onChange={this.onChangeHandler}
							>
								<option disabled value="0">Breed / Gender</option>
								{
									globalState.breedsData.map((item,index) => (
										<option key={index} value={item[0]}>{item[0]}</option>
									))
								}
							</Input>
						</Col>
						
						<Col>
							<Input
								type="select"
								defaultValue="0"
								name="selectedType"
								onChange={this.onChangeHandler}
							>
								<option value="0" disabled>Type</option>
								<option value="Accents">Accents</option>
								<option value="Skins">Skins</option>
								<option value="Skincents">Skincents</option>
							</Input>
						</Col>
						
						<Col>
							<Input
								type="select"
								defaultValue="0"
								name="selectedResell"
								onChange={this.onChangeHandler}
							>
								<option value="0" disabled>Are you a reseller?</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</Input>
						</Col>
					</Row>
					
					<h4>Keywords</h4>
					
					<Row>
						<Col>
							<KeywordForm onAdjust={this.updateKeywords} />
						</Col>
					</Row>
					
					<Row className="pinglistBtnsRow">
						<Col>
							<Button
								className="GenerateButton"
								disabled={!this.isGenerationAllowed()}
								color="warning"
								size="lg"
								onClick={this.generatePinglist}
							>
								Generate Pinglist
							</Button>
						</Col>
						
						<Col>
							<CopyToClipboard text={this.state.currentPinglist}>
								<Button className="CopyButton" color="success" size="lg">Copy Pinglist</Button>
							</CopyToClipboard>
						</Col>
					</Row>
					
					<Row>
						<Col>
							<Input
								className="ReadyPinglistServeContainer"
								type="textarea"
								readOnly
								value={this.state.currentPinglist}
							/>
						</Col>
					</Row>
				</Container>
			</Form>
		);
	}
}

export default PinglistSettings;