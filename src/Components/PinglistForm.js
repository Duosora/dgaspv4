import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './PinglistForm.css';

const SHEET_ID = '1eX0iu8pFksHIqu66dFc3HjsGwLg6c8ZZ9Q-67MuAQPk';
const API_KEY  = 'AIzaSyDGLVvBm5uNAMlLEV1q-h9Gpu1misQg6I8';

class PinglistForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keywordsChecked: [],
			isBreedSelected: false,
			isSasSelected: false,
			isResellSelected: false,
			isKeywordSelected: 0,
			selectedBreed: "",
			sasSelected: "",
			isReselling: false,
			disableGen: true,
			currentPinglist: ""
		};
		
		this.onBreedChange  = this.onBreedChange.bind(this);
		this.onSasChange    = this.onSasChange.bind(this);
		this.onResellChange = this.onResellChange.bind(this);
	}
	
	updatePinglist = () => {
		let requestRange = "'master list'!A2:E";
		
		return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${requestRange}?key=${API_KEY}`);
	}
	
	generatePinglist = () => {
		// Every time we generate the pinglist, we update the pinglist.
		
		this.updatePinglist()
			.then(response => response.json())
			.then(response => {
				let masterlistEntries = response.values;
				let pinglistArray     = [];
				
				let keywordsArray   = this.props.keywords.slice(1);
				let originalState   = this.state;
				
				masterlistEntries.forEach(function(pinglistEntry, index) {
					let userBreeds        = pinglistEntry[1].split(', '); // get user's breeds
					let userSkinAccent    = pinglistEntry[2].split(', '); // get user's skin accent preference
					let userSpecifics     = pinglistEntry[3].split(', '); // get user's keywords (specifics)
					let userDoNotPing     = null;
					let keywordsBlueprint = [];

					if(pinglistEntry.length > 4) {
						userDoNotPing = pinglistEntry[4].split(', '); // get user's do not pings
					}
					
					if(originalState.reselling) {
						if(userDoNotPing === null) {
							keywordsBlueprint.push('resell');
						} else if(userDoNotPing.indexOf('resell') < 0) {
							keywordsBlueprint.push('resell');
						}
					}
					
					originalState.keywordsChecked.forEach(function(keywordID) {
						if(userDoNotPing === null) {
							keywordsBlueprint.push(keywordsArray[keywordID]);
						} else if(userDoNotPing.indexOf(keywordsArray[keywordID]) < 0) {
							keywordsBlueprint.push(keywordsArray[keywordID]);
						}
					});
					
					// Seek if the user has the breed.
					if(userBreeds.indexOf(originalState.selectedBreed) < 0) {
						// The needed breed is absent, don't add this user to pinglist.
						// Skip to the next user.
						return;
					}
					
					if(userSkinAccent.indexOf(originalState.sasSelected) < 0) {
						// The needed sas is absent, don't add this user to pinglist.
						// Skip to the next user.
						return;
					}

					if(userSpecifics.indexOf('no preference') < 0) {
						// seek for keywords. the user has preferences.
						if(keywordsBlueprint.some(r=> userSpecifics.indexOf(r) >= 0)) {
							// add to pinglist
							pinglistArray.push(pinglistEntry[0]);
						}
					} else {
						// the user has no preference, so with matching breed, we proceed.
					}
				});
				
				if(pinglistArray.length > 0) {
					this.setState({currentPinglist: '@'+pinglistArray.join(' @')});
				} else {
					this.setState({currentPinglist: 'No users to ping, please change your criteria or come back later!'});
				}
			}).catch();
	}
	
	onKeywordClick = (selected) => {
		let index = this.state.keywordsChecked.indexOf(selected);
		let acopy = Array.from(this.state.keywordsChecked);
		
		if (index < 0) {
			acopy.push(selected);
		} else {
			acopy.splice(index,1);
		}
		
		this.setState({keywordsChecked: Array.from(acopy)});
		this.setState({isKeywordSelected: Array.from(acopy).length},() => {
			this.checkForButtonActivation();
		});
	}
	
	onBreedChange(event) {
		this.setState({selectedBreed: event.target.value});
		this.setState({isBreedSelected: true},() => {
			this.checkForButtonActivation();
		});
	}
	
	onSasChange(event) {
		this.setState({sasSelected: event.target.value});
		this.setState({isSasSelected: true},() => {
			this.checkForButtonActivation();
		});
	}
	
	onResellChange(event) {
		if(event.target.value == 1) {
			this.setState({reselling: true});
		} else if(event.target.value == 2) {
			this.setState({reselling: false});
		}
		
		this.setState({isResellSelected: true},() => {
			this.checkForButtonActivation();
		});
	}
	
	checkForButtonActivation() {
		this.setState({disableGen: !(this.state.isBreedSelected && this.state.isSasSelected && this.state.isResellSelected && (this.state.keywordsChecked.length > 0))});
	}
	
	render() {
		return (
			<Form>
				<em>{this.props.translation['gasperror']}</em>
				<Container>
					<Row>
						<Col>
							<FormGroup>
								<Input type="select" defaultValue="0" name="breedGenderSelect" id="breedGenderSelect" onChange={this.onBreedChange}>
									<option disabled value="0">{this.props.translation['gaspbg']}</option>
									{
										this.props.breedlist.slice(1).map((item,index) => (
											<option key={index} value={item}>{item}</option>
										))
									}
								</Input>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Input type="select" defaultValue="0" name="typeSelect" id="typeSelect" onChange={this.onSasChange}>
									<option value="0" disabled>{this.props.translation['gaspt']}</option>
									<option value="Accents">Accents</option>
									<option value="Skins">Skins</option>
									<option value="Skincents">Skincents</option>
								</Input>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Input type="select" defaultValue="0" name="typeSelect" id="typeSelect" onChange={this.onResellChange}>
									<option value="0" disabled>{this.props.translation['resell']}</option>
									<option value="1">Yes</option>
									<option value="2">No</option>
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<h4>{this.props.keywords[0]}:</h4>
					<Row>
						<Col>
							<div className="keywordContainer">
								{
									this.props.keywords.slice(1).map((item,index) => (
										<Button outline onClick={() => this.onKeywordClick(index)} active={this.state.keywordsChecked.includes(index)} color="info">{item}</Button> 
									))
								}
							</div>
						</Col>
					</Row>
					<br/><br/>
					<Row>
						<Col>
							<Button disabled={this.state.disableGen} color="warning" onClick={() => this.generatePinglist()} size="lg">Generate Pinglist</Button>{' '}
						</Col>
					</Row>
					<br/><br/>
					<Row>
						<Col>
							<em>By copying this pinglist, you are aware that this pinglist is generated based on your needs. Before copying the pinglist, triple check the fields, and correct any mistakes you might have made in the process to avoid mispings. Thank you for understanding!</em>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormGroup>
								<Input type="textarea" name="text" id="exampleText" value={this.state.currentPinglist} />
							</FormGroup>
						</Col>
					</Row>
				</Container>
			</Form>
		);
	}
}

export default PinglistForm;