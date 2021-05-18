export function drawLegend(colors){

	console.log(colors);
	//empty div before
	$('#legend_div').empty();


	//pour chaque groupe
	Object.keys(colors).map(function(group){
		console.log("..."+group+" "+colors[group][0]+" "+colors[group][1]);
		let groupName = colors[group][0];
		let hex = colors[group][1];

		let divcol = document.createElement('div');

		let col = document.createElement('input');
		col.type = 'color';
		col.id = groupName;
		col.value = hex;
		col.style = "margin: .4rem;"
		let label = document.createElement('label');
		label.for = groupName;
		label.innerText = groupName;

		divcol.appendChild(col);
		divcol.appendChild(label);
		document.getElementById('legend_div').appendChild(divcol); 

		col.addEventListener("input", function(e){
			console.log("nouvelle couleur : " +e.target.value);
		});
	});

	//<div>
    //<input type="color" id="head" name="head"
    //       value="#e66465">
    //<label for="head">Head</label>
    //</div>

}
