import React from 'react';
import { globalState } from './GlobalState';
import { Container, Row, Col, Form, Input, Button, InputGroup, InputGroupAddon, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import KeywordForm from './KeywordForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class PinglistSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedBreed		 : 0,
			selectedCoverage : 0,
			selectedResell	 : 0,
			selectedKeywords : [],
			currentPinglist	 : '',
			isResetting			 : false,
			popoverOpen			 : false
		}
	}

	handleButton(e) {
		e.preventDefault();
	}

	popoverToggle = () => {
		const isNowOpen = this.state.popoverOpen;

		this.setState({popoverOpen: !isNowOpen})
	}

	updateFilter = (filterKey,filterValue) => {
		this.setState({[filterKey]: filterValue, currentPinglist: ''},() => {
			this.props.onDataChange(this.props.eKey,JSON.parse(JSON.stringify(this.state)));
		});
	}

	onChangeHandler = (event) => {
		const filterName  = event.target.name;
		const filterValue = event.target.value;

		this.updateFilter(filterName,filterValue);
	}

	updateKeywords = (selectedKeywords) => {
		this.updateFilter('selectedKeywords',Array.from(selectedKeywords));
	}

	componentDidMount = () => {
		this.onChangeHandler			= this.onChangeHandler.bind(this);
		this.updateFilter					= this.updateFilter.bind(this);
		this.updateKeywords 			= this.updateKeywords.bind(this);
	}

	resetFilters = (e) => {
		e.target.blur();

		// To reset the keywords.
		this.setState({isResetting: true},() => {
			this.setState({isResetting: false});
		});

		this.updateFilter('selectedBreed',0);
		this.updateFilter('selectedCoverage',0);
		this.updateFilter('selectedResell',0);
	}

	render () {
		return (
			<Form>
				<Container>
					<Row className="PinglistSelectors">
						<Col xs="12" sm="12" md="12" lg="12" xl={{ size: 4, offset: 0 }}>
							<Input
								type="select"
								name="selectedBreed"
								value={this.state.isResetting ? 0 : this.state.selectedBreed}
								onChange={this.onChangeHandler}
							>
								<option disabled value="0">
									{ globalState.dynamicFields[24][0] }
								</option>
								{
									globalState.breedsData.map((item,index) => (
										<option key={index} value={item[0]}>{item[0]}</option>
									))
								}
							</Input>
						</Col>

						<Col xs="12" sm="12" md="12" lg="12" xl={{ size: 4, offset: 0 }}>
							<Input
								type="select"
								name="selectedCoverage"
								value={this.state.isResetting ? 0 : this.state.selectedCoverage}
								onChange={this.onChangeHandler}
							>
								<option value="0" disabled>
									{ globalState.dynamicFields[25][0] }
								</option>
								<option value="Accents">Accent (up to 30%)</option>
								<option value="Skincents">Skincent (31% to 99%)</option>
								<option value="Skins">Skin (100%)</option>
							</Input>
						</Col>

						<Col xs="12" sm="12" md="12" lg="12" xl={{ size: 4, offset: 0 }}>
							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<Button className="form-control PopoverResell" onClick={this.handleButton} color="light" id={'PopoverResell'+this.props.id}>
										<FontAwesomeIcon icon={faQuestionCircle} />
									</Button>

									<UncontrolledPopover
										trigger="hover"
										placement="bottom"
										isOpen={this.state.popoverOpen}
										target={'PopoverResell'+this.props.id}
										toggle={this.popoverToggle.bind(this)}
									>
						        <PopoverHeader><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[11][0]}}></span></PopoverHeader>
						        <PopoverBody><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[12][0]}}></span></PopoverBody>
						      </UncontrolledPopover>
								</InputGroupAddon>
								<Input
									type="select"
									name="selectedResell"
									value={this.state.isResetting ? 0 : this.state.selectedResell}
									onChange={this.onChangeHandler}
								>
									<option value="0" disabled>
										{ globalState.dynamicFields[26][0] }
									</option>
									<option value="No">{ globalState.dynamicFields[52][0] }</option>
									<option value="Yes">{ globalState.dynamicFields[51][0] }</option>
									<option value="help1" style={{ fontStyle: 'italic' }} disabled>{ globalState.dynamicFields[50][0] }</option>
								</Input>
							</InputGroup>
						</Col>
					</Row>

					<h4>Keywords</h4>

					<Row>
						<Col>
							<KeywordForm isReset={this.state.isResetting} onAdjust={this.updateKeywords} />
						</Col>
					</Row>
				</Container>
			</Form>
		);
	}
}

export default PinglistSettings;
