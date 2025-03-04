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
	return [ploidyDesc, split.length, chrBands];
}

////////////////////////////////////////////////////////////////
//parsing de la ploidy 
// data = fichier chr nouveau format
// chr	len	centromereInf	centromereSup	label
// return ploidydesc = [AB, AB, etc...]
// return ploidydesc.length = nb de chromosomes
// return maxLength = taille du chr le plus long
////////////////////////////////////////////////////////////////
export function ploidyDesc(data){
	console.log("parse ploidy");
	
	//split le fichier par ligne de chromosome
	const split = data.split("\n");
	let localsplit  = "";
	let ploidyDesc = [];
	let maxLength=0;

	//pour chaque chromosome
	//sauf première ligne de titre
	//sauf lignes vides
	for (let i = 1; i < split.length; i++) {
		if (split[i] !== ''){
			localsplit = split[i].split("\t");
			let ploidyA = localsplit[4];
			ploidyDesc.push(ploidyA);

			//return max length
			if (localsplit[1] > maxLength){
				maxLength = localsplit[1];
			}
		}
    }
	return [ploidyDesc, ploidyDesc.length, maxLength];
}

////////////////////////////////////////////////////////////////
//Compte le max de la ploidy sur tout les chromosomes
////////////////////////////////////////////////////////////////
export function ploidyCount(data){
	console.log("cloidy count");
	let annotTable = data.split("\n");
	let maxPloidy =0;
	//Calcul la ploidy max
	for (let i = 0; i < annotTable.length; i++) {
	
		//skip les lignes vides ou l'en- tête
		//if (annotTable[i] == "" || annotTable[i].startsWith('chr')){
		const regex = /haplotype/g;
		if (annotTable[i] == "" || annotTable[i].match(regex)){
			console.log("skip en tête");
			continue;
		}	
		//split les espaces ou les tabulations
		let colonne = annotTable[i].split(/[ \t]+/);
		if(colonne[1]>maxPloidy){
			maxPloidy = colonne[1];
		}
	}
	console.log("max : "+maxPloidy);
	return maxPloidy;
}

////////////////////////////////////////////////////////////////
//Compte le max de la ploidy sur tout les chromosomes
////////////////////////////////////////////////////////////////
export function ploidyDescFromData(data){
	console.log("ploidy desc from data");

	let ploidyDesc = [];
    let chrStr = [];
	let currentChr;
	let annotTable = data.split("\n");
	let lastMaxPloidy =0;
	let maxPloidy =0;
	let first = true;

	//parcours toutes les lignes
	for (let i = 0; i < annotTable.length; i++) {
		//skip les lignes vides ou l'en- tête
		//if (annotTable[i] == "" || annotTable[i].startsWith('chr')){
		const regex = /haplotype/g;
		if (annotTable[i] == "" || annotTable[i].match(regex)){
			console.log("skip en tête");
			continue;
		}

		//split les espaces ou les tabulations
		let colonne = annotTable[i].split(/[ \t]+/);
		if(first){ 
			currentChr = colonne[0];
			first = false;
		}
		let chr = colonne[0];
		let ploidy = colonne[1];
		
		if(chr == currentChr){
			if(ploidy > maxPloidy){
				maxPloidy = ploidy;
			}
		}else{
			//une fois qu'on a le max ploidy pour le chromosome courrant
			for (let i = 0; i < parseInt(maxPloidy) + 1; i++) {
				chrStr.push(i+1);
			}	
			ploidyDesc.push(chrStr.join(""));
			//on change de chromosomes
			currentChr = chr;
			chrStr = [];
			lastMaxPloidy = maxPloidy;
			maxPloidy = 0;
		}
	}
	//process le dernier chromosome avec lastMaxPloidy
	for (let i = 0; i < parseInt(lastMaxPloidy) + 1; i++) {
		chrStr.push(i+1);
	}	
	ploidyDesc.push(chrStr.join(""));

	//console.log(ploidyDesc)
    return ploidyDesc;
}

