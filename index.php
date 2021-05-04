<!DOCTYPE html> 
<html>
<head> 
<title>GEMO</title>
<meta charset="utf-8">

<!--Bootstrap 4.4-->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

<!-- <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/sandstone/bootstrap.min.css" rel="stylesheet" integrity="sha384-ABdnjefqVzESm+f9z9hcqx2cvwvDNjfrwfW5Le9138qHCMGlNmWawyn/tt4jR4ba" crossorigin="anonymous">   -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.1.1/d3.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/ideogram@1.16.0/dist/js/ideogram.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/ideogram@1.20.0/dist/js/ideogram.min.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/ideogram@1.29.0/dist/js/ideogram.min.js"></script>

<!--Tooltipster-->
<link rel="stylesheet" type="text/css" href="src/tooltipster/dist/css/tooltipster.bundle.min.css" />
<script type="text/javascript" src="src/tooltipster/dist/js/tooltipster.bundle.min.js"></script>

<!--gemo-->
<script type="module" src="src/main.js" defer></script>
<link rel="stylesheet" type="text/css" href="src/css/gemo.css">
<link rel="shortcut icon" href="/gemo/public/img/favicon.ico">

<!--chrompaint-->
<script type="module" src="src/chrompaint/main.js" defer></script>
<link href="src/css/chrompaint.css" rel="stylesheet">

<!--libs-->
<script type="text/javascript" src="src/html2canvas.js"></script>
<script type="text/javascript" src="src/canvas2image.js"></script>

<!--d3-->
<script src="https://d3js.org/d3-axis.v1.min.js"></script>



</head>
<body>



<!--JUMBOTRON-->
<div class="jumbotron jumbo-bg">
  <p class="lead">
  <img src="./public/img/GeMo_full.png"></img>
  Genetic mosaicism painting</p>
</div>

  <!-- END OF JUMBOTRON-->

<div id="loader" class="triple-spinner" style="display:none;"></div>

  <?php
