////////////////////////////////////////////////////////////////
//parsing du formulaire chromosome
////////////////////////////////////////////////////////////////
export function chromosomeParser(data){
	console.log("parse chromosome");
	let chrBands=[];
	
	//split le fichier par ligne de chromosome
	const split = data.split("\n");
	let localsplit  = "";
	let localchr="";
	let ploidyDesc = [];
	//nombre de chromosomes
	//config.ploidysize = split.length;

	
	//pour chaque chromosome
	for (let i = 0; i < split.length; i++) {
		localsplit = split[i].split(" ");
    	//LocalSplit[0] = chromosome choisi, localsplit[1] = longeur du chromosome
    	localchr = localsplit[0]+" p 1 0 "+(localsplit[1]/2)+" 0 "+(localsplit[1]/2);
		//lgtChro.push(localsplit[1]);
    	chrBands.push(localchr);
    	localchr = localsplit[0]+" p 1 0 "+(localsplit[1]/2)+" "+(localsplit[1]/2)+" "+localsplit[1];
    	chrBands.push(localchr);
		let ploidyA = localsplit[2];
		
		ploidyDesc.push(ploidyA);
    }
	return [ploidyDesc, split.length];
}


////////////////////////////////////////////////////////////////
//parsing du formulaire data avec les annotations
////////////////////////////////////////////////////////////////
export function annotationParser(data, configPloidy){
	console.log("parse annot");
	let annotTable = data.split("\n");
	//console.log(annotTable);
	let colonne  = "";
	//var data = "";
	//let localannot="";
	let ploidy=[];
	let count =0;

	let rangeSet = [];
	
	//pour chaque ligne d'annot
	for (let i = 0; i < annotTable.length; i++) {
		ploidy = [];
		colonne = annotTable[i].split(" ");
		count++;
		
		//Boucle qui sert a définir la position de l'annotation
		for(let n = 0; n< configPloidy; n++){
			//console.log(n + " " + parseInt(colonne[1]));
			if(n == parseInt(colonne[1])){
				//console.log("egal");
				ploidy.push(1);
			}else {
				ploidy.push(0);
				//console.log("pas egal");
			}	
		}
		//console.log(ploidy);
		
		let chromosome = {
			chr: colonne[0],
			ploidy: ploidy,
			start: colonne[2],
			stop: colonne[3],
			color: colonne[4]
			//color: config.anotcolor[localsplit[4]]
		};
		
		rangeSet.push(chromosome);
	
	}
	return [rangeSet, annotTable];
}