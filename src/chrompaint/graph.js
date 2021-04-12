
export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key][0] === value); //object[key][0] car field est sous la forme key => ["nom","color"] ici c'est le nom que nous voulons.
}

export function tracerCourbe(idChromosome, data, lineGen, svg, field){

    d3.selectAll(".line").remove();

        let container = svg.select("#graphlimit");

        data[idChromosome].values.forEach(function(d) {
            container.append('path')
                .attr("class", "line")
                .attr("ancestor",function(){
                    return d.key;
                })
                .attr('d', lineGen(d.values))
                .style('stroke', function() {
                    return field[d.key][1];
                })
                .attr('stroke-width', 2)
                .attr('fill', 'none');
    });
}

export function refreshFloor(floorValues){
    let input;

    Object.keys(floorValues).forEach(function (origineKey) {
        input = document.getElementById(origineKey);
        input.value = floorValues[origineKey];
    });
}


export function curveOpacitySetup(){
    let displayedCurveClass = document.getElementsByClassName("displayedCurve");
    for (let checkbox of displayedCurveClass){
        checkbox.addEventListener("click",function(){
            refreshCurveOpacity();
        });
    }
}

export function refreshCurveOpacity(){

    let displayedCurveClass = document.getElementsByClassName("displayedCurve");
    let curves = document.getElementsByClassName("line");


    for(let checkbox of displayedCurveClass){
        if(checkbox.checked){
            for (let curve of curves ) {
                if(checkbox.name === curve.attributes.ancestor.value){
                    curve.style.opacity = 1;
                }
            }
        }else{
            for (let curve of curves ) {
                if(checkbox.name === curve.attributes.ancestor.value){
                    curve.style.opacity = 0;
                }
            }
        }
    }
}

export function arraySetup(haplotype) {

    let lines = document.getElementsByClassName("line");

    let array = {};

    for (let line of lines) {
        array[line.attributes.ancestor.value] = (1/haplotype).toFixed(3);
    }

    return array;

}

export function floorPositionsSetup(floorPositions, mouseG, WIDTH, ancestorsNameColor, yHeight){


    let chrGroup = mouseG.append("g");

    Object.keys(floorPositions).forEach(function(origineKey) {

        let z = (yHeight-4) * (1 - (document.getElementById(origineKey).value)/1); // mouse position == mouse[1]
        let d = "M" + z + "," + WIDTH;
        d += " " + z + "," + 0;

        floorPositions[origineKey] = d;


        chrGroup.append("path") // ligne vertical noir.
            .attr("id","floorPosition_" + origineKey)
            .attr("d", floorPositions[origineKey])
            .style("stroke", ancestorsNameColor[origineKey][1])
            .style("stroke-width", "1px")
            .style("opacity", "1")
            .style("stroke-dasharray", "4")
            .style("transform", "rotate(90deg) translate(0,-" + WIDTH + "px)");
    });
}

/* l'idée ici est d'afficher et de positionner les seuils fixé (ligne pointillé). Notre dico (fixedFloorArray) à la même structure que nos éléments
* à savoir, floorPositions[chromosome][origine] => valeur
* et pour nos éléments :
*<g id="chromosome1">
*   <path id="Velut" >...</path>
*   <path id="Schiz" >...</paht>
*   [...]
*
*
* <g>
* <g id="chromosome2">[...]</g>
*
*
*/

export function refreshfloorPositions(floorPositions){

    Object.keys(floorPositions).forEach(function(origineKey) {

        d3.select("#floorPosition_" + origineKey)
            .attr("d", floorPositions[origineKey])

    });
}