////////////////////////////////////////////////////////////////
//parsing du formulaire data avec les annotations
////////////////////////////////////////////////////////////////
export function annotationParser(data, configPloidy, ancestorsNameColor, chrDict){
	console.log("parse annot");
	let annotTable = data.split("\n");
	//console.log(annotTable);
	let colonne  = "";
	//var data = "";
	//let localannot="";
	let ploidy=[];
	let count =0;

	let rangeSet = [];

	let maxPloidy = ploidyCount(data);
	
	//pour chaque ligne d'annot
	for (let i = 0; i < annotTable.length; i++) {
		ploidy = [];

		//skip les lignes vides ou l'en- tête
		//if (annotTable[i] == "" || annotTable[i].startsWith('chr')){
		const regex = /haplotype/g;
		if (annotTable[i] == "" || annotTable[i].match(regex)){
			console.log("skip en tête");
			continue;
		}


		//split les espaces ou les tabulations
		colonne = annotTable[i].split(/[ \t]+/);
		count++;

		//Boucle qui sert a définir la position de l'annotation
		//exemple : [0,1] = en deuxieme haplotype
 		//for(let n = 0; n< configPloidy; n++){
		for(let n = 0; n< parseInt(maxPloidy)+1; n++){
		    //console.log(n + " " + parseInt(colonne[1]));
			if(n == parseInt(colonne[1])){
				ploidy.push(1);
			}else {
				ploidy.push(0);
			}	
		}  
		//console.log(ploidy);
		let chrid = chrDict[colonne[0]];
		if(!chrid){
			chrid = colonne[0];
		}

		//console.log(chrid);

		let chromosome = {
			chr: chrid,
			ploidy: ploidy,
			start: colonne[2],
			stop: colonne[3],
			color: ancestorsNameColor[colonne[4]][1],
			//color: config.anotcolor[localsplit[4]]
		};
		
		rangeSet.push(chromosome);
	
	}
	return [rangeSet, annotTable];
}



////////////////////////////////////////////////////////////////
//parsing fichier chromosome TSV
//Genère les bands pour chaque chromosome
////////////////////////////////////////////////////////////////
//variable

function chromosomeTsvParser(data, conf){
	//console.log("parse chromosome");
    let chrBands=[];

	//split le fichier par ligne de chromosome
	const split = data.split("\n");
	let columns  = "";

	//nombre de chromosomes
    conf.ploidysize = split.length-1;
    
    //max length
    let max_chr_length =0;
	for (let i = 1; i < split.length; i++) {
        columns = split[i].split("\t");
        bp_stop = parseInt(columns[3]);
        if(bp_stop > max_chr_length){
            max_chr_length = bp_stop;
        }
    }
	
	//pour chaque chromosome
	for (let i = 1; i < split.length; i++) {
        
        //LocalSplit[0] = chromosome choisi, localsplit[1] = longeur du chromosome
        //#chromosome	arm	bp_start	bp_stop
        //1	p	0	16700000
        //1	q	16700000	43270923
        columns = split[i].split("\t");

        chr = columns[0];
        arm = columns[1];
        band = '1';
        bp_start = parseInt(columns[2]);
        bp_stop = parseInt(columns[3]);
        
		//ajouter condition sur arm = p ou q
		//si p => on ajoute une band gpos50 puis une band acen
		//si q => on ajoute une band acen puis une band gpos50
		if(arm == 'p'){
			//position des bands gpos et acen sur le bras p
			gposStar = bp_start;
			gposStop = (bp_stop - bp_stop/10);
			acenStart = (bp_stop - bp_stop/10);
			acenStop = bp_stop;
			//push les positions dans la config ideogram
			gposBand = chr+" "+arm+" "+band+" "+gposStar+" "+gposStop+" "+gposStar+" "+gposStop+" gpos50";
			acenBand = chr+" "+arm+" "+band+" "+acenStart+" "+acenStop+" "+acenStart+" "+acenStop+" acen";
			chrBands.push(gposBand);
			chrBands.push(acenBand);
		}else{
			//position des bands acen et gpos sur le bras q
			acenStart = bp_start;
			acenStop = (bp_start + bp_start/10);
			gposStar = (bp_start + bp_start/10);
			gposStop = bp_stop;
			//push les positions dans la config ideogram
			acenBand = chr+" "+arm+" "+band+" "+acenStart+" "+acenStop+" "+acenStart+" "+acenStop+" acen";
			gposBand = chr+" "+arm+" "+band+" "+gposStar+" "+gposStop+" "+gposStar+" "+gposStop+" gpos50";
			chrBands.push(acenBand);
			chrBands.push(gposBand);
		}
	}
	//console.log(chrBands);
}

export function bedParser(bed, chrDict){
	//from:
	//chr01	5287838	5289224	gene	0	-
	//to:
	//[{
    //    name: 'BRCA1',
    //    chr: '17',
    //    start: 43044294,
    //    stop: 43125482
    //  }]

	let bedArray = [];

	//split le fichier par ligne
	const split = bed.split("\n");
	
	for (let i = 0; i < split.length; i++) {
        let line = split[i].split("\t");
		let currentAnnot;

		let chrid = chrDict[line[0]];
		if(!chrid){
			chrid = parseInt(line[0]);
		}
		if(line != ''){	
			currentAnnot = {
				name: String(line[3]),
				//chr: String(line[0].replace("chr0","").replace("chr","")),
				chr: chrid,
				start: parseInt(line[1]),
				stop: parseInt(line[2]),
				trackIndex: 2
			};
			bedArray.push(currentAnnot);
		}
		
	}

	//console.log(bedArray);
	return bedArray;
}