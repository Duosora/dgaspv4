(this["webpackJsonpgasp-v4"]=this["webpackJsonpgasp-v4"]||[]).push([[0],{16:function(e,t,a){e.exports=a(27)},21:function(e,t,a){},23:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(14),r=a.n(s),i=(a(21),a(22),a(6)),c=a(10),o=a(9),u=a(8),h=a(7),m=a(29),d=a(30),g=a(31),p=a(33),E=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"GASP"),l.a.createElement("h2",null,"Optimized for Sheets v4 by Duosora"))}}]),a}(l.a.Component),f=(l.a.Component,l.a.Component,l.a.Component,a(28)),v=a(32),y=a(34),S=(a(23),function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).updatePinglist=function(){return fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat("1eX0iu8pFksHIqu66dFc3HjsGwLg6c8ZZ9Q-67MuAQPk","/values/").concat("'master list'!A2:E","?key=").concat("AIzaSyDGLVvBm5uNAMlLEV1q-h9Gpu1misQg6I8"))},n.generatePinglist=function(){n.updatePinglist().then((function(e){return e.json()})).then((function(e){var t=e.values,a=[],l=n.props.keywords.slice(1),s=n.state;console.log(s.reselling),t.forEach((function(e,t){var n=e[1].split(", "),r=e[2].split(", "),i=e[3].split(", "),c=null,o=[];if(e.length>4&&(c=e[4].split(", ")),s.reselling)if(null===c);else if(c.indexOf("resell")<0)return;s.keywordsChecked.forEach((function(e){(null===c||c.indexOf(l[e])<0)&&o.push(l[e])})),n.indexOf(s.selectedBreed)<0||r.indexOf(s.sasSelected)<0||(i.indexOf("no preference")<0?o.some((function(e){return i.indexOf(e)>=0}))&&a.push(e[0]):a.push(e[0]))})),a.length>0?n.setState({currentPinglist:"@"+a.join(" @")}):n.setState({currentPinglist:"No users to ping, please change your criteria or come back later!"})})).catch()},n.onKeywordClick=function(e){var t=n.state.keywordsChecked.indexOf(e),a=Array.from(n.state.keywordsChecked);t<0?a.push(e):a.splice(t,1),n.setState({keywordsChecked:Array.from(a)}),n.setState({isKeywordSelected:Array.from(a).length},(function(){n.checkForButtonActivation()}))},n.state={keywordsChecked:[],isBreedSelected:!1,isSasSelected:!1,isResellSelected:!1,isKeywordSelected:0,selectedBreed:"",sasSelected:"",isReselling:!1,disableGen:!0,currentPinglist:""},n.onBreedChange=n.onBreedChange.bind(Object(c.a)(n)),n.onSasChange=n.onSasChange.bind(Object(c.a)(n)),n.onResellChange=n.onResellChange.bind(Object(c.a)(n)),n}return Object(o.a)(a,[{key:"onBreedChange",value:function(e){var t=this;this.setState({selectedBreed:e.target.value}),this.setState({isBreedSelected:!0},(function(){t.checkForButtonActivation()}))}},{key:"onSasChange",value:function(e){var t=this;this.setState({sasSelected:e.target.value}),this.setState({isSasSelected:!0},(function(){t.checkForButtonActivation()}))}},{key:"onResellChange",value:function(e){var t=this;1==e.target.value?this.setState({reselling:!0}):2==e.target.value&&this.setState({reselling:!1}),this.setState({isResellSelected:!0},(function(){t.checkForButtonActivation()}))}},{key:"checkForButtonActivation",value:function(){this.setState({disableGen:!(this.state.isBreedSelected&&this.state.isSasSelected&&this.state.isResellSelected&&this.state.keywordsChecked.length>0)})}},{key:"render",value:function(){var e=this;return l.a.createElement(f.a,null,l.a.createElement("em",null,this.props.translation.gasperror),l.a.createElement(m.a,null,l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement(v.a,null,l.a.createElement(p.a,{type:"select",defaultValue:"0",name:"breedGenderSelect",id:"breedGenderSelect",onChange:this.onBreedChange},l.a.createElement("option",{disabled:!0,value:"0"},this.props.translation.gaspbg),this.props.breedlist.slice(1).map((function(e,t){return l.a.createElement("option",{key:t,value:e},e)}))))),l.a.createElement(g.a,null,l.a.createElement(v.a,null,l.a.createElement(p.a,{type:"select",defaultValue:"0",name:"typeSelect",id:"typeSelect",onChange:this.onSasChange},l.a.createElement("option",{value:"0",disabled:!0},this.props.translation.gaspt),l.a.createElement("option",{value:"Accents"},"Accents"),l.a.createElement("option",{value:"Skins"},"Skins"),l.a.createElement("option",{value:"Skincents"},"Skincents")))),l.a.createElement(g.a,null,l.a.createElement(v.a,null,l.a.createElement(p.a,{type:"select",defaultValue:"0",name:"typeSelect",id:"typeSelect",onChange:this.onResellChange},l.a.createElement("option",{value:"0",disabled:!0},this.props.translation.resell),l.a.createElement("option",{value:"1"},"Yes"),l.a.createElement("option",{value:"2"},"No"))))),l.a.createElement("h4",null,this.props.keywords[0],":"),l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement("div",{className:"keywordContainer"},this.props.keywords.slice(1).map((function(t,a){return l.a.createElement(y.a,{outline:!0,onClick:function(){return e.onKeywordClick(a)},active:e.state.keywordsChecked.includes(a),color:"info"},t)}))))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement(y.a,{disabled:this.state.disableGen,color:"warning",onClick:function(){return e.generatePinglist()},size:"lg"},"Generate Pinglist")," ")),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement("em",null,"By copying this pinglist, you are aware that this pinglist is generated based on your needs. Before copying the pinglist, triple check the fields, and correct any mistakes you might have made in the process to avoid mispings. Thank you for understanding!"))),l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement(v.a,null,l.a.createElement(p.a,{type:"textarea",name:"text",id:"exampleText",value:this.state.currentPinglist}))))))}}]),a}(l.a.Component)),k=(a(26),"1eX0iu8pFksHIqu66dFc3HjsGwLg6c8ZZ9Q-67MuAQPk"),b=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={breedList:{},keywordList:{},rulesList:{},langList:[],currentTranslation:0},n.getSheetValues=function(e,t,a){var n=a;return null!==t&&(n="'"+t+"'!"+n),fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat(e,"/values/").concat(n,"?key=").concat("AIzaSyDGLVvBm5uNAMlLEV1q-h9Gpu1misQg6I8"))},n.onLanguageChange=n.onLanguageChange.bind(Object(c.a)(n)),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.getSheetValues(k,"Breed","A1:A").then((function(e){return e.json()})).then((function(t){var a=t.values,n=[];a.forEach((function(e){n.push(e[0])})),e.setState({breedList:n})})).catch(),this.getSheetValues(k,"Keywords","A1:A").then((function(e){return e.json()})).then((function(t){var a=t.values,n=[];a.forEach((function(e){n.push(e[0])})),e.setState({keywordList:n})})).catch(),this.getSheetValues("1q68G1xsNyUGeZhkHFDqHyuzQKYuCw4BXFaSbmooX-PU","Translations","A1:X").then((function(e){return e.json()})).then((function(t){var a=[],n=[];t.values.forEach((function(e,t){for(var l=1;l<e.length;l++)!1===Array.isArray(a[l-1])&&(a[l-1]=[]),a[l-1][e[0]]=e[l],"native"==e[0]&&n.push(e[l])})),console.log(n),e.setState({rulesList:a}),e.setState({langList:n})})).catch()}}]),Object(o.a)(a,[{key:"onLanguageChange",value:function(e){this.setState({currentTranslation:e.target.value})}},{key:"render",value:function(){var e=0!==Object.entries(this.state.breedList).length,t=0!==Object.entries(this.state.keywordList).length,a=0!==Object.entries(this.state.rulesList).length,n=0!==Object.entries(this.state.langList).length;return e&&t&&a&&n?l.a.createElement("div",{className:"App"},l.a.createElement(m.a,{fluid:!0,className:"HeaderRow"},l.a.createElement(d.a,null,l.a.createElement(g.a,null,l.a.createElement(E,null))),l.a.createElement(d.a,null,l.a.createElement(g.a,{sm:"12",md:{size:6,offset:3}},l.a.createElement(p.a,{type:"select",defaultValue:"0",name:"languageSelect",id:"languageSelect",onChange:this.onLanguageChange},this.state.langList.map((function(e,t){return l.a.createElement("option",{key:t,value:t},e)})))))),l.a.createElement(m.a,{fluid:!0},l.a.createElement(d.a,null,l.a.createElement(g.a,{className:"RulesCol"},l.a.createElement("h3",null,this.state.rulesList[this.state.currentTranslation].rules),l.a.createElement("p",null,this.state.rulesList[this.state.currentTranslation].gasprulenote),l.a.createElement("p",null,l.a.createElement("a",{target:"_blank",href:"http://www1.flightrising.com/forums/skin/2480522"},this.state.rulesList[this.state.currentTranslation].gaspthread)),l.a.createElement("p",null,l.a.createElement("a",{target:"_blank",href:"http://www1.flightrising.com/forums/skin/2332244"},this.state.rulesList[this.state.currentTranslation].gaspqueue)),l.a.createElement("p",null,l.a.createElement("a",{target:"_blank",href:"http://www.tracemyip.org/tools/remove-duplicate-words-in-text/"},this.state.rulesList[this.state.currentTranslation].duplicateremover)),l.a.createElement("ul",null,l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule1}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule2}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule3}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule4}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule5}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule6}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule7}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule8}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule9}}),l.a.createElement("br",null),l.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.state.rulesList[this.state.currentTranslation].gasprule10}}),l.a.createElement("br",null))),l.a.createElement(g.a,{className:"PinglistCol"},l.a.createElement("h3",null,"Pings"),l.a.createElement(S,{breedlist:this.state.breedList,keywords:this.state.keywordList,translation:this.state.rulesList[this.state.currentTranslation]}))))):l.a.createElement("span",null,"Loading . . .")}}]),a}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.1f43f1d3.chunk.js.map