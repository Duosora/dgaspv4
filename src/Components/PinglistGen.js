import React from 'react';
import { Container, Row, Col, Button, Input, UncontrolledPopover, PopoverHeader, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { globalState } from './GlobalState';
import PinglistSettings from './PinglistSettings';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp, faQuestionCircle, faExclamationCircle, faCheck, faAngleRight} from '@fortawesome/free-solid-svg-icons';

class PinglistGen extends React.Component {
	constructor(props) {
		super(props);

		this.generatorCount   = 0;
		this.lastVisible      = false;
		this.scrollToAddition = true;

		this.state = {
			pinglistGenerators: [],
			assembledPinglist: ''
		}
	}

	toggleDeletionModal = targetName => {
		const targetKey = `delmodal-${targetName}`;

		if (!this.state[targetKey]) {
      this.setState({
        ...this.state,
        [targetKey]: {
          modalOpen: true
        }
      });
    } else {
      this.setState({
        ...this.state,
        [targetKey]: {
          modalOpen: !this.state[targetKey].modalOpen
        }
      });
    }
	}

	isDeletionModalOpen = targetName => {
		const targetKey = `delmodal-${targetName}`;
    return this.state[targetKey] ? this.state[targetKey].modalOpen : false;
  }

	togglePopover = targetName => {
		if (!this.state[targetName]) {
      this.setState({
        ...this.state,
        [targetName]: {
          popoverOpen: true
        }
      });
    } else {
      this.setState({
        ...this.state,
        [targetName]: {
          popoverOpen: !this.state[targetName].popoverOpen
        }
      });
    }
	}

	isPopoverOpen = targetName => {
    return this.state[targetName] ? this.state[targetName].popoverOpen : false;
  }

	isAssemblingAllowed = () => {
		const	currentArray = JSON.parse(JSON.stringify(this.state.pinglistGenerators));
		const newArray		 = currentArray.filter(e => globalState.isPinglistEligible(e.data));

		// if one pinglist is enough, go with just newArray.length > 0;

		return ( (newArray.length > 0) && (newArray.length === currentArray.length) );
	}

	getPinglistFilterFooter = (index) => {
		const d = this.state.pinglistGenerators[index].data;
		const keyword_order = globalState.dynamicFields[1][0].split(', ');
		let returned_array = [];

		keyword_order.forEach((item,index) => {
			if(item === '%BREED%') {
				returned_array.push((d.selectedBreed    === 0	? '' : d.selectedBreed));
			} else if(item === '%COVERAGE%') {
				returned_array.push((d.selectedCoverage === 0 ? '' : d.selectedCoverage.substring(0,d.selectedCoverage.length-1)));
			} else if(item === '%RESELL%') {
				returned_array.push((d.selectedResell === 'Yes' ? 'resell' : ''));
			} else if(item === '%OTHERS%') {
				returned_array.push(d.selectedKeywords.join(', '));
			}
		});

		return returned_array;
	}

	assemblePinglists = () => {
		let assembledPinglist = [];
		const userFormatting  = globalState.dynamicFields[5][0];

		this.state.pinglistGenerators.forEach((item,index) => {
			let current_pinglist = [];

			if(item.eligible) {
				globalState.masterList.forEach(user => {
					if(globalState.userShallBePinged(user,item.data)) {
						current_pinglist.push(userFormatting.replace("%USER%",user[0].trim()));
					}
				});

				assembledPinglist = globalState.mergeArrays(assembledPinglist,current_pinglist);
			}
		});

		return assembledPinglist.join(' ');
	}

	buildPinglistAssembly = (e) => {
		const pingedUsers = this.assemblePinglists();
		let eligibleCount = 0;
		let postLayout = globalState.dynamicFields[0][0];
		const keywordsDelimiter = globalState.dynamicFields[3][0];
		let pinglistString = '';
		let preparedKeywords = '';
		const eventTarget = e.target;

		setTimeout(() => {
			eventTarget.blur();
		},380);

		this.state.pinglistGenerators.forEach((item, index) => {
			if(item.eligible) {
				let filterFooter = this.getPinglistFilterFooter(index);

				preparedKeywords += filterFooter.filter(x => x!=='').join(', ')+keywordsDelimiter;

				eligibleCount++;
			}
		});

		if(eligibleCount === 0) {
			pinglistString = globalState.dynamicFields[7][0];
		} else {
			preparedKeywords = preparedKeywords.substring(0,preparedKeywords.length-keywordsDelimiter.length);

			if(eligibleCount === 1) {
				postLayout = globalState.dynamicFields[49][0];
			}

			pinglistString = postLayout.replace("%KEYWORDS%",preparedKeywords);
			pinglistString = pinglistString.replace("%PINGLIST%",pingedUsers);
		}
		this.setState({assembledPinglist: pinglistString});
	}

