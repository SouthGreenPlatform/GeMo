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
