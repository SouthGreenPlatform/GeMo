export function getBase64String(dataURL) {
    var idx = dataURL.indexOf('base64,') + 'base64,'.length;
    return dataURL.substring(idx);
}

export function downloadArchive(){
    let chart = $('#_ideogram')
        .attr('xmlns', 'http://www.w3.org/2000/svg');
    //dimensions
    //var bBox = chart.get(0).getBBox();
    //console.log("bbox heigth "+bBox.height+ "bbox width "+bBox.width);
    let width = parseInt(chart.css("width").replace("px", ""))+100;
    let height = parseInt(chart.css("height").replace("px", ""))+100;
    console.log(" height "+height+ " width "+width);

    var data = new XMLSerializer().serializeToString(chart.get(0));
    var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(svg);


//////////SVG
    var svg_data = document.getElementById("_ideogram").innerHTML //put id of your svg element here
    var head = '<svg title="graph" version="1.1" xmlns="http://www.w3.org/2000/svg">'

    //if you have some additional styling like graph edges put them inside <style> tag
    var style = '<style>circle {cursor: pointer;stroke-width: 1.5px;}text {font: 10px arial;}path {stroke: DimGrey;stroke-width: 1.5px;}.bands{fill: lightgrey}</style>'
    var full_svg = head +  style + svg_data + "</svg>"
    var blob_svg = new Blob([full_svg], {type: "image/svg+xml"});  

///////////

    var img = $('<img />')
        .width(width)
        .height(height)
        .on('load', function() {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            //background
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img.get(0), 0, 0);
            URL.revokeObjectURL(url);
            //download
            canvas.toBlob(function(blob) {
                var zip = new JSZip();
                zip.file("gemo.png", blob); // <-- JSZip v3 accepts blob
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
            });
        });
    img.attr('src', url);
}