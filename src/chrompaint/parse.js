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

    let colorMap = {};
    data.map(function(cur){
        cur.values.map(function(origine) {
            if (colorMap[origine["key"]] === undefined) {
                let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                colorMap[origine["key"]] = [origine["key"], color]
            }
        });
    });

    return colorMap;
}


/**
 * génère in dictionnaire {@colorMap} comme si on avait passé un fichier de couleur en paramètre, mais avec des couleurs aléatoires et des noms complets identiques à ceux dans les données.
 * @param data : les données du formulaire editorAnnot
 */
export function randomColorGenerator_block(data){

    let colorMap = {};
    let arrayData = data.split('\n');
    arrayData.map(function(cur){
        
        let line = cur.split(' ');
        if (colorMap[line[4]] === undefined) {
            let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            colorMap[line[4]] = [line[4], color]
        }
    });
    return colorMap;
}


/**
 * Crée un fichier tsv exploitable par le script ideogram (@convert_band_data.py). actuellement ideogram ne peut pas gérer de chromosome "orphelin", pour un chrx il faut un chr(x-1) à partir de chr01.
 * La solution actuelle est d'éxiger une numérotation des chromosomes continue en partant de chr01.
 * La solution qui offre le plus de polyvalence serait de récuperer le numéro du premier chromosome qu'on nous donne dans le fichier de configuration de longueur (chr05 par exemple)
 * et de crée de fausse ligne dans le fichier de sortie correspondant on chromosome manquant. i.e chr01 02 03 04 avec une longueur par défault. (Ils seront noir car pas de données pour eux).
 * @param lenFile données parsé (par d3.tsvParse()) issue du fichier reçu.
 */

export async function parsingLen(lenFile){

    const chromatide = 2;

    /*
    what we want :

    #chromosome	arm	bp_start	bp_stop

    1	p	0	18972949
    1	q	18972949	37945898
    2   p   ...

    what we have :

    chr	len	centromereInf	centromereSup

    chr01	37945898	25000000	27000000
    chr02	34728925	08000000	11000000

    */

    let field = ["#chromosome","arm","bp_start","bp_stop"];

    let block = [];
    block.push(field);

    let line = [];

    lenFile.map(function(cur){

        for (let i = 0; i < chromatide; i++) {

            let ctrSup = cur["centromereSup"];
            let ctrInf = cur["centromereInf"];

            line.push(parseInt(cur["chr"].replace("chr",""))); //chr
            //arm
            if(ctrSup === "" && ctrInf === "" && i === (chromatide-2)){
                line.push("p");
                line.push("0");
                line.push(parseInt(cur["len"]/2));
            }else if(ctrSup === "" && ctrInf === "" && i === (chromatide-1)){
                line.push("q");
                line.push(parseInt(cur["len"]/2));
                line.push(cur["len"]);
            }else if(ctrInf !== "" && ctrSup === "" && i === (chromatide-2)){
                line.push("p");
                line.push("0");
                line.push(ctrInf);
            }else if(ctrInf !== "" && ctrSup === "" && i === (chromatide-1)){
                line.push("q");
                line.push(ctrInf);
                line.push(cur["len"]);
            }else if(ctrSup !== "" && ctrInf === "" && i === (chromatide-2)){
                line.push("p");
                line.push("0");
                line.push(ctrSup);
            }else if(ctrSup !== "" && ctrInf === "" && i === (chromatide-1)) {
                line.push("q");
                line.push(ctrSup);
                line.push(cur["len"]);
            }else if(ctrSup !== "" && ctrInf !== "" && i === (chromatide-2)){
                line.push("p");
                line.push("0");
                line.push(parseFloat((parseInt(ctrSup) + parseInt(ctrInf))/2)+"");
            }else if(ctrSup !== "" && ctrInf !== "" && i === (chromatide-1)){
                line.push("q");
                line.push(parseFloat((parseInt(ctrSup) + parseInt(ctrInf))/2)+"");
                line.push(cur["len"])
            }

            block.push(line);
            line = [];
        }
    });

    let result = [];

    block.map(function(each){
        result.push(each.join("\t"));
    });

    let tsv = "";

    result.map(function (each) {
        tsv = tsv + each + "\n";
    });

    //Appel au serveur
    return new Promise( resolve => {
        let configPath;
        socket.emit('run', tsv, function(err, path){
            if(err){
                console.log(err);
            }else{
                console.log( "path to return " +path);
                configPath = path;
                console.log("confffff " + configPath);
                resolve(configPath);
            }
        });
	});
}

