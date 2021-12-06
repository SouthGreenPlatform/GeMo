//draw bed annotations
export function drawBed(bedAnnot, maxLength){
	console.log(bedAnnot);

	let ratio = maxLength /600;
	let minWidth = 2;
	
	$( document ).ready(function() {

		console.log( "ready!" );
		console.log("drawBed ");

		//parcours les annotations
		$.each(bedAnnot, function(i, obj) {
			let start = parseInt(obj.start) / parseInt(ratio);
			//console.log("start "+start);
			let stop = parseInt(obj.stop) / parseInt(ratio);
			let width = parseInt(stop)/600-parseInt(start)/600;

			if(width<minWidth){width = minWidth;}

			//draw version barre position OK

/* 			d3.selectAll(".chromosome-set").select("[id^='chr"+obj.chr+"-']")
			.append("rect")       // attach a rectangle
			.style("fill", "black")
			.attr('title', "Name: "+obj.name+" \nStart: "+obj.start+" Stop: "+obj.stop)
			.attr('class', 'bed-annot')
			.attr("x", parseInt(start))         // position the left of the rectangle
			.attr("y", -10)          // position the top of the rectangle
			.attr("height", 10)    // set the height
			.attr("width", width);   */

			//draw version location sign position OK
			let startLoc = parseInt(start)-7;

			d3.selectAll(".chromosome-set").select("[id^='chr"+obj.chr+"-']")
			.append("g")
			.attr('title', "Name: "+obj.name+" \nStart: "+obj.start+" Stop: "+obj.stop)
			.attr('class', 'bed-annot')
			.attr('transform', "translate("+startLoc+", -16) scale(0.04,0.04)")
			.attr("stroke", "black") //<-- need a color?
			.attr("stroke-width", 20)
			.style("fill", "gray")
			.append("path")
			.attr("d", "M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738   c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388   C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191   c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
			)
			;
			

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

export function ideoViewbox(){
	$( document ).ready(function() {
		let svg = document.getElementById('_ideogram');
		let width = parseInt($('#_ideogram').width());
		let height = parseInt($('#_ideogram').height());
		width = parseInt(width+20);
		svg.setAttribute("viewBox", "-20 -20 "+width+" "+height);
	});
}

export function replaceChromName(chrDict){
	$( document ).ready(function() {
		console.log("replace chromosome names");
		$("#_ideogram tspan").each(function(){
			//retrouve le nom de chr original
			let chrID = Object.keys(chrDict).find(key => chrDict[key] === parseInt($(this).html()));
			$(this).html(chrID);
		});
	});
}