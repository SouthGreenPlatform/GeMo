

export function checkColorFile(colorFile){
    if (colorFile.columns.includes("group") && colorFile.columns.includes("name") && colorFile.columns.includes("hex")) {
        return true
    }
    alert ("Le format (colonnes) du fichier ne correspond pas à celui attendu (group    name    hex)");
    return false;

}
export function checkLenFile(lenFile){
    if (lenFile.columns.includes("chr") && lenFile.columns.includes("len") && lenFile.columns.includes("centromereInf") && lenFile.columns.includes("centromereSup")) {
        return true
    }
    alert("Le format (colonnes) du fichier ne correspond pas à celui attendu (chr    len    centromereInf  centromereSup)");
    return false;

}
export function checkDataFile(dataFile){
    if (dataFile.columns.includes("chr") && dataFile.columns.includes("start") && dataFile.columns.includes("end") && dataFile.columns.length >= 4) {
        return true
    }
    alert("Le format (colonnes) du fichier ne correspond pas à celui attendu, au minimum : (chr    start    end  une_origine)");
    return false;

}