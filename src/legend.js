export function drawLegend(colors){

	console.log(colors);
	//empty div before
	$('#legend_div').empty();

	//ajoute une couleur pour no data
	let divcol = document.createElement('div');
	divcol.style="cursor:not-allowed;";
	let colNoData = document.createElement('input');
	colNoData.type = 'color';
	colNoData.id = "No data";
	colNoData.value = "#B0B0B0";
	colNoData.style = "margin: .4rem; cursor:not-allowed; pointer-events:none";
	let label = document.createElement('label');
	label.setAttribute ("for", "No data");
	label.style = "cursor:not-allowed; pointer-events:none"
	label.innerText = "No data";

	divcol.appendChild(colNoData);
	divcol.appendChild(label);
	document.getElementById('legend_div').appendChild(divcol); 

	//pour chaque groupe
	Object.keys(colors).map(function(group){
		//console.log("..."+group+" "+colors[group][0]+" "+colors[group][1]);
		let groupName = colors[group][0];
		let hex = colors[group][1];

		//<div>
		//<input type="color" id="group"
		//       value="#e66465">
		//<label for="group">groupName</label>
		//</div>
		divcol = document.createElement('div');
		let col = document.createElement('input');
		col.type = 'color';
		col.id = group;
		col.value = hex;
		col.style = "margin: .4rem; cursor:pointer;";
		let label = document.createElement('label');
		label.setAttribute ("for", group);
		label.style = "cursor:pointer;";
		label.innerText = groupName;

		divcol.appendChild(col);
		divcol.appendChild(label);
		document.getElementById('legend_div').appendChild(divcol); 

		//event "change" waits for the user to validate the color
		col.addEventListener("change", function(e){
			//console.log("nouvelle couleur : " +e.target.value);
			//rempli le formulaire avec les nouvelles couleurs
			colors[group][1] = e.target.value;

			let colorToString = "group\tname\thex";
			Object.keys(colors).map(function(group){
				colorToString += "\n"+group+"\t"+colors[group][0]+"\t"+colors[group][1];
			});
			console.log(colorToString);
			$("#editorColor").val(colorToString);
			//update ideogram
			$("#reload").click();
		});
	});	
}

export function parsingColor(colorFile){

    let colorMap = {};
    colorFile.map(function(cur){
        colorMap[cur.group] = [cur.name,cur.hex];
    });
    return colorMap;
}

/**
 * génère in dictionnaire {@colorMap} comme si on avait passé un fichier de couleur en paramètre, mais avec des couleurs aléatoires et des noms complets identiques à ceux dans les données.
 * @param data : les données parsé. (après être passé dans parsingData())
 */
export function randomColorGenerator(data){
	
	let paletteTab;
	let colorMap = {};

	//si une palette est selectionnée
	let palette = $('.collapse input:radio:checked').val();
	if(palette){
		$('.collapse input:radio:checked').prop('checked', false);
	}else{
		palette = "BrBG";
	}    
	
	//compte le nombre de group
    data.map(function(cur){
        cur.values.map(function(origine) {
            if (colorMap[origine["key"]] === undefined) {
                colorMap[origine["key"]] = 1;
			}
        });
    });

	//palette la plus grande
	let maxNum = Math.max(...Object.keys(colorbrewer[palette]));
	//nombre de groupes à colorer
	let nbGroup = Object.keys(colorMap).length;
	//si trop de groupes on prend la palette la plus grande
	if(nbGroup > maxNum){
		paletteTab = colorbrewer[palette][maxNum];
	}else{
		paletteTab = colorbrewer[palette][nbGroup];
	}
	
	//attribution des couleurs aux groupes
	Object.keys(colorMap).map(function(group, i){
		//hex
		let color = paletteTab[i];
		if(color){
			console.log("from palette");
			colorMap[group] = [group, color];
		//si trop de groupes on attribue un couleur aléatoire
		}else{
			console.log("from palette");
			let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
			colorMap[group] = [group, color]
		}
	});

	//rempli le formulaire
	let colorToString = "group\tname\thex";
	Object.keys(colorMap).map(function(group){
		colorToString += "\n"+group+"\t"+colorMap[group][0]+"\t"+colorMap[group][1];
	});
	$("#editorColor").val(colorToString);

    return colorMap;
}

