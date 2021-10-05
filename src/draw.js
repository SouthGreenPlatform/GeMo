//draw bed annotations
export function drawBed(bedAnnot, maxLength){
	console.log(bedAnnot);

	let ratio = maxLength /600;
	
	$( document ).ready(function() {

		console.log( "ready!" );
		console.log("drawBed ");

		//parcours les annotations
		$.each(bedAnnot, function(i, obj) {
			let start = parseInt(obj.start) / parseInt(ratio);
			//console.log("start "+start);
			let stop = parseInt(obj.stop) / parseInt(ratio);
			let width = parseInt(stop)-parseInt(start);

			//draw
			d3.selectAll(".chromosome-set").select("[id^='chr"+obj.chr+"']")
			.append("rect")       // attach a rectangle
			.style("fill", "black")
			.attr('title', "Name: "+obj.name+" \nStart: "+obj.start+" Stop: "+obj.stop)
			.attr('class', 'bed-annot')
			.attr("x", parseInt(start))         // position the left of the rectangle
			.attr("y", 30)          // position the top of the rectangle
			.attr("height", 10)    // set the height
			.attr("width", 2); 

		
		});
		//tooltipster activation
		$('.bed-annot').tooltipster({
			theme: 'tooltipster-punk',
			contentAsHTML: false,
			//content: $('#tooltip_content'),
			interactive: true,
			contentCloning: true,
			delay: 100
		});
	});

	
}