	componentDidMount = () => {
		this.constructPinglistFilter = this.constructPinglistFilter.bind(this);
		this.isAssemblingAllowed		 = this.isAssemblingAllowed.bind(this);

		this.assemblePinglists			 = this.assemblePinglists.bind(this);
		this.buildPinglistAssembly	 = this.buildPinglistAssembly.bind(this);
		this.getPinglistFilterFooter = this.getPinglistFilterFooter.bind(this);

		this.optionButtonClicked		 = this.optionButtonClicked.bind(this);

		// One pinglist will be available right from the very beginning.
		this.scrollToAddition = false;
		this.addGenerator();
		this.scrollToAddition = true;
	}

	addGenerator = (e = false) => {
		const	currentArray = JSON.parse(JSON.stringify(this.state.pinglistGenerators));
		const newId        = this.generatorCount;
		const shouldScroll = this.scrollToAddition;

		if(e) {
			e.target.blur();
		}

		if(this.lastVisible !== false) {
			currentArray[this.lastVisible].visible = false;
		}

		this.lastVisible = currentArray.length;

		currentArray.push({
			id: newId,
			visible: true,
			eligible: false,
			data: 0
		});

		this.generatorCount++;

		// On the addition of the new generator, delete the pinglist.
		this.setState({pinglistGenerators: currentArray, assembledPinglist: ''},() => {
			if(shouldScroll) {
				document.getElementById(newId).scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
			}
		});
	}

	deleteGenerator = (id,index,needsConfirm) => {
		const	currentArray = JSON.parse(JSON.stringify(this.state.pinglistGenerators));
		const newArray		 = currentArray.filter(e => e.id !== id);
		const idInTheArray = currentArray.findIndex((e,i,a) => { return e.id === id });
		//let isConfirmed    = needsConfirm ? window.confirm(globalState.dynamicFields[23][0]) : true;

		this.toggleDeletionModal(`FilterDeletionModal${id}`);

		//if(isConfirmed) {
			if(this.lastVisible === index) {
				this.lastVisible = false;
			} else if(this.lastVisible !== false) {
				if(this.lastVisible >= idInTheArray) {
					this.lastVisible--;
				}
			}

			this.setState({pinglistGenerators: newArray, assembledPinglist: ''});
		//}
	}

	toggleVisibility = (index) => {
		const currentArray = JSON.parse(JSON.stringify(this.state.pinglistGenerators));

		if(this.lastVisible !== false) {
			if((currentArray[this.lastVisible].visible)&&(this.lastVisible !== index)) {
				currentArray[this.lastVisible].visible = false;
			}
		}

		currentArray[index].visible = !currentArray[index].visible;
		this.lastVisible = index;

		this.setState({pinglistGenerators: currentArray});
	}

	dataChangeHandler = (index,data) => {
		const	currentArray = JSON.parse(JSON.stringify(this.state.pinglistGenerators));
		const idInTheArray = currentArray.findIndex((e,i,a) => { return e.id === index });

		currentArray[idInTheArray].data     = data;
		currentArray[idInTheArray].eligible = globalState.isPinglistEligible(data);

		this.setState({pinglistGenerators: currentArray, assembledPinglist: ''});
	}

	optionButtonClicked = (e,item,index,actionId) => {
		let clickedButton = null;

		if(actionId === 0) {
			clickedButton = document.getElementsByClassName('pinglistFilterButton1');
			// Search deletion
			//this.deleteGenerator(item.id,index,true);
		} else if(actionId === 1) {
			clickedButton = document.getElementsByClassName('pinglistFilterButton2');
			// Search toggle
			this.toggleVisibility(index);
		}

		// Remove focus from button.
		for (var i=0; i<clickedButton.length; i++) {
		  clickedButton[i].blur();
		}
	}