//echo json_encode(file_get_contents($_POST["data"]));
//echo $_POST["select"];

  if(isset($_FILES["data"])){
	$data = json_encode(file_get_contents($_FILES["data"]["tmp_name"]));
	$ploidyPost = $_POST["select"];
	echo "<script>
	config.ploidy = $ploidyPost;
	$(\"#selectorploidy\").val('$ploidyPost');
	var datajs = {$data};
	datajs = datajs.substring(0, datajs.length-1);
	console.log(datajs);
	load_post_file(datajs); 
  </script>";
  if(!empty($_FILES["annot"])){
	$annot = json_encode(file_get_contents($_FILES["annot"]["tmp_name"]));
	echo "<script> 
	var annotjs = {$annot};
	annotjs = annotjs.substring(0, annotjs.length-1);
	console.log(annotjs);
	annotationParser(annotjs); 
//</script>";
  }
  echo "<script> load_ideogram()</script>";
}
elseif(isset($_POST["data"])){
  $data = json_encode(file_get_contents($_POST["data"]));
  $ploidyPost = $_POST["select"];
  echo "<script>
  config.ploidy = $ploidyPost;
  $(\"#selectorploidy\").val('$ploidyPost');
  var datajs = {$data};
  datajs = datajs.substring(0, datajs.length-1);
  $(\"#editorChr\").text(datajs);
</script>";
if(!empty($_POST["annot"])){
  $annot = json_encode(file_get_contents($_POST["annot"]));
  echo "<script>
  var annotjs = {$annot};
  annotjs = annotjs.substring(0, annotjs.length-1);
  console.log(annotjs);
  $(\"#editorAnnot\").text(annotjs);
//</script>";
}
echo "<script> load_ideogram()</script>";
}
?>




<!--SIDEBAR-->
<div id="wrapper">
	<div id="sidebar-wrapper">
		<aside id="sidebar">
			<ul id="sidemenu" class="sidebar-nav">
					
		<!--ACCESSION-->
		<li id="accession">
			<a class="accordion-toggle collapsed toggle-switch" data-toggle="collapse" href="#submenu-1">
				<span class="sidebar-icon"><i class="fa fa-dashboard"></i></span>
				<span class="sidebar-title">Chromosome Painting</span>
			<b class="caret"></b>
			</a>
			
			<ul id="submenu-1" class="panel-collapse collapse panel-switch" role="menu">
		
			<!-- Menu-->
			<li>
				<div class="form-group">

				<!--Pre-loaded data-->
				<p class="menu_title">Pre-loaded example</p>
				<select style="width:auto;" class="custom-select custom-select-sm" id="organism">
					<option value="Organism">Organism</option>
				</select>
				<select style="width:auto;" class="custom-select custom-select-sm" id="sample">
					<option value="Sample">Sample</option>
				</select>

				<!--Custom data-->
				<p class="menu_title">With your own data</p>

				<!--Ploidy-->
				<label for="selectorploidy">Global ploidy</label>
				<select name="select" id="selectorploidy" class="custom-select-sm">
					<option value="1">1</option>
					<option value="2" selected>2</option> 
					<option value="3">3</option>
					<option value="4">4</option>
				</select>

				<!--type of data-->
				<p class="menu_title">Input files</p>
				<div class="btn-group btn-group-toggle" data-toggle="buttons">
					<label class="myradiobtn btn btn-sm btn-outline-dark active">
						<input type="radio" name="formchoice" id="radioblock" value="block" autocomplete="off" checked> Block positions
					</label>
					<label class="myradiobtn btn btn-sm btn-outline-dark">
						<input type="radio" name="formchoice" id="radiocurve" value="curve" autocomplete="off"> Normalized curves
					</label>
				</div>

				<!--Block position form-->
				<div id="blockform">

					<!--Block position data-->
					<textarea id="editorAnnot" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
					<div class="custom-file" style="width:90%;">
						<input type="file" class="custom-file-input" id="fileInputD" onchange="load_file2(this.value)">
						<label class="custom-file-label" for="customFile">Choose file</label>
					</div>

					<!--Chromosomes data-->
					<div>
						<p class="menu_title">Chromosomes size and labels</p>
							<select style="width:auto;" class="custom-select custom-select-sm" id="organism">
								<option value="Chrom">Chromosomes</option>
							</select>
							or upload your own
						<textarea id="editorChr" rows="3" class="form-control" placeholder="Insert values here"></textarea>
						<div class="custom-file" style="width:90%;">
							<input onchange="load_file(this.value)" type="file" class="custom-file-input" id="fileInputC">
							<label class="custom-file-label" for="customFile">Choose file</label>
						</div>
					</div>

					<!--Colors data-->
					<div>
						<form class="my-form">
						<p class="menu_title">Colors (optional)</p>
							<textarea id="editorColor" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="colorFile" accept=".txt, .conf, .csv, .tab, .tsv">
								<label class="custom-file-label" for="colorFile">Choose file</label>
							</div>
						</form>
					</div>

					<!--Submit-->
					<div>
						<button id="submit" class="button">Générer</button>
					</div>
				</div>

				<!--Normalized curves form-->
				<div id="curveform" style="display: none">

					<!--Normalized curves data-->
					<div>
						<form class="my-form">
							<textarea id="editorCurve" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="dataFile" accept=".txt, .csv, .tab, .tsv">
								<label class="custom-file-label" for="dataFile">Choose file</label>
							</div>
						</form>
					</div>
					<!--Chrom length data-->
					<div>
						<form class="my-form">
							<p class="menu_title">Chromosomes size and labels</p>
							<select style="width:auto;" class="custom-select custom-select-sm" id="organism">
								<option value="Chrom">Chromosomes</option>
							</select>
							or upload your own
							<textarea id="editorChrom" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="lenFile" accept=".txt, .csv, .tab, .tsv">
								<label class="custom-file-label" for="lenFile">Choose file</label>
							</div>
						</form>
					</div>

					<!--Colors data-->
					<div>
						<form class="my-form">
						<p class="menu_title">Colors (optional)</p>
							<textarea id="editorColor" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="colorFile" accept=".txt, .conf, .csv, .tab, .tsv">
								<label class="custom-file-label" for="colorFile">Choose file</label>
							</div>
						</form>
					</div>

					<!--Submit-->
					<div>
						<button id="submit" class="button">Générer</button>
					</div>

				</div>

				

				
				
				<!--Letters show / hide-->
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="SwitchLetters" checked ">
					<label class="custom-control-label" for="SwitchLetters">Show letters</label>
				</div>
				<br />
				
				<!--Clear-->
				<button class="btn btn-warning" onclick="location.reload(true);" id="clear">Clear</button>
				
				<!-- Update -->
				<button class="btn btn-primary" id="reload">Update image</button>

				<!--Download image-->
				<a id="download" style="display: none;" class="btn btn-warning">Download as PNG</a>
				<script>
				$('#download').click(function(){ 
					html2canvas(document.getElementById("page-content-wrapper")).then(function(canvas) {
					Canvas2Image.saveAsPNG(canvas);
					});
				});
				</script>
				
				</div>
			</li>
		</ul>
		</li>
	</ul>
	</aside>            
</div>
<!-- fin de la sidebar -->
	
		<div id="page-content-wrapper" role="main" class="ideo_container">
<!-- The ideogram goes here. -->
		</div>

<div id="chrompaint" style="display: none">
	chrompaint
	
<!-- <div id="menu">

<div  class="dropdown">
	<button id="sub1" class="dropbtn" style="background-color: rgb(241, 250, 238);">Données</button>
</div>



<div class="dropdown">
	<button id="sub2" class="dropbtn">Configuration</button>
</div>
</div> -->

<!-- <div id="box1">
<div id="drop-area">
	<form class="my-form">
		<p>Séléctionner votre fichier à l'aide du bouton ci-dessous ou en le déposant directement dans cette zone</p>
		<input type="file" id="dataFile" accept=".csv, .tab, .tsv">
		<label class="button" for="dataFile">Séléctionner un fichier</label>
	</form>
</div>
</div> -->

<!-- <div id="box2">
<div>
	<p>Fichier de couleur <img class="help" src="assets/001-info.svg" alt="help"></p>
	<input id="colorFile" type="file" accept=".csv, .tab, .tsv, .conf">
</div>

<img class="arrow" src="assets/right-arrow.svg">

<div>
	<p>Fichier de longueur des chromosomes <img class="help" src="assets/001-info.svg" alt="help" alt="help"></p>
	<input id="lenFile" type="file" accept=".csv, .tab, .tsv">
</div>

<img class="arrow" src="assets/right-arrow.svg" alt="arrow">

<div>
	<p>Haplotype <img class="help" src="assets/001-info.svg" alt="arrow"></p>
	<input id="haplotype" type="number" value="2" step="1" min="2">
</div>

<img class="arrow" src="assets/right-arrow.svg" alt="arrow">

<div>
	<button id="submit" class="button">Générer</button>
</div>


</div> -->




<div id="box3">
<div id="graph"></div>
<div id="selector">
	<div id="floorContainer">
	</div>
</div>
</div>
<div id="box4">
ideogram
</div>
<!-- fin chrompaint -->
</div>
</div> 
	
<div class="tooltip_templates" id="tooltip_content">
		<span>
			<a href="https://banana-genome-hub.southgreen.fr/content/m-acuminata-dh-pahang-version-2/?loc=chr01:24139214..24142797">
				view in banana jbrowse
			</a>
		</span>
	</div>








</body>
</html>

