import React from 'react';
import { globalState } from './GlobalState';
import { Container, Row, Col, Button } from 'reactstrap';

/*
	<Button className="keywordButton" outline onClick={() => this.onKeywordClick(index)} active={this.state.keywordsChecked.includes(index)} color="info">{item}</Button>
*/

class KeywordForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			keywordsSelected: []
		}
	}

	keywordToggled = (item,index) => {
		const arrayCopy		 = Array.from(this.state.keywordsSelected);
		const toggledIndex = arrayCopy.indexOf(item[0]);

		// If the value wasn't present, add it; else remove it.
		(toggledIndex === -1) ?	arrayCopy.push(item[0]) : arrayCopy.splice(toggledIndex,1);

		this.setState({keywordsSelected: arrayCopy},() => {
			// A keyword got changed, re-render this component & notify parent.
			if(this.props.onAdjust) {
				this.props.onAdjust(arrayCopy);
			}
		});
	}

	componentDidMount = () => {
		this.printKeyword   = this.printKeyword.bind(this);
		this.keywordToggled = this.keywordToggled.bind(this);
	}

	componentDidUpdate = () => {
		if(this.props.isReset) {
			this.setState({keywordsSelected: []});
		}
	}

	printKeyword = (item,index) => {
		return (
			<Col key={index}>
				<Button outline
					className="keywordButton"
					color="info"
					onClick={() => this.keywordToggled(item,index)}
					active={this.state.keywordsSelected.includes(item[0])}
				>
					{item[0]}
				</Button>
			</Col>
		);
	}

	render () {
		return (
			<Container className="keywordContainer">
				<Row xs="1" sm="1" md="1" lg="1" xl="2">
					{
						globalState.keywordsData.map((item,index) => (
							this.printKeyword(item,index)
						))
					}
				</Row>
			</Container>
		);
	}
}

export default KeywordForm;
