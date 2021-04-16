export function initConfig(){
	console.log("init config");
	let config = { 
		organism: "banana",
		//repertoire vers les données de chromosome bands
		dataDir: 'http://dev.visusnp.southgreen.fr/gemo/data/',
		
		container: '.ideo_container',
		
		orientation: "horizontal",
		rotatable: false,
		//ploidy: 2, 
		ploidysize: 11,
		
		annotationsLayout: 'overlay',
		annotations: [{
		name: 'test',
		chr: '1',
		start: 3000,
		stop: 10000,
		color: '#00000000' //couleur transparente pour les annots
	  }],
		anotcolor: ["#CBCBCB", "#FF0000","#0066FF","#088A08","#F7FF00","#F7FF00","FFA200","9100FF","000000","#F08080"],
	
		chrMargin: 0,
		chrHeight: 600,
		chrWidth: 10,
		
		ancestors: {
			"A": "#dea673",
			"B": "#7396be",
			"C": "#272727",
			"D": "#437343",
			"E": "#737373",
			"F": "#487646",
			"H": "#D3H4A2"
		},
		ploidyDesc: [],
		rangeSet: []
	};
	return config;
}