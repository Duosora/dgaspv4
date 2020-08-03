export const globalState = {
	masterList: [],
	doNotPingList: [],
	rulesData: [],
	keywordsData: [],
	breedsData: [],
	siteStatus: [],
	threadLink: 'https://www1.flightrising.com/forums/skin/2480522/',
	isLoaded: () => {
		const loadChecks =  (globalState.masterList.length !== 0)
										 && (globalState.doNotPingList.length !== 0)
										 && (globalState.rulesData.length !== 0)
										 && (globalState.keywordsData.length !== 0)
										 && (globalState.breedsData.length !== 0)
										 && (globalState.siteStatus.length !== 0);
										 
		return loadChecks;
	}
};