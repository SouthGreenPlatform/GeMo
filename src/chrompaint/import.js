let dropArea = document.getElementById('drop-area');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

export function resetgraph(){
    document.getElementById("graph").innerHTML = '';
    document.getElementById("floorContainer").innerHTML = '';
}

function dropdownSetup(){
   let sub1 = document.getElementById("sub1");
   let sub2 = document.getElementById("sub2");
   let box1 = document.getElementById("box1");
   let box2 = document.getElementById("box2");


   sub1.addEventListener("click",function (){
       sub1.style.backgroundColor = "#f1faee";
       sub2.style.backgroundColor = "";
       box1.style.visibility = "visible";
       box2.style.visibility = "hidden";
   });
    sub2.addEventListener("click",function (){
        sub2.style.backgroundColor = "#f1faee";
        sub1.style.backgroundColor = "";
        box1.style.visibility = "hidden";
        box2.style.visibility = "visible";
    });
}
dropdownSetup();

