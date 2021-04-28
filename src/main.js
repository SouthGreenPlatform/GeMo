import { initConfig } from "./config.js";
import { chromosomeParser, annotationParser } from "./dataParser.js";
import { loadingon, loadingoff, displaytext, clear } from "./display.js";

////////////
let ploidyA ="";
//////////

let lgtChro =[]; //longueur des chromosomes
//let chrBands = [];
let config;
let annotTable=[]; // annot file splited by line


////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////

async function load_accession(acc){
	console.log("load accession");
	clear();
	//console.log(new Error().stack);
	
	//affiche le loader
	document.getElementById("loader").style.display = "block";
	
	config = initConfig();
	//load le fichier mosaique dans le formulaire
/* 	fetch('http://dev.visusnp.southgreen.fr/gemo/data/accessions/ideo_'+acc+'.txt')
		.then( response => response.text() )
		  .then( responseText => $("#editorAnnot").text(responseText)); */

	
	let response = await fetch('http://dev.visusnp.southgreen.fr/gemo/data/accessions/ideo_'+acc+'.txt');
	let responseText = await response.text();
	await $("#editorAnnot").val(responseText);
	//console.log(responseText);

	//load le fichier chromosome dans le formulaire
	if(acc==="GrandeNaine"){
		config.ploidy = 3;
		$('#selectorploidy').val('3');

		config.dataDir = 'http://dev.visusnp.southgreen.fr/gemo/data/';
		response = await fetch('http://dev.visusnp.southgreen.fr/gemo/data/chromosomes/banana_chr_triploide.txt');
		responseText = await response.text();
		await $("#editorChr").val(responseText);
		
		
	}else if(acc==="Visuchromp"){
		config.ploidy = 2;
		$('#selectorploidy').val('2');

		config.dataDir = 'http://dev.visusnp.southgreen.fr/gemo/data/visuchromp/';
		response = await fetch('http://dev.visusnp.southgreen.fr/gemo/data/chromosomes/banana_chr_visuchromp.txt');
		responseText = await response.text();
		await $("#editorChr").val(responseText);
	}
	else{
		config.ploidy = 2;
		$('#selectorploidy').val('2');
		config.dataDir = 'http://dev.visusnp.southgreen.fr/gemo/data/';
		response = await fetch('http://dev.visusnp.southgreen.fr/gemo/data/chromosomes/banana_chr.txt');
		responseText = await response.text();
		await $("#editorChr").val(responseText);
		
	}
	load_ideogram();

	setTimeout(addTooltip,100);

	//addTooltip();
	
	//draw
	//loadingon();
	
}

////////////////////////////////////////////////////////////////
// Event show letters
////////////////////////////////////////////////////////////////
$('#SwitchLetters').change( function(){
	displaytext();
});

////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////
function load_ideogram(){
	//clear();
	//values in chromosome form
	console.log("load ideogram");
	//console.log(config);
	const chrdata = $("#editorChr").val();
	//values in data form
	const annotdata = $("#editorAnnot").val();
	config.ploidyDesc = [];
	//colorchange();
	config.ploidy = Number($('#selectorploidy').val());
	//parse les données chromosomes
	let chrDataParsed = chromosomeParser(chrdata);
	config.ploidyDesc = chrDataParsed[0];
	config.ploidysize = chrDataParsed[1];
	
	//parse les données blocs
	let annotDataParsed = annotationParser(annotdata, config.ploidy);
	config.rangeSet = annotDataParsed[0];
	annotTable = annotDataParsed[1];
	
	//Crée le graph
	if(chrdata != ""){
		//console.log(config);
		const ideogram = new Ideogram(config);

	}
	//apparition du bouton download
	$('#download').fadeIn()
	//repositione();
	$('#potatosalad').on('click', function(event){
    //The event won't be propagated to the document NODE and 
    // therefore events delegated to document won't be fired
   //event.stopPropagation();
	});
}

//Ajoute les tooltips, lien vers genome browser
function addTooltip(){

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

			//console.log(annotBloc);
			//console.log($(this));
			//console.log("---------------------");

			const annotElements = annotBloc.split(' ');
			
			let chr = annotElements[0];
			let start = annotElements[2];
			let stop = annotElements[3];
			//console.log(chr + ' ' + start+ ' '+stop);

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
	
	loadingoff();
}

////////////////////////////////////////////////////////////////
// Fonction qui recalcul le schéma à partir des données dans les cadres
////////////////////////////////////////////////////////////////
document.getElementById("reload").addEventListener("click", function(e) {
	console.log("update");
	clear();
	config = initConfig();
	loadingon();
	load_ideogram();
	//repositione();
	setTimeout(addTooltip, 100); //addTooltip();
	
});

////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////
function load_file(){
	console.log("chr to form");
	$("#editorChr").text("");
	//$("#fileInputC").show();
	const fileInputC = document.getElementById('fileInputC');
	//fileInputC.addEventListener('change', function(e) {
		const file = fileInputC.files[0];
		const reader = new FileReader();
		reader.onload = function(e) {

			const lines = reader.result.split('\n');
			if (lines[lines.length - 1] ==""){
				let texte = "";
				for(let i = 0; i < lines.length -1; i++){
					if (i < lines.length -2){
						texte = texte + lines[i];
						texte = texte + '\n';
					}
					else{
						texte = texte + lines[i];
					}
				}
				$("#editorChr").text(texte);
			}
			else{
				$("#editorChr").text(reader.result);
			}	
		};
		reader.readAsText(file);  
}

