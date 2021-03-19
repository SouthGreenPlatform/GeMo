<!DOCTYPE html> 
<html>
<head> 
  <title>GEMO</title>
  <meta charset="utf-8">

  <!--Bootstrap 4.4-->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  
<link href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/sandstone/bootstrap.min.css" rel="stylesheet" integrity="sha384-ABdnjefqVzESm+f9z9hcqx2cvwvDNjfrwfW5Le9138qHCMGlNmWawyn/tt4jR4ba" crossorigin="anonymous">  
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.1.1/d3.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/ideogram@1.16.0/dist/js/ideogram.min.js"></script>
 
   <!--Tooltipster-->
   <link rel="stylesheet" type="text/css" href="src/tooltipster/dist/css/tooltipster.bundle.min.css" />
<script type="text/javascript" src="src/tooltipster/dist/js/tooltipster.bundle.min.js"></script>

 
 <script src="src/main.js"></script>
 <script type="text/javascript" src="src/html2canvas.js"></script>
 <script type="text/javascript" src="src/canvas2image.js"></script>

 <script src="https://d3js.org/d3-axis.v1.min.js"></script>


 
 <link rel="stylesheet" type="text/css" href="src/css/gemo.css">
 
<link rel="shortcut icon" href="/gemo/public/img/favicon.ico">


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
		  <li>
			<a class="accordion-toggle collapsed toggle-switch" data-toggle="collapse" href="#submenu-1">
							<span class="sidebar-icon"><i class="fa fa-dashboard"></i></span>
							<span class="sidebar-title">Data</span>
			  <b class="caret"></b>
						</a>
			
			<ul id="submenu-1" class="panel-collapse collapse panel-switch" role="menu">
			  
			  <!-- select accessions-->
			  <li>
				<div class="form-group">
				  <label for="selectAccession">Accession</label>
				  <select onchange="load_accession(this.value);" class="form-control-sm" id="selectAccession">
					<option value=""></option>
					<option value="Visuchromp">Visuchromp</option>
					<option value="Banksii620">Banksii620</option>
					<option value="Banksii853">Banksii853</option>
					<option value="Borneo">Borneo</option>
					<option value="Calcutta4">Calcutta4</option>
					<option value="Chicame">Chicame</option>
					<option value="Galeo">Galeo</option>
					<option value="GrandeNaine">GrandeNaine</option>
					<option value="GuNinChiao">GuNinChiao</option>
					<option value="Guyod">Guyod</option>
					<option value="KhaePhrae">KhaePhrae</option>
					<option value="Kirun">Kirun</option>
					<option value="LongTavoy">LongTavoy</option>
					<option value="MaiaOa">MaiaOa</option>
					<option value="Mala">Mala</option>
					<option value="Manang">Manang</option>
					<option value="Microcarpa">Microcarpa</option>
					<option value="PaRayong">PaRayong</option>
					<option value="PisangKlutukWulung">PisangKlutukWulung</option>
					<option value="PisangMadu">PisangMadu</option>
					<option value="PTBA00008">PTBA00008</option>
					<option value="PTBA00267">PTBA00267</option>
					<option value="Selangor">Selangor</option>
					<option value="SF215">SF215</option>
					<option value="THA018">THA018</option>
				  </select>
				  
				  <!--Accessions data-->
				  
				  <textarea id="editorAnnot" rows="5" class="form-control" placeholder="Insert values here" ></textarea>
				  
				  <!--Load accession file-->
				  
				  <!--<label for="fileInputD" class="control-label">Load custom data</label>-->
				  <input class="btn" onchange="load_file2(this.value)" type="file" id="fileInputD">
				  
				  <!--Chromosomes data-->
				  <label for="editorChr" class="col-lg-2 control-label">Chromosomes</label>
				  <textarea id="editorChr" rows="5" class="form-control" placeholder="Insert values here"></textarea>
				  
				  <!--Load chromosome file-->
				  <!--<label for="fileInputC" class="control-label">Load custom data</label>-->
				  <input class="btn" onchange="load_file(this.value)" type="file" id="fileInputC">
          
				  <label for="selectAccession">Ploïdie</label>
				  <select name="select" id="selectorploidy" class="form-control-sm" onchange="loadingon()">
					<option value="2" selected>2</option> 
					<option value="3">3</option>
					<option value="4">4</option>
				  </select>
				  <br />
				  
				  <!--Letters show / hide-->
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="SwitchLetters" checked onchange="displaytext()">
            <label class="custom-control-label" for="SwitchLetters">Show letters</label>
          </div>
				  <br />
				  
				  <!--Clear-->
				  <button class="btn btn-warning" onclick="location.reload(true);" id="clear">Clear</button>
				  
				  <!-- Update -->
				  <button class="btn btn-primary" onclick="update();" id="reload">Update image</button>

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
		  
		  <!--CHROMOSOMES-->
		  <li>
						<a class="accordion-toggle collapsed toggle-switch" data-toggle="collapse" href="#submenu-2">
							<span class="sidebar-icon"><i class="fa fa-users"></i></span>
							<span class="sidebar-title">Chromosomes</span>
							<b class="caret"></b>
						</a>
						<ul id="submenu-2" class="panel-collapse collapse panel-switch" role="menu">

							<li id="potatosalad">

						  </li>
			</ul>
					</li>
		  
		  <!--Accessions-->
					<li>
						<a class="accordion-toggle collapsed toggle-switch" data-toggle="collapse" href="#submenu-3">
							<span class="sidebar-icon"><i class="fa fa-newspaper-o"></i></span>
							<span class="sidebar-title">Accessions</span>
							<b class="caret"></b>
						</a>
						
					</li>
		  
		  <!--DATA-->
					<li>
						<a href="#">
							<span class="sidebar-icon"><i class="fa fa-database"></i></span>
							<span class="sidebar-title">Data</span>
						</a>
					</li>
		  
		  <!--CONSOLE-->
					<li>
						<a href="#">
							<span class="sidebar-icon"><i class="fa fa-terminal"></i></span>
							<span class="sidebar-title">Console</span>
						</a>
					</li>
				</ul>
			</aside>            
		</div>
	<!-- fin de la sidebar -->
	
		<main id="page-content-wrapper" role="main" class="ideo_container">
	  <!-- The ideogram goes here. -->
		</main>
	</div> 
	<div class="tooltip_templates" id="tooltip_content">
		<span>
			<a href="https://banana-genome-hub.southgreen.fr/jbrowse_ma2/?loc=chr01:24139214..24142797">
				view in banana jbrowse
			</a>
		</span>
	</div>








</body>
</html>