	assembleErrors = (item) => {
		let errorList = [];

		if(item.data === 0) {
			errorList.push('- '+globalState.dynamicFields[36][0]);
			errorList.push('- '+globalState.dynamicFields[37][0]);
			errorList.push('- '+globalState.dynamicFields[38][0]);
			errorList.push('- '+globalState.dynamicFields[39][0]);
		} else {
			if(item.data.selectedBreed === 0) {
				errorList.push('- '+globalState.dynamicFields[36][0]);
			}

			if(item.data.selectedCoverage === 0) {
				errorList.push('- '+globalState.dynamicFields[37][0]);
			}

			if(item.data.selectedResell === 0) {
				errorList.push('- '+globalState.dynamicFields[38][0]);
			}

			if(item.data.selectedKeywords.length === 0) {
				errorList.push('- '+globalState.dynamicFields[39][0]);
			}
		}

		return errorList.join('<br/>');
	}

	getPinglistFooterRender = (item, isModal) => {
		return ((item.data !== 0)&&((item.data.selectedKeywords.length!==0)||(item.data.selectedBreed!==0)||(item.data.selectedCoverage!==0)||(item.data.selectedResell==='Yes'))) ?
			( isModal ? globalState.dynamicFields[47][0] : globalState.dynamicFields[19][0] ) +
			(item.data.selectedBreed === 0 ? '' : item.data.selectedBreed+', ')+
			(item.data.selectedCoverage === 0 ? '' : item.data.selectedCoverage.substring(0,item.data.selectedCoverage.length-1)+', ')+
			(item.data.selectedResell === 'Yes' ? 'resell, ' : '')+
			item.data.selectedKeywords.join(', ')
		: ( isModal ? globalState.dynamicFields[48][0] : globalState.dynamicFields[18][0] );
	}