/* 	{
    "ancestral_group": [
        "ancestral_group",
        "#543005"
    ],
    "g3": [
        "g3",
        "#8c510a"
    ]
} */

/**
 * génère in dictionnaire {@colorMap} comme si on avait passé un fichier de couleur en paramètre, mais avec des couleurs aléatoires et des noms complets identiques à ceux dans les données.
 * @param data : les données du formulaire editorAnnot
 */
export function randomColorGenerator_block(data){

	let paletteTab;
	let colorMap = {};

	//si une palette est selectionnée
	let palette = $('.collapse input:radio:checked').val();
	if(palette){
		$('.collapse input:radio:checked').prop('checked', false);
	}else{
		palette = "BrBG";
	}

	let index =0;
    let arrayData = data.split('\n');

	//compte le nombre de groupe
    arrayData.map(function(cur){
        
        //split les espaces ou les tabulations
        let line = cur.split(/[ \t]+/);
        if (colorMap[line[4]] === undefined) {
            colorMap[line[4]] = 1;
        }
    });

	//palette la plus grande
	let maxNum = Math.max(...Object.keys(colorbrewer[palette]));
	//nombre de groupes à colorer
	let nbGroup = Object.keys(colorMap).length;
	//si trop de groupes on prend la palette la plus grande
	if(nbGroup > maxNum){
		paletteTab = colorbrewer[palette][maxNum];
	}else{
		paletteTab = colorbrewer[palette][nbGroup];
	}

	//attribution des couleurs aux groupes
	Object.keys(colorMap).map(function(group, i){
		//hex
		let color = paletteTab[i];
		if(color){
			console.log("from palette");
			colorMap[group] = [group, color];
		//si trop de groupes on attribue un couleur aléatoire
		}else{
			console.log("from palette");
			let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
			colorMap[group] = [group, color]
		}
	});

	//rempli le formulaire
	let colorToString = "group\tname\thex";
	Object.keys(colorMap).map(function(group){
		colorToString += "\n"+group+"\t"+colorMap[group][0]+"\t"+colorMap[group][1];
	});
	$("#editorColor").val(colorToString);

    return colorMap;
}

export function drawPalette(){
	//console.log("draw palette");
	//console.log(colorbrewer);
	// variable for the namespace 
	const svgns = "http://www.w3.org/2000/svg";
	//const svg = document.getElementById("svgPalette");

	let x = 5;
	let y = 3;
	
	//pour chaque palette de couleur
	for (var palette in colorbrewer) {

		//crée le svg de la taille d'1 palette
		let svg = document.createElementNS(svgns, "svg");
		svg.setAttribute("width", "200");
		svg.setAttribute("height", "15");
		//radio en face de chaque palette
		var radio = document.createElement('input');
		radio.type = 'radio';
		radio.name = 'radioPalette'
		radio.id = 'radioPalette';
		radio.value = palette;
		var br = document.createElement('br');
		//append
		document.getElementById("palette").appendChild(br);
		document.getElementById("palette").appendChild(radio);

		//console.log(`obj.${palette} = ${colorbrewer[palette]}`);
		
		//palette avec le plus de couleur
		let maxNum = Math.max(...Object.keys(colorbrewer[palette]));
		//position horizontale de la première couleur de la palette
		x=5;
		
		//pour chaque couleur de la palette la plus grande
		for (var col in colorbrewer[palette][maxNum]) {
			
			let hex = colorbrewer[palette][maxNum][col]
			let newRect = document.createElementNS(svgns, "rect");
			newRect.setAttribute("x", x);
			newRect.setAttribute("y", y);
			newRect.setAttribute("width", "10");
			newRect.setAttribute("height", "10");
			newRect.setAttribute("fill", hex);
			// append the new rectangle to the svg
			svg.appendChild(newRect); 
			x =x +10;
		}
		var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		text.setAttribute('x', x +10);
		text.setAttribute('y', y +10);
		text.setAttribute('fill', '#000');
		text.textContent = palette;
		svg.appendChild(text); 

	document.getElementById("palette").appendChild(svg);
	}
}

