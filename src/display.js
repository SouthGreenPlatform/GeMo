//display loading animation
export function loadingon(){
	console.log("loading on");
	document.getElementById("loader").style.display = "block";
}

//hide loading animation
export function loadingoff(){
	console.log("loading off");
	document.getElementById("loader").style.display = "none";
}

//display or hide haplotype
export function displaytext(){
	let value ="";
	const letters = document.getElementsByClassName("chrLabel");
	if (document.getElementById("SwitchLetters").checked){
		value='inline';
	}else{
		value="none";
	}

	for (let i = 0; i < letters.length; i++) { 
		letters[i].style.display=value;
	}
}

//clear ideogram 
export function clear(){
	console.log("clear");

	const element = document.getElementById("_ideogramOuterWrap"); //_ideogram
	if(element != null){
		element.parentNode.removeChild(element);
	}
	const div = document.getElementById("ideo_div");
	if(div != null){
		div.parentNode.removeChild(div);
	}
	const sca = document.getElementById("scale");
		if(sca != null){
		sca.parentNode.removeChild(sca);
	}
}

export function homeClick(){
	//affiche la page d'accueil
	//document.getElementById("home").style.display = "block";
	$('#home').show();
	$('#welcome').show();
	//$('#download_section').hide();
	//$('#feedback').hide();
    $('#chrompaint').hide();
	$('#page-content-wrapper').hide();

    //vire l'echelle
    d3.select("body").selectAll("#scale").remove();

	//remet le selcteur d'acc vide
	$('#organism')[0].value="Organism";
    $('#sample')[0].value="Sample";
}

export function ideoViewbox(){
	$( document ).ready(function() {
		let svg = document.getElementById('_ideogram');
		let width = parseInt($('#_ideogram').width());
		let height = parseInt($('#_ideogram').height());
		svg.setAttribute("viewBox", "0 -20 "+width+" "+height);
	});
}