	constructHeaderPopover = (item) => {
		return item.eligible ? (
			<>
				<span className={ 'iconEligible' } id={ `iconEligible${item.id}` }>
					<FontAwesomeIcon icon={ faCheck } />
				</span>

				<UncontrolledPopover
					trigger="hover"
					placement="bottom"
					isOpen={ this.isPopoverOpen(`iconEligible${item.id}`) }
					target={ `iconEligible${item.id}` }
					toggle={ () => this.togglePopover(`iconEligible${item.id}`) }
				>
					<PopoverHeader><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[41][0]}}></span></PopoverHeader>
					<PopoverBody><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[42][0]}}></span></PopoverBody>
				</UncontrolledPopover>
			</>
		) : (
			<>
				<span className={ 'iconIneligible' } id={ `iconIneligible${item.id}` }>
					<FontAwesomeIcon icon={ faExclamationCircle } />
				</span>

				<UncontrolledPopover
					trigger="hover"
					placement="bottom"
					isOpen={ this.isPopoverOpen(`iconIneligible${item.id}`) }
					target={ `iconIneligible${item.id}` }
					toggle={ () => this.togglePopover(`iconIneligible${item.id}`) }
				>
					<PopoverHeader><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[34][0]}}></span></PopoverHeader>
					<PopoverBody>
						<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[35][0]}}></span>
						<br/>
						<span dangerouslySetInnerHTML={{ __html: this.assembleErrors(item)}}></span>
						<br/>
						<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[40][0]}}></span>
					</PopoverBody>
				</UncontrolledPopover>
			</>
		);
	}

	constructHeaderActiveIcon = (item) => {
		return (
			<span className={ 'iconExpanded' } id={ `iconExpanded{item.id}` }>
				<FontAwesomeIcon icon={ faAngleRight } />
			</span>
		);
	}

	constructPinglistFilter = (item,index) => {
		return (
			<Container fluid className="pinglistFilterContainer" id={item.id} key={item.id}>
				<Row className="pinglistFilterHeader align-items-center">
					<Col className="pinglistFilterTitle" xs={9} sm={9} md={9} lg={9} xl={9}>

					{ item.visible ? ( item.eligible ? this.constructHeaderPopover(item) : this.constructHeaderActiveIcon(item) ) : this.constructHeaderPopover(item) }

					&nbsp;&nbsp;

						<span className="pinglistFilterTitleText">
							<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[20][0]}}></span>{index+1}
						</span>
					</Col>
					<Col className="pinglistFilterOptions" xs={3} sm={3} md={3} lg={3} xl={3}>
						<Button className="pinglistFilterButton1" onClick={e => { this.optionButtonClicked(e,item,index,0); this.toggleDeletionModal(`FilterDeletionModal${item.id}`); }}>
							<FontAwesomeIcon icon={faTrash} />
						</Button>

							<Modal
								isOpen={this.isDeletionModalOpen(`FilterDeletionModal${item.id}`)}
								toggle={() => this.toggleDeletionModal(`FilterDeletionModal${item.id}`)}
								className="FilterDeletionModal"
								id={`FilterDeletionModal${item.id}`}
							>
				        <ModalHeader
									toggle={() => this.toggleDeletionModal(`FilterDeletionModal${item.id}`)}
								>
									<span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[43][0]}}></span>
								</ModalHeader>
				        <ModalBody>
				          <span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[44][0].replace("%DATA%",this.getPinglistFooterRender(item,true)) }}></span>
				        </ModalBody>
				        <ModalFooter>
				          <Button color="primary" onClick={ () => { this.deleteGenerator(item.id,index,true) } }><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[45][0]}}></span></Button>{' '}
				          <Button color="secondary" onClick={() => this.toggleDeletionModal(`FilterDeletionModal${item.id}`)}><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[46][0]}}></span></Button>
				        </ModalFooter>
				      </Modal>

						<Button className="pinglistFilterButton2" onClick={e => this.optionButtonClicked(e,item,index,1)}>
							<FontAwesomeIcon icon={item.visible ? faCaretUp : faCaretDown} size="2x" />
						</Button>
					</Col>
				</Row>
				<Row className={item.visible ? 'pinglistFilterContentBox' : 'pinglistFilterContentBox collapsed'}>
					<Col>
						<PinglistSettings id={item.id} key={item.id} eKey={item.id} onDataChange={this.dataChangeHandler} />
					</Col>
				</Row>
				<Row className="pinglistFilterFooter">
					<Col>
					<span dangerouslySetInnerHTML={{ __html: this.getPinglistFooterRender(item,false)}}></span>
					</Col>
				</Row>
			</Container>
		);
	}

	render () {
		return (
			<div>
				<h1><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[31][0]}}></span></h1>

				{this.state.pinglistGenerators.map((item,index) => (
						this.constructPinglistFilter(item,index)
				))}

				<hr/>

				<span dangerouslySetInnerHTML={{ __html: this.generatorCount === 0 ? globalState.dynamicFields[13][0] : (this.state.pinglistGenerators.length === 0 ? globalState.dynamicFields[14][0] : globalState.dynamicFields[15][0])}}></span>

				<br/>
				<Button className="NewPinglistButton" onClick={this.addGenerator}>
					<span dangerouslySetInnerHTML={{ __html: ((this.generatorCount === 0) || (this.state.pinglistGenerators.length === 0)) ? globalState.dynamicFields[16][0] : globalState.dynamicFields[17][0]}}></span>
				</Button>

				<br/><br/>

				<div id="GenPinglistPopover">
	        <FontAwesomeIcon icon={faQuestionCircle} />
	      </div> &nbsp;
	      <UncontrolledPopover
					trigger="hover"
					placement="bottom"
					isOpen={this.isPopoverOpen(`GenPinglistPopover`)}
					target={`GenPinglistPopover`}
					toggle={() => this.togglePopover(`GenPinglistPopover`)}
				>
	        <PopoverHeader><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[9][0]}}></span></PopoverHeader>
	        <PopoverBody><span dangerouslySetInnerHTML={{ __html: globalState.dynamicFields[10][0]}}></span></PopoverBody>
	      </UncontrolledPopover>

				<CopyToClipboard text={this.state.assembledPinglist}>
					<Button className={ this.state.assembledPinglist ? 'CopyButton' : 'GenerateButton' }
									disabled={ !this.isAssemblingAllowed() }
									onClick={ this.buildPinglistAssembly }
					>
						<span dangerouslySetInnerHTML={{ __html: this.state.assembledPinglist ? globalState.dynamicFields[22][0] : globalState.dynamicFields[21][0]}}></span>
					</Button>
				</CopyToClipboard>

				<Input
					className="ReadyPinglistServeContainer"
					type="textarea"
					readOnly
					value={this.state.assembledPinglist}
				/>
			</div>
		);
	}
}

export default PinglistGen;
