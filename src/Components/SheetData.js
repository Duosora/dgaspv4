import React from 'react';
import { useQuery } from 'react-query';
import { globalState } from './GlobalState';

const API_KEY  			 = 'AIzaSyDGLVvBm5uNAMlLEV1q-h9Gpu1misQg6I8',
			RULES_SHEET_ID = '1Kh5Fd40b-dXtLtCPNTuLHd_fwVC8I9Dvl3fO5cWmogA',
			PINGS_SHEET_ID = '1KGAbuq5rwbSWSLmTOeL8ng8qrprK1KfdJu_Rf_loBS8',
			FETCH_POINTS   = {
				masterList	  : [PINGS_SHEET_ID,"Master List","A2:F"],
				doNotPingList : [PINGS_SHEET_ID,"Do not ping","A2:A"],
				rulesData			: [RULES_SHEET_ID,"Gasp Translations","A:B"],
				keywordsData	: [PINGS_SHEET_ID,"Keywords","A2:A"],
				breedsData		:	[PINGS_SHEET_ID,"Breed","A2:A"],
				siteStatus		:	[PINGS_SHEET_ID,"Status","A1:A"],
				dynamicFields : [RULES_SHEET_ID,"App Content","B1:B"]
			};

const getSheetValues = async (sheetID,tabName,cellRange) => {
	const requestRange = ((tabName === null) ? cellRange : `'${tabName}'!${cellRange}`),
				apiEndpoint  = 'https://sheets.googleapis.com/v4/spreadsheets/',
				apiArguments = `${sheetID}/values/${requestRange}?key=${API_KEY}`,
				apiRequest	 = (apiEndpoint + apiArguments),
				fetchedData  = await fetch(apiRequest);

	return fetchedData.json();
}

const processSheetEntries = (queryResult,objectName) => {
	const data   = queryResult.data;

	if(queryResult.isLoading) {
		// Hold tight, important data is loading.
	}

	if(queryResult.isError) {
		// Error fetching data.
	}

	if(queryResult.isSuccess) {
		if(globalState.hasOwnProperty(objectName)) {
			globalState[objectName] = data.values;
		}
	}
}

const SheetData = () => {
	// I will have to live with it till React allows to use hooks in loops.

	processSheetEntries(useQuery(FETCH_POINTS.masterList,getSheetValues)   ,'masterList');
	processSheetEntries(useQuery(FETCH_POINTS.doNotPingList,getSheetValues),'doNotPingList');
	processSheetEntries(useQuery(FETCH_POINTS.rulesData,getSheetValues)    ,'rulesData');
	processSheetEntries(useQuery(FETCH_POINTS.keywordsData,getSheetValues) ,'keywordsData');
	processSheetEntries(useQuery(FETCH_POINTS.breedsData,getSheetValues)   ,'breedsData');
	processSheetEntries(useQuery(FETCH_POINTS.siteStatus,getSheetValues)   ,'siteStatus');
	processSheetEntries(useQuery(FETCH_POINTS.dynamicFields,getSheetValues)   ,'dynamicFields');

	return <></>;
}

export default SheetData;
