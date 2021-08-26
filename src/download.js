export function getBase64String(dataURL) {
    var idx = dataURL.indexOf('base64,') + 'base64,'.length;
    return dataURL.substring(idx);
}

export function downloadArchive(){
    let chart = $('#_ideogram')
        .attr('xmlns', 'http://www.w3.org/2000/svg');
    //dimensions
    var bBox = chart.get(0).getBBox();
    
    var data = new XMLSerializer().serializeToString(chart.get(0));
    var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(svg);

    var img = $('<img />')
        .width(bBox.width+100)
        .height(bBox.height+100)
        .on('load', function() {
            var canvas = document.createElement('canvas');
            canvas.width = bBox.width+100;
            canvas.height = bBox.height+100;
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