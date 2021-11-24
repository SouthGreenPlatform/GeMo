//Ajoute les tooltips, lien vers genome browser
export function addTooltip(annotTable, gblink){

	//console.log(annotTable);

	//console.log("add tooltip "+gblink);

	let ploidy = $("#selectorploidy").val();
	console.log(ploidy);

	//Appel au serveur
    // genère un gff à envoyer au genome browser
	//let annot = $("#editorAnnot").val();
	let color = $("#editorColor").val();
    socket.emit('gff', annotTable, color, ploidy, function(err, addTrack){
        if(err){
            console.log(err);
        }else{

			//.log(addTrack);
			addTrack = encodeURI(addTrack);
			//console.log(addTrack);
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
					//+1 pour ne pas tenir compte de l'en-tête des annots
					let annotBloc = annotTable[blocCount+1];
					//console.log(annotBloc);
					const annotElements = annotBloc.split(/[ \t]+/);
					
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
					let url = 'Go to genome browser\<br/\>\<a target=\"_blank\" href=\"'+gblink+'?loc=chr'+chr+':'+start+'..'+stop+'&'+addTrack+'\"\>Chr'+chr+' '+start+'..'+stop+'\<\/a\>';

					
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
    });


	
	

}

//Ajoute les tooltips des ? help
export function addHelpTooltips() {

	//bloc or curve help
	$(".bi-question-circle.blocOrCurve").each(function(index ){

		this.setAttribute('class', 'bloc-help');
		//set the tooltip content, link to genome browser
		this.setAttribute('data-tooltip-content', "#tooltip_blocOrCurve");
	});

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

	//bed annotations help
	$(".bi-question-circle.bed").each(function(index ){

		this.setAttribute('class', 'bloc-help');
		//set the tooltip content, link to genome browser
		this.setAttribute('data-tooltip-content', "#tooltip_bed");
	});

	//tooltipster activation
	$('.bloc-help').tooltipster({
		theme: 'tooltipster-noir',
		contentAsHTML: true,
		trigger: 'click',
		position: 'right',
		interactive: true,
		contentCloning: true,
		delay: 100
	});
}
	
