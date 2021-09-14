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

<!-- Ideogram -->
<!-- <script src="dist/ideogram/dist/js/ideogram.min.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/ideogram@1.31.0/dist/js/ideogram.min.js"></script>

<!--Tooltipster-->
<link rel="stylesheet" type="text/css" href="src/tooltipster/dist/css/tooltipster.bundle.min.css" />
<link rel="stylesheet" type="text/css" href="src/tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" />
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
<script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"></script>
<script type="text/javascript" src="dist/jszip/jszip.min.js"></script>
<script type="text/javascript" src="dist/file-saver/FileSaver.min.js"></script>

<!--d3-->
<script src="https://d3js.org/d3-axis.v2.min.js"></script>

<!--SocketIO-->
<script src="node_modules/socket.io/client-dist/socket.io.js"></script>
<script>
	var socket = io('http://195.221.173.169:9070');
</script>

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
					
		
		<!--HOME-->
		<li id="homebutton">
			<a class="accordion-toggle collapsed toggle-switch" data-toggle="collapse" href="#submenu-1">
				<span class="sidebar-icon"><i class="fa fa-dashboard"></i></span>
				<span class="sidebar-title">Home</span>
			  	<b class="caret"></b>
			</a>
			<!-- <ul id="submenu-1" class="panel-collapse collapse panel-switch" role="menu">
			</ul> -->
		</li>

		<!--ACCESSION-->
		<li id="accession">
			<a class="accordion-toggle toggle-switch" data-toggle="collapse" href="#submenu-2">
				<span class="sidebar-icon"><i class="fa fa-dashboard"></i></span>
				<span class="sidebar-title">Chromosome Painting</span>
			<b class="caret"></b>
			</a>
			
			<ul id="submenu-2" class="panel-collapse collapse panel-switch show" role="menu">
		
			<!-- Menu-->
			<li>
				<div class="form-group">

				<!-- bloc or curve -->
<!-- 				<p class="menu_title">
					Choose your visualization type
					<svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" width="16" height="16" fill="currentColor" class="bi bi-question-circle blocOrCurve" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
					</svg>
				</p>
				<div class="btn-group btn-group-toggle" id="radio_form" data-toggle="buttons">
					<label class="myradiobtn btn btn-sm btn-outline-dark active">
						<input type="radio" name="formchoice" id="radioblock" value="block" autocomplete="off" checked> Mosaïc blocks (ideogram)
					</label>
					<label class="myradiobtn btn btn-sm btn-outline-dark">
						<input type="radio" name="formchoice" id="radiocurve" value="curve" autocomplete="off"> Data curation (graph)
					</label>
				</div> -->

				<!--Pre-loaded data-->
				<div class="menu_division">
					<p class="menu_title">
						Pre-loaded examples
						<svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" width="16" height="16" fill="currentColor" class="bi bi-question-circle preloaded" viewBox="0 0 16 16">
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
				</div>

				<!--Custom data-->
				<p class="menu_title">
				With your own data
				<svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" width="16" height="16" fill="currentColor" class="bi bi-question-circle yourdata" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
				</svg>
				</p>

				

				<!--type of data-->
				<div class="menu_division">
					<p class="menu_title">
					Input files
					<svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" width="16" height="16" fill="currentColor" class="bi bi-question-circle input" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
					</svg>
					</p>
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
				</div>

				<div class="menu_division">
					<!--Chrom length data-->
					<div>
						<form class="my-form">
							<p class="menu_title">
							Chromosomes size and labels
							<svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" width="16" height="16" fill="currentColor" class="bi bi-question-circle chrom" viewBox="0 0 16 16">
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
							</svg>
							</p>
							<select style="width: 90%;" class="custom-select custom-select-sm" id="chromosomes">
								<option value="Chrom">Choose organism</option>
							</select>
							<br/>
							or upload your own
							<textarea id="editorChr" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
							<div class="custom-file" style="width:90%;">
								<input type="file" class="custom-file-input" id="lenFile" accept=".txt, .csv, .tab, .tsv">
								<label class="custom-file-label" for="lenFile">Choose file</label>
							</div>
							<!--Ploidy-->
							<label for="selectorploidy">Global ploidy</label>
							<select name="select" id="selectorploidy" class="custom-select-sm">
								<option value="1">1</option>
								<option value="2" selected>2</option> 
								<option value="3">3</option>
								<option value="4">4</option>
							</select>
						</form>
					</div>
				</div>

				<!--Colors data-->
				<div class="menu_division">
					<form class="my-form">
					<p class="menu_title">
					Colors (optional)
					<svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" width="16" height="16" fill="currentColor" class="bi bi-question-circle colors" viewBox="0 0 16 16">
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

				<!--Bed data-->
				<div class="menu_division">
					<form class="my-form">
					<p class="menu_title">
					Annotations (optional)
					<svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" width="16" height="16" fill="currentColor" class="bi bi-question-circle bed" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
					</svg>
					</p>
						<textarea id="editorBed" rows="3" class="form-control" placeholder="Insert values here" ></textarea>
						<div class="custom-file" style="width:90%;">
							<input type="file" class="custom-file-input" id="bedFile" >
							<label class="custom-file-label" for="bedFile">Choose file</label>
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
					<button id="submit" class="btn btn-sm btn-outline-success my-btn">Submit</button>
						<!--Clear-->
					<button class="btn btn-sm btn-outline-danger" onclick="location.reload(true);" id="clear">Clear</button>
					
					<!-- Update -->
					<button class="btn btn-sm btn-outline-primary" id="reload">Update image</button>

				</div>
				<div>
					<!--Download image-->
					<button id="download" style="display: none;" class="btn btn-sm btn-outline-dark" id="reload">Download data and image</button>
				</div>

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

