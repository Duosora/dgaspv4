export const globalState = {
	masterList: [],
	doNotPingList: [],
	rulesData: [],
	keywordsData: [],
	breedsData: [],
	siteStatus: [],
	dynamicFields: [],
	threadLink: 'https://www1.flightrising.com/forums/skin/2480522/',
	isLoaded: () => {
		const loadChecks =  (globalState.masterList.length !== 0)
										 && (globalState.doNotPingList.length !== 0)
										 && (globalState.rulesData.length !== 0)
										 && (globalState.keywordsData.length !== 0)
										 && (globalState.breedsData.length !== 0)
										 && (globalState.siteStatus.length !== 0);

		return loadChecks;
	},
	inArray: (arr, val, deep=false) => {
		let finalResult = arr.includes(val);

		// If the value is found, there is no need for deep search.
		if(!finalResult) {
			if(deep) {
				arr.forEach(e => {
					if(Array.isArray(e)) {
						if(!finalResult) {
							finalResult = globalState.inArray(e,val,true);
						}
					}
				});
			}
		}

		return finalResult;
	},
	mergeArrays: (...arrays) => {
    let jointArray = []

    arrays.forEach(array => {
        jointArray = [...jointArray, ...array]
    })
    const uniqueArray = jointArray.filter((item,index) => jointArray.indexOf(item) === index)
    return uniqueArray
	},
	userBannedPings: (user_name) => {
		return globalState.inArray(globalState.doNotPingList,user_name,true);
	},
	userShallBePinged: (user_index, pinglist_filter_data) => {
		const userName						 = user_index[0].trim(),
					userBreedList				 = user_index[1].split(', '),
					userCoverageList		 = user_index[2].split(', '),
					userKeywordList			 = user_index[3].split(', '),
					userKeywordBanList	 = (user_index.length > 4) ? user_index[4].split(', ') : [],
					wantedKeywords			 = pinglist_filter_data.selectedKeywords.filter(e => !userKeywordBanList.includes(e)),
					matchedKeywords			 = Array.from(wantedKeywords).filter(e => userKeywordList.includes(e));

		// User doesn't want any pings? ok just yeet them off now.
		if(globalState.userBannedPings(userName)) {
			return false;
		}

		// v1.001 starrlight's report: if any unwanted keyword got caught, filter out the user.
		if(wantedKeywords.length !== pinglist_filter_data.selectedKeywords.length) {
			return false;
		}

		// If wantedKeywords.length === 0, it means no keywords from filter request are wanted by user.
		if(wantedKeywords.length === 0) {
			return false;
		}

		if(pinglist_filter_data.selectedResell === "Yes") {
			// If the user doesn't want to be pinged for resells, filter them out now.
			if(userKeywordBanList.includes('resell')) {
				return false;
			}
		}

		// If the necessary breed option is absent in this user's preference, filter them out.
		if(!userBreedList.includes(pinglist_filter_data.selectedBreed)) {
			return false;
		}

		// Same for type.
		if(!userCoverageList.includes(pinglist_filter_data.selectedCoverage)) {
			return false;
		}

		// No preference on keywords + userUnwantedKeywords = user wants any keyword except the unwanted ones.
		// Else the user wants *matching* keywords strictly
		if(!userKeywordList.includes('no preference')) {
			if(matchedKeywords.length === 0) {
				return false;
			}
		}

		return true;
	},
	isPinglistEligible: (pinglistData) => {
		return	(!!pinglistData.selectedBreed)
						&& (!!pinglistData.selectedCoverage)
						&& (!!pinglistData.selectedResell)
						&& (pinglistData.selectedKeywords.length > 0);
	}
};
