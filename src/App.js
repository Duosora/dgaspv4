import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './Components/Header';
import Rules from './Components/Rules';
import SheetData from './Components/SheetData';
import PinglistGen from './Components/PinglistGen';
import MaintenanceMode from './Components/MaintenanceMode';
import { globalState } from './Components/GlobalState';

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { sheetsLoaded: false, maintenanceMode: false }
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
	
	checkLoading = () => {
		this.setState({
			sheetsLoaded: globalState.isLoaded(),
			maintenanceMode: globalState.siteStatus.length ? !this.inArray(globalState.siteStatus,"Online",true) : false
		});
		
		if(!globalState.isLoaded()) {
			setTimeout(this.checkLoading,500);
		}
	}
	
	componentDidMount = () => {
		this.checkLoading = this.checkLoading.bind(this);
		
		this.checkLoading();
	}
	
	// I'm dropping a note here that all other components will take that sheets did successfully load for granted due to them being loaded only when the sheets are loaded.
  render() {
		return this.state.sheetsLoaded ? this.state.maintenanceMode ? (
			<div>
				<MaintenanceMode />
			</div>
		) : (
			<div className="App">
				<Container fluid className="HeaderRow">
					<Row>
						<Col className="HeaderContent"><Header /></Col>
					</Row>
				</Container>
		
				<Container fluid className="ContentRow">
					<Row xs="1" sm="1" md="2">
						<Col className="RulesCol">
							<Rules />
						</Col>
						<Col className="PinglistCol">
							<PinglistGen />
						</Col>
					</Row>
				</Container>
				
				<Container fluid className="FooterRow">
					<Row>
						<Col>
							General Accents & Skins Pinglists © 2014-{new Date().getFullYear()}. Coding by Duosora.
						</Col>
					</Row>
					
					<Row>
						<Col>
							This wonderful app is made possible by React and react-query.
						</Col>
					</Row>
				</Container>
      </div>
    ) : (
		<span>
			<SheetData />
			Loading . . .
		</span>
	);

  }
}

export default App;

/*
				<h3>Pings</h3>
				<PinglistForm
					breedlist={this.state.breedList}
					keywords={this.state.keywordList}
					translation={this.state.rulesList[this.state.currentTranslation]}
				/>
				*/