<div id="home" class="container">

	<div id="welcome">

		<!--JUMBOTRON-->
		<div class="jumbotron jb_welcome">
		<h1 class="display-2">Welcome to GeMo</h1><br/>
	</div>
	</div> <!--fin du jumbotron-->
	<div id="md">
		<zero-md src="README.md"></zero-md>
	</div>
</div><!--fin du home-->
	
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

<div class="tooltip_templates" >
	<span id="tooltip_blocOrCurve">
		<pre>
Mosaic visualization shows colored blocs on the chromosomes:
<img class="tooltip_img" src="./public/img/bloc.png"></img>

Data curation displays the ancestral components along the chromosomes 
on an interactive graph to help the mosaïc construction:
<img class="tooltip_img" src="./public/img/curve.png"></img>

		<pre>
	</span>
</div>
<div class="tooltip_templates" >
	<span id="tooltip_preloaded">
		<pre>
Preloaded data generated with VCFHunter and TraceAncestor
		<pre>
	</span>
</div>
<div class="tooltip_templates" >
	<span id="tooltip_your_data">
		<pre>
Generate a visualization with your custom chromosomes data.
		<pre>
	</span>
</div>
<div class="tooltip_templates" >
	<span id="tooltip_help">
		<pre>
Chromosome data format, each column tab separated
chr, len, centromereInf (optional), centromereSup (optional), label (optional)
example :
chr	len	centromereInf	centromereSup	label
chr01	37945898			AB
chr02	34728925		11000000	AB
chr03	40528553	15000000		AB
chr04	44598304	13000000	22000000	AB
chr05	46248384	23000000	26000000	AB
chr06	42818424	23000000	27000000	AB
chr07	38870123	20000000	23000000	AB
chr08	50124231	21000000	25000000	AB
chr09	47435180	25000000	29000000	AB
chr10	39038070	12000000	16000000	AB
chr11	34441343	15000000	20000000	AB
		<pre>
	</span>
</div>	
<div class="tooltip_templates" >	
	<span id="tooltip_input">
		<pre>
Enter a block file to display the mosaïc visualization :

chr	haplotype	start	end	ancestral_group
01	0	1	29070452	g4
01	1	1	29070452	g4
02	0	1	29511734	g4
02	1	1	29511734	g4

<img class="tooltip_img" src="./public/img/bloc.png"></img>

Enter a file containing the ancestral components along the chromosomes to display an interactive graph and generate a new mosaïc visualisation :

chr	start	end	V	T	S
chr01	1145	189582	0.001671983513048138	0.014082301923852172	0.0016386866759508464
chr01	189593	356965	0.0012441961973068657	0.012867234592909085	0.0018101312755326665
chr01	356968	488069	0.0011179557674005532	0.010035172902205201	0.000759432489203596
chr01	488097	633373	0.002678217164025965	0.010470727908771585	0.003896031529700906

<img class="tooltip_img" src="./public/img/curve.png"></img>

Generating datasets
In order to generate ready-to-use datasets, analyses can be conducted with the following software:

* VCFHunter
VCFHunter is a suite of python scripts enabling chromosome painting of indivisual based on the contribution of ancestral groups using VCF files.
Please look at the tutorial: https://github.com/SouthGreenPlatform/VcfHunter/blob/master/turorial_painting_GEMO_visualization.md

* TraceAncestor
TraceAncestor permits to estimate the allelic dosage of ancestral alleles in hybrid individuals and then to perform chromosom painting.
Please look at the tutorial: https://github.com/SouthGreenPlatform/TraceAncestor_gemo
		<pre>
	</span>
</div>
<div class="tooltip_templates" >	
	<span id="tooltip_colors">
		<pre>
group	name	hex
un	undef_group	#b4b4b4
g6	group6	#c00000
g5	group5	#9a029a
g3	group3	#1440cd
g2	group2	#ffc000
g1	group1	#000000
g4	group4	#00b009
g7	group7	#b4b4b4
g0	group0	#000000

		<pre>
	</span>
</div>
<div class="tooltip_templates" >	
	<span id="tooltip_bed">
		<pre>
bed file example :
chr01	5287838	5289224	gene	0	-
chr01	15485703	15486813	gene	0	+
chr01	15490016	15492587	gene	0	+
chr02	2276353	2277821	gene	0	+
chr02	15358393	15361764	gene	0	+
		<pre>
	</span>
</div>






</body>
</html>

