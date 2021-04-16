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