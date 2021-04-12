export function groupByColor(metaBlocks){

    let group = {};
    let colorInBlock = [];

    for (let i = 0; i < metaBlocks.length; i++) {

        for (let j = 0; j < metaBlocks[i].length; j++) {

            if(!(metaBlocks[i][j][4] in group && metaBlocks[i][j][4] !== "#808080" )){

                group[metaBlocks[i][j][4]] = metaBlocks[i][j][1];

            }else if(metaBlocks[i][j][1] !== group[metaBlocks[i][j][4]]){

                for (let k = 0; k < metaBlocks[i].length; k++) {
                    colorInBlock.push(metaBlocks[i][k][4]);
                }

                if(!(colorInBlock.every((currentvalue) => currentvalue === colorInBlock[0]))){ //Si il y a des couleurs différentes dans ce block.

                    let typeLeft = metaBlocks[i][j][1];
                    let typeTaken = group[metaBlocks[i][j][4]];


                    for (let k = 0; k < metaBlocks[i].length; k++) {
                        if (metaBlocks[i][k][1] === typeTaken) {
                            metaBlocks[i][k][1] = typeLeft;
                        }
                    }
                    metaBlocks[i][j][1] = group[metaBlocks[i][j][4]];
                }
            }

            colorInBlock = [];

        }
    }

    return metaBlocks;

}

export function order(block,haplotype){

    //les chromosomes sont obligé de se suivre : chr03 puis chr04...

    // forme :  chr 1 : tout les blocs de l’haplotype 1
    //          chr 1 : tout les blocs de l’haplotype 2
    //          chr 2 : tout les blocs de l’haplotype 1
    //          chr 2 : tout les blocs de l’haplotype 2

    let tab = [];
    let currentChr = block[0][0][0];
    let lineCount = 0;

    while(lineCount !== -1) {

        for (let i = 0; i < haplotype; i++) {

            block.map(function (x) {

                x.map(function (y) {

                    if (y[0] === currentChr) {
                        if (y[1] === i) {
                            tab.push(y);
                            lineCount++;
                        }
                    }

                });
            });
        }

        if (lineCount > 0) {
            lineCount = 0;
        } else {
            lineCount = -1;
        }

        currentChr = (parseInt(currentChr, 10) + 101).toString().substr(1)

    }

    return tab;

}


export function convertStrtoRangeSet(strMosaique,haplotype){

    let rangeSet = strMosaique.trim().split("\n").map(function(cur){

        let array = cur.trim().split(" ");

        let ploidyArray = [];

        for (let i = 0; i < haplotype; i++) {
            if(i === parseInt(array[1])) {
                ploidyArray[i] = 1;
            }else{
                ploidyArray[i] = 0;
            }

        }

        return {
            chr:parseInt(array[0]),
            ploidy:ploidyArray,
            start:parseInt(array[2]),
            stop:parseInt(array[3]),
            color:array[4],
        };
    });
    return rangeSet;
}

export function ploidyDescGenerator(haplotype,chrNumber){

    /*
    ploidyDesc: [
        'ABC',
        'ABC',
        'ABC',
        'ABC',
        'ABC',
        'ABC',
        'ABC',
        [...]
    ],
    */

    let ploidyDesc = [];

    let chrStr = [];

    for (let i = 0; i < chrNumber; i++) {

        for (let i = 0; i < haplotype; i++) {
            chrStr.push(String.fromCharCode('a'.charCodeAt(0) + i))
        }
        ploidyDesc.push(chrStr.join(""));
        chrStr = [];
    }

    return ploidyDesc;




}

export function ancestorsGenerator(haploytpe){

    /*
    ancestors: {
            'A': '#dea673',
            'B': '#7396be',
            'C': '#7396be',
            [...]
        },
     */

    let ancestors = {};
    let letter = 'a';

    for (let i = 0; i < haploytpe; i++) {
        ancestors[letter+""] = "#000000";
        letter = String.fromCharCode(letter.charCodeAt(0) + 1)
    }
    return JSON.stringify(ancestors);

}
