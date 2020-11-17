import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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

	componentDidMount = () => {
		this.checkLoading = this.checkLoading.bind(this);
		this.goBackTop    = this.goBackTop.bind(this);

		window.addEventListener('scroll', this.handleScroll, true);

		this.checkLoading();
	}

	componentWillUnmount = () => {
		window.removeEventListener('scroll',this.handleScroll);
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
							<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[32][0]}}></span> Coding by <strong>Duosora</strong>.
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
