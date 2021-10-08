export function downloadArchive(){

    let blob_svg = exportSVG(document.getElementById('_ideogram'));
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

export function saveAsURL(){

    //affiche l'url et le bouton
    $('.saveAsURL').fadeIn();
    $('#copy').click(function(){
        $('#url').select();
        document.execCommand( 'copy' );
        return false;
    } );
    let url = document.location.href;
    let cleanurl = url.replace(/#.*/g, '');
    let annot = $("#editorAnnot").val();
    let chrom = $("#editorChr").val();
    let color = $("#editorColor").val();

    //Appel au serveur
    socket.emit('saveAsURL', annot, chrom, color, function(err, path){
        if(err){
            console.log(err);
        }else{
            console.log(path);
            $('#url').val(cleanurl+"#"+path);
        }
    });
    

}

var exportSVG = function(svg) {
        // first create a clone of our svg node so we don't mess the original one
        var clone = svg.cloneNode(true);
        //svg.selectAll("tooltipstered").remove();
        clone.querySelectorAll('.tooltipstered').forEach(n => n.remove());
        console.log(clone);
        // parse the styles
        parseStyles(clone);//from   w  ww  .  de m  o  2s .c  o  m
        // create a doctype
        var svgDocType = document.implementation.createDocumentType('svg', "-//W3C//DTD SVG 1.1//EN", "https://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
        // a fresh svg document
        var svgDoc = document.implementation.createDocument('https://www.w3.org/2000/svg', 'svg', svgDocType);
        // replace the documentElement with our clone
        svgDoc.replaceChild(clone, svgDoc.documentElement);
        // get the data
        var svgData = (new XMLSerializer()).serializeToString(svgDoc);
        // now you've got your svg data, the following will depend on how you want to download it
        // here I'll use FileSaver.js (https://github.com/yrezgui/FileSaver.js)
        var blob = new Blob([svgData.replace(/></g, '>\n\r<')]);
        //saveAs(blob, 'myAwesomeSVG.svg');
        return blob;
    };
    
var parseStyles = function(svg) {
    var styleSheets = [];
    var i;
    // get the stylesheets of the document (ownerDocument in case svg is in <iframe> or <object>)
    var docStyles = svg.ownerDocument.styleSheets;
    // transform the live StyleSheetList to an array to avoid endless loop
    for (i = 0; i < docStyles.length; i++) {
        styleSheets.push(docStyles[i]);
    }
    if (!styleSheets.length) {
        return;
    }
    var defs = svg.querySelector('defs') || document.createElementNS('https://www.w3.org/2000/svg', 'defs');
    if (!defs.parentNode) {
        svg.insertBefore(defs, svg.firstElementChild);
    }
    svg.matches = svg.matches || svg.webkitMatchesSelector || svg.mozMatchesSelector || svg.msMatchesSelector || svg.oMatchesSelector;
    // iterate through all document's stylesheets
    for (i = 0; i < styleSheets.length; i++) {
        var currentStyle = styleSheets[i]
        var rules;
        try {
        rules = currentStyle.cssRules;
        } catch (e) {
        continue;
        }
        // create a new style element
        var style = document.createElement('style');
        // some stylesheets can't be accessed and will throw a security error
        var l = rules && rules.length;
        // iterate through each cssRules of this stylesheet
        for (var j = 0; j < l; j++) {
        // get the selector of this cssRules
        var selector = rules[j].selectorText;
        // probably an external stylesheet we can't access
        if (!selector) {
            continue;
        }
        // is it our svg node or one of its children ?
        if ((svg.matches && svg.matches(selector)) || svg.querySelector(selector)) {
            var cssText = rules[j].cssText;
            // append it to our <style> node
            style.innerHTML += cssText + '\n';
        }
        }
        // if we got some rules
        if (style.innerHTML) {
        // append the style node to the clone's defs
        defs.appendChild(style);
        }
    }
};