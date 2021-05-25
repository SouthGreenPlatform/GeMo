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

<!-- test avec la version qui gère les custom names (pas encore released)-->
<script src="dist/ideogram/dist/js/ideogram.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/ideogram@1.29.0/dist/js/ideogram.min.js"></script> -->

<!--Tooltipster-->
<link rel="stylesheet" type="text/css" href="src/tooltipster/dist/css/tooltipster.bundle.min.css" />
<script type="text/javascript" src="src/tooltipster/dist/js/tooltipster.bundle.min.js"></script>

<!--gemo-->
<script type="module" src="src/main.js" defer></script>
<link rel="stylesheet" type="text/css" href="src/css/gemo.css">
<link rel="shortcut icon" href="/gemo/public/img/favicon.ico">

<!--chrompaint-->
<!-- <script type="module" src="src/chrompaint/main.js" defer></script> -->
<link href="src/css/chrompaint.css" rel="stylesheet">

<!--libs-->
<script type="text/javascript" src="src/html2canvas.js"></script>
<script type="text/javascript" src="src/canvas2image.js"></script>

<!--d3-->
<script src="https://d3js.org/d3-axis.v2.min.js"></script>



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
				<p class="menu_title">
					Pre-loaded example
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
					</svg>
				</p>
				<select class="custom-select custom-select-sm" id="organism">
					<option value="Organism">--Organism--</option>
				</select>
				<select class="custom-select custom-select-sm" id="sample">
					<option value="Sample">Sample</option>
				</select>

				<!--Custom data-->
				<p class="menu_title">
				With your own data
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
				</svg>
				</p>

				<!--Ploidy-->
				<label for="selectorploidy">Global ploidy</label>
				<select name="select" id="selectorploidy" class="custom-select-sm">
					<option value="1">1</option>
					<option value="2" selected>2</option> 
					<option value="3">3</option>
					<option value="4">4</option>
				</select>

				<!--type of data-->
				<p class="menu_title">
				Input files
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
				</svg>
				</p>
				<div class="btn-group btn-group-toggle" id="radio_form" data-toggle="buttons">
					<label class="myradiobtn btn btn-sm btn-outline-dark active">
						<input type="radio" name="formchoice" id="radioblock" value="block" autocomplete="off" checked> Block positions
					</label>
					<label class="myradiobtn btn btn-sm btn-outline-dark">
						<input type="radio" name="formchoice" id="radiocurve" value="curve" autocomplete="off"> Normalized curves
					</label>
				</div>



				<!-- form-->
				<div id="form">

					<!-- data-->
					<div>
						<form class="my-form">
							<textarea id="editorAnnot" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="dataFile" accept=".txt, .csv, .tab, .tsv">
								<label class="custom-file-label" for="dataFile">Choose file</label>
							</div>
						</form>
					</div>
					<!--Chrom length data-->
					<div>
						<form class="my-form">
							<p class="menu_title">
							Chromosomes size and labels
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
							</svg>
							</p>
							<select style="width:auto;" class="custom-select custom-select-sm" id="organism">
								<option value="Chrom">Chromosomes</option>
							</select>
							or upload your own
							<textarea id="editorChr" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="lenFile" accept=".txt, .csv, .tab, .tsv">
								<label class="custom-file-label" for="lenFile">Choose file</label>
							</div>
						</form>
					</div>

					<!--Colors data-->
					<div>
						<form class="my-form">
						<p class="menu_title">
						Colors (optional)
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
						</svg>
						</p>
							<textarea id="editorColor" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="colorFile" accept=".txt, .conf, .csv, .tab, .tsv">
								<label class="custom-file-label" for="colorFile">Choose file</label>
							</div>
						</form>
					</div>

					<!--Letters show / hide-->
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="SwitchLetters" checked ">
						<label class="custom-control-label" for="SwitchLetters">Show Labels</label>
					</div>

					<!--Button-->
					<div>
						<button id="submit" class="btn btn-sm btn-outline-dark my-btn">Submit</button>

						<!--Clear-->
						<button class="btn btn-sm btn-outline-warning" onclick="location.reload(true);" id="clear">Clear</button>
						
						<!-- Update -->
						<button class="btn btn-sm btn-outline-primary" id="reload">Update image</button>

						<!--Download image-->
						<a id="download" style="display: none;" class="btn btn-sm btn-outline-warning">Download as PNG</a>
						<script>
						$('#download').click(function(){ 
							html2canvas(document.getElementById("page-content-wrapper")).then(function(canvas) {
							Canvas2Image.saveAsPNG(canvas);
							});
						});
						</script>
					</div>

				</div><!-- fin formulaire -->
			</div>
			
			</li>
		</ul>
		</li>
	</ul>
	</aside>            
</div>
<!-- fin de la sidebar -->

<!-- legende flottante -->
<div id=floating_legend>
	<button type="button" class="btn btn-dark btn-sm" style="display: none" id="legend_button" data-toggle="collapse" data-target="#legend_div" aria-expanded="false" aria-controls="legend_div">	
    Legend
	</button>
	<div class="collapse" id="legend_div" >
	</div>
</div>
<!-- fin legende flottante -->
	
		<div id="page-content-wrapper" role="main" class="ideo_container">
<!-- The ideogram goes here. -->
		</div>

<div id="chrompaint" style="display: none">
	chrompaint

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

