//Ajoute les tooltips, lien vers genome browser
export function addTooltip(annotTable){

	console.log("add tooltip");
	//compteur pour retrouver les infos de coordonées du bloc
	let blocCount = 0;

	//parcourir chaque .range de .range-set = chaque bloc svg
	//si transparent => supprimer le bloc
	//sinon copier le bloc et append to range-set.parent dans une nouvelle balise g
	$(".range").each(function(index ){
		
		if ($(this).attr('style') == 'fill: transparent;'){
			//console.log("remove");
			$(this).remove();

		}else{

			//retreive annotations of the current bloc
			//annotTable = fichier accession
			let annotBloc = annotTable[blocCount];

			// console.log(annotBloc);
			// console.log($(this));
			// console.log("---------------------");

			const annotElements = annotBloc.split(' ');
			
			let chr = annotElements[0];
			let start = annotElements[2];
			let stop = annotElements[3];
			// console.log(chr + ' ' + start+ ' '+stop);

			let rangeset = $(this).parent();
			let chromosome = rangeset.parent();

			//retrieve chromosome position
			//let clippath = chromosome.attr('clip-path');
			//const regexp = /(chr\d+)/.exec(clippath);

			//set the url to the retrieved chromosome
			let url = 'Go to Banana Jbrowse\<br/\>\<a href=\"https://banana-genome-hub.southgreen.fr/content/m-acuminata-dh-pahang-version-2/?loc=chr'+chr+':'+start+'..'+stop+'\"\>Chr'+chr+' '+start+'..'+stop+'\<\/a\>'
			let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			g.setAttributeNS(null, 'class', 'bloc-annot');

			//set the tooltip content, link to genome browser
			g.setAttribute('title', url);
			chromosome.append(g);

			let annot = $(this)[0].cloneNode(true);
			annot.setAttribute('style', 'fill: transparent');
			g.append(annot);
			blocCount++;
			//console.log(blocCount);
			
		}
	});
	//tooltipster activation
    $('.bloc-annot').tooltipster({
		theme: 'tooltipster-punk',
		contentAsHTML: true,
		//content: $('#tooltip_content'),
		interactive: true,
		contentCloning: true,
		delay: 100
	});
	

}

//Ajoute les tooltips des ? help
export function addHelpTooltips() {
	
	//preloaded help
	$(".bi-question-circle.preloaded").each(function(index ){

		this.setAttribute('class', 'bloc-help');
		//set the tooltip content, link to genome browser
		this.setAttribute('data-tooltip-content', "#tooltip_preloaded");
	});

	//your data help
	$(".bi-question-circle.yourdata").each(function(index ){

		this.setAttribute('class', 'bloc-help');
		//set the tooltip content, link to genome browser
		this.setAttribute('data-tooltip-content', "#tooltip_your_data");
	});	

	//chromosomes help
	$(".bi-question-circle.chrom").each(function(index ){

		this.setAttribute('class', 'bloc-help');
		//set the tooltip content, link to genome browser
		this.setAttribute('data-tooltip-content', "#tooltip_help");
	});
	
	//input file help
	$(".bi-question-circle.input").each(function(index ){

		this.setAttribute('class', 'bloc-help');
		//set the tooltip content, link to genome browser
		this.setAttribute('data-tooltip-content', "#tooltip_input");
	});

	//color help
	$(".bi-question-circle.colors").each(function(index ){

		this.setAttribute('class', 'bloc-help');
		//set the tooltip content, link to genome browser
		this.setAttribute('data-tooltip-content', "#tooltip_colors");
	});

	//tooltipster activation
	$('.bloc-help').tooltipster({
		theme: 'tooltipster-noir',
		contentAsHTML: true,
		trigger: 'click',
		interactive: true,
		contentCloning: true,
		delay: 100
	});
}
	
