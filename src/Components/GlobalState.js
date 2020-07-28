export const globalState = {
	masterList: [],
	doNotPingList: [],
	rulesData: [],
	keywordsData: [],
	breedsData: [],
	isLoaded: () => {
		const loadChecks =  (globalState.masterList.length !== 0)
										 && (globalState.doNotPingList.length !== 0)
										 && (globalState.rulesData.length !== 0)
										 && (globalState.keywordsData.length !== 0)
										 && (globalState.breedsData.length !== 0);
										 
		return loadChecks;
	}
};