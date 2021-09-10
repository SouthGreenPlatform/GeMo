

export function checkColorFile(colorFile){
    if (colorFile.columns.includes("group") && colorFile.columns.includes("name") && colorFile.columns.includes("hex")) {
        return true
    }
    alert ("File format error : please check your chromosome file");
    return false;

}
export function checkLenFile(lenFile){
    if (lenFile.columns.includes("chr") && lenFile.columns.includes("len") && lenFile.columns.includes("centromereInf") && lenFile.columns.includes("centromereSup")) {
        return true
    }
    alert("File format error : please check your chromosome file");
    return false;

}
export function checkDataFile(dataFile){
    if (dataFile.columns.includes("chr") && dataFile.columns.includes("haplotype") && dataFile.columns.includes("start") && dataFile.columns.includes("end") && dataFile.columns.includes("ancestral_group")){
        console.log("input block");
        return "block";
    }else if (dataFile.columns.includes("chr") && dataFile.columns.includes("start") && dataFile.columns.includes("end") && dataFile.columns.length >= 4) {
        console.log("input curve");
        return "curve";
    }else{
       alert("File format error : please check your input file");
    return false; 
    }
    

}