export function dataStuffing(data,chrConfig){

    /*Ajout de ligne factice ayant pour but de remplir les trous dans nos données (avoir des données pour toutes les positions de 0 à celle de fin du chromosome)
    * On ajoute également un champ average("avr") qui fait la moyenne entre le début("start") et la fin("end") dans chaque ligne de données.
    * */

    let i = 0;
    let borneInf = 0;
    while(i < data.length){

        borneInf = 0;

        let chr = data[i]["chr"];

        let len = 0;

        for (let j = 0; j < chrConfig.length; j++) {
            if(chrConfig[j]["chr"] === chr){
                len = chrConfig[j]["len"];
            }
        }

        while(i < data.length && chr === data[i]["chr"] ){

            let dataStuff = JSON.parse(JSON.stringify(data[i]));

            if(parseInt(data[i]["start"]) - borneInf !== 0){

                dataStuff["start"] = borneInf + "";
                dataStuff["end"] = parseInt(data[i]["start"]) + "";
                borneInf = parseInt(dataStuff["end"]);
                dataStuff["avr"] = (((parseInt(dataStuff["start"]) + parseInt(dataStuff["end"])) / 2).toFixed(0)) + "";
                data.splice(i, 0, dataStuff);

            }else {

                borneInf = parseInt(data[i]["end"]);
                data[i]["avr"] = (((parseInt(data[i]["start"]) + parseInt(data[i]["end"])) / 2).toFixed(0)) + "";

            }
            i++;
        }
        let lastDataLine = JSON.parse(JSON.stringify(data[i-1]));
        lastDataLine["start"] = lastDataLine["end"];
        lastDataLine["end"] = len;
        data.splice(i, 0, lastDataLine);
        i++; //On a ajouté une ligne alors on avance l'itérateur.
    }

    return data;

}

/**
 * cette fonction sert à travailler les données,
 * il est préférable de les avoir sous la forme d'un tableau dont chaque case correspond à un graphique.
 * maquette : data[graphique(ch0,chr1,...)][courbe(Velut,Schiz,...)]
 * les données sont trié par chromosome puis par origine
 * @param stuffedData un tableau contenant nos données.
 */

export function parsingData(stuffedData){

    /*
    mappage (si ça se dit?) des données pour faire en sorte que les origines(A_m..) ne soient plus des colonnes mais des champs dans les lignes de données
    et qu'une valeur leur soit associée
    on en profite pour enlever les colonnes start et end qui ne nous servent pas pour la suite. (on peut facilement les remettre si besoins
    pour les mosaïques)
    */

    let dataByOrigin = stuffedData.columns.slice(3).map(function (id) {
        return {
            id: id,
            values: stuffedData.map(function (d) {
                return {chr: d.chr, valeur: parseFloat(d[id]),avr: parseFloat(d.avr)};
            })
        };
    });


    let parsedData = [];

    /*
    ajout des origines (A_m, A_z..)(initialement id du tableau) dans les lignes de données
    Le tout est mis à la suite dans un nouveau tableau (parsedData)
    */

    for(let ancestors of dataByOrigin){
        for(let line of ancestors.values){
            line["origine"] = ancestors.id;
            parsedData.push(line);
        }
    }

    /* Ce qui nous permet d'utiliser la fonction D3.nest pour grouper nos données sur deux niveaux, d'abord par chromosome(chr1...) puis par origine(V...).*/

    let groupedData = d3.nest()
        .key(function(d) { return d.chr; })
        .key(function(d) { return d.origine; })
        .entries(parsedData);


    /*
     * le tableau groupedData est sous la forme suivante :
     * GroupedData[Chromosome].values[origine].values[ligne de données]
     * chaque ligne de données est sous la forme suivante :
     * chromosome(chr1,chr2...) - origine(A_m,A_z...) - valeur(0.50,0.20,...) - avr(9000,3000000,...)
     */
    return groupedData;

}

