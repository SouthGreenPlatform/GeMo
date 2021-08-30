export function downloadArchive(){

    //////////SVG
    var svg_data = document.getElementById("_ideogram").innerHTML 
    var head = '<svg title="graph" version="1.1" xmlns="http://www.w3.org/2000/svg">'
    //style
    var style = '<style>circle {cursor: pointer;stroke-width: 1.5px;}text {font: 10px arial;}path {stroke: DimGrey;stroke-width: 1.5px;}.bands{fill: lightgrey}</style>'
    var full_svg = head +  style + svg_data + "</svg>"
    var blob_svg = new Blob([full_svg], {type: "image/svg+xml"});  

    ///ARCHIVE
    var zip = new JSZip();
    zip.file("gemo.svg", blob_svg); // <-- JSZip v3 accepts blob
    //retreive other data from form
    zip.file("input.txt", $("#editorAnnot").val());
    zip.file("chromosomes.txt", $("#editorChr").val());
    zip.file("color.txt", $("#editorColor").val());
                
    //generate zip
    let content = zip.generateAsync({type:"blob"}).then(function (blob) {
        saveAs(blob, "gemo.zip"); // <-- trigger the download
    }, function (e) {
        console.error(e)
    });
}