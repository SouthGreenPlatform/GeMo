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