function load_file2(){
	console.log("annot to form");
	$("#fileInputD").show();
	const fileInputD = document.getElementById('fileInputD');
	//fileInputD.addEventListener('change', function(e) {
		const file = fileInputD.files[0];
		const reader = new FileReader();
		reader.onload = function(e) {

			//$("#editorAnnot").text(reader.result);

			const lines = reader.result.split('\n');
			if (lines[lines.length - 1] ==""){
				let texte = "";
				for(let i = 0; i < lines.length -1; i++){
					if (i < lines.length -2){
						texte = texte + lines[i];
						texte = texte + '\n';
					}
					else{
						texte = texte + lines[i];
					}
				}
				$("#editorAnnot").text(texte);
			}
			else{
				$("#editorAnnot").text(reader.result);
			}	
			//$("#fileInputD").hide();
		};
		reader.readAsText(file); 
	//});   
}


/* function repositione(){
	console.log("repositione");
	setTimeout(function(){
		const ideo = document.getElementById("_ideogram");
		//var tideo = document.getElementById("targetideo");
		//tideo.appendChild(ideo);
	}, 50);
} */







function colorchange(){
	for(let key in config.ancestors){
		if($("#selectorpreset :selected").val() == "preset1"){
			config.ancestors[key] = preset1[key];
		}else if ($("#selectorpreset :selected").val() == "preset2"){
			config.ancestors[key] = preset2[key];
		}else{
			config.ancestors[key] = preset3[key];
		}  
	}
	if($("#selectorpreset :selected").val() == "preset1"){
		for(let i = 0; i<config.rangeSet.length; i++){
			config.rangeSet[i].color = preset1.ploidy;
		}
	}else if ($("#selectorpreset :selected").val() == "preset2"){
		for(let i = 0; i<config.rangeSet.length; i++){
			config.rangeSet[i].color = preset2.ploidy;
		}
	}else{
		for(let i = 0; i<config.rangeSet.length; i++){
			config.rangeSet[i].color = preset3.ploidy;
		}
	} 
	//load_ideogram();
}





///////////////////////////////////////////////////
//Création de l'echelle du graph
//////////////////////////////////////////////////
function echelle(){
	//console.log(lgtChro);
    //var maxlgt = Math.max.apply(null,lgtChro); 
	let maxlgt = 0;
	for(let i = 0; i<ultimateCount; i++){
		if(maxlgt <= ultimateWidth[i]){
			maxlgt = ultimateWidth[i];
		}
	}

    const width = maxlgt,
        height = 50;

    const data = lgtChro;
    const maxlgtpb = Math.max.apply(null,lgtChro); 

    // Append SVG 
    const svg = d3.select("body")
                .append("svg")
		.attr("id", "scale")
                .attr("width", width)
                .attr("height", height)
		.attr("transform", 'translate(60,10)');

    // Create scale
    const scale = d3.scaleLinear()
                  .domain([0, d3.max(data)])
                  .range([0, width]);

    // Add scales to axis
    const x_axis = d3.axisBottom()
                   .scale(scale)
		   .ticks(5);

    //Append group and insert axis
    svg.append("g")
       .call(x_axis);
}

///////////////////////////////////////////////
// MENU
///////////////////////////////////////////////

/////////////////////////////
///// BOUTON ACCESSION /////
/////////////////////////////
document.getElementById("accession").addEventListener("click", function(e) {
	//affiche la page
	$('#chrompaint').hide();
	$('#page-content-wrapper').show();
	
});

/////////////////////////////
///// BOUTON CHROMPAINT /////
/////////////////////////////
document.getElementById("chrompaint_button").addEventListener("click", function(e) {
	//affiche la page
	$('#chrompaint').show();
	$('#page-content-wrapper').hide();
	
});

//////////////////////////////////////////////////////
// Populate preloaded list of organisms and samples //
//////////////////////////////////////////////////////
//ref https://www.encodedna.com/jquery/cascading-select-dropdown-list-using-json-data.htm
//tab of preloaded example
let arrData = [];
    
// Fill the first dropdown with data.
$.getJSON('./config/pre-loaded.json', function (data) {

	//tab of organisms
    let organismTab = [];

	//retrieve organism in each json entry
    $.each(data, function (index, value) {
        organismTab.push(value.Organism);
        arrData = data;
    });

    // Remove duplicates. We want unique bird types.
    organismTab = Array.from(new Set (organismTab));
    // ref (https://www.encodedna.com/javascript/remove-duplicates-in-javascript-array-using-es6-set-and-from.htm)

    // Fill the first dropdown with unique bird types.
    $.each(organismTab, function (index, value) {
        $('#organism').append('<option value="' + value + '">' + value + '</option>');
    });
});

//fonction change select
$('#organism').change(function () {
    let selectedOrganism = this.options[this.selectedIndex].value;

    let filterData = arrData.filter(function(value) {
        return value.Organism === selectedOrganism;
    });

    $('#sample')
        .empty()
        .append('<option value=""> -- Select sample -- </option>');

    $.each(filterData, function (index, value) {
        // Now, fill the second dropdown list with bird names.
        $('#sample').append('<option value="' + value.Sample + '">' + value.Sample + '</option>');
    });
});

//fonction change sample
//load ideogram
$('#sample').change( function(){
	load_accession(this.value);
});








