import React from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Header from './Components/Header';
import Rules from './Components/Rules';
import SheetData from './Components/SheetData';
import PinglistGen from './Components/PinglistGen';
import MaintenanceMode from './Components/MaintenanceMode';
import './Styles/App.scss';
import { globalState } from './Components/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { sheetsLoaded: false, maintenanceMode: false,
									 currentTheme: 'theme4', themeDropdownOpen: false }
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
		} else {
			//this.setState({maintenanceMode: true});
		}
	}

	goBackTop = (e = false) => {
		window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
		if(e) {
			e.preventDefault();
		}
	}

	handleScroll = () => {
		const scrollDepth  = window.scrollY;
		const scrollButton = document.getElementById('scrollToTopButton');

		if(scrollButton !== null) {
			if(scrollDepth > 300) {
				scrollButton.classList.add("show");
			} else {
				scrollButton.classList.remove("show");
			}
		}
	}

	defocusButtons = (e) => {
		if(document.activeElement.toString() === '[object HTMLButtonElement]') {
			document.activeElement.blur();
		}
	}

	componentDidMount = () => {
		this.checkLoading = this.checkLoading.bind(this);
		this.goBackTop    = this.goBackTop.bind(this);

		window.addEventListener('scroll', this.handleScroll, true);
		document.addEventListener('click', this.defocusButtons, true);

		this.checkLoading();
	}

	componentWillUnmount = () => {
		window.removeEventListener('scroll',this.handleScroll);
		document.removeEventListener('click', this.defocusButtons);
	}

	toggleThemeDropdown = () => {
		const isOpen = !this.state.themeDropdownOpen;

		this.setState({themeDropdownOpen: isOpen});
	}

	themeSelect = themeTag => {
		this.setState({currentTheme: themeTag});
	}

	// Rusurano: no maintenanceMode
	// I'm dropping a note here that all other components will take that sheets did successfully load for granted due to them being loaded only when the sheets are loaded.
  render() {
		return this.state.sheetsLoaded ? /*this.state.maintenanceMode*/false ? (
			<div>
				<MaintenanceMode />
			</div>
		) : (
			<div className={`App ${this.state.currentTheme}`}>
				<Container fluid className="HeaderRow">
					<Row>
						<Col className="HeaderContent">
							<Header />
							<Dropdown isOpen={this.state.themeDropdownOpen} toggle={this.toggleThemeDropdown}>
				      <DropdownToggle caret>
				        { globalState.dynamicFields[53][0] }
				     	</DropdownToggle>
				      <DropdownMenu>
				        <DropdownItem header>{ globalState.dynamicFields[54][0] }</DropdownItem>
				        <DropdownItem onClick={() => { this.themeSelect("theme1") }}>{ globalState.dynamicFields[55][0] }</DropdownItem>
								<DropdownItem onClick={() => { this.themeSelect("theme3") }}>{ globalState.dynamicFields[56][0] }</DropdownItem>
								<DropdownItem onClick={() => { this.themeSelect("theme4") }}>{ globalState.dynamicFields[57][0] }</DropdownItem>
								{ /*
										Rest in peace, valiant themes...
										<DropdownItem onClick={() => { this.themeSelect("theme2") }}>FR Theme</DropdownItem>
										<DropdownItem onClick={() => { this.themeSelect("theme5") }}>Darkmode #2</DropdownItem>
								*/ }
				      </DropdownMenu>
				    </Dropdown>
						</Col>
					</Row>
				</Container>

				<Container fluid className="ContentRow">
					<Row xs={"1"} sm={"1"} md={"2"} lg={"2"} xl={"2"}>
						<Col>
							<div className="RulesCol">
								<Rules />
							</div>
						</Col>
						<Col>
							<div className="PinglistCol">
								<PinglistGen />
							</div>
						</Col>
					</Row>
				</Container>

				<Container fluid className="FooterRow">
					<Row>
						<Col>
							<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[32][0]}}></span> Coding by <b>Duosora</b>.
						</Col>
					</Row>

					<Row>
						<Col>
							<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[33][0]}}></span>
						</Col>
					</Row>
				</Container>

				<button id="scrollToTopButton" className="backToTopButton" onClick={this.goBackTop}>
					<FontAwesomeIcon icon={faAngleUp} size="2x" />
				</button>
      </div>
    ) : (
		<span>
			<SheetData />
			Loading 。 。 。
		</span>
	);

  }
}

export default App;
