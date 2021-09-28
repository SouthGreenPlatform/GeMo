const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const path = require('path');


app.use(bodyParser.urlencoded({extended: true})); //je crois que ça me permet de lire le body de ma requête ajax dans parse.js sendFile()..
app.use(bodyParser.json()); //donc je le laisse là.
app.use(express.static(__dirname));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});







server=app.listen(9070,function() {});


// ajout de socket.io
const io = require('socket.io')(server, {
	cors: {
	origin: "*",
	credentials: true  }
});

io.on('connection', socket => {
	console.log( `Nouveau visiteur : ${socket.id}` );

    const progPath = '/opt/projects/VisuSNP/htdocs/gemo/python/';
	const workingPath = '/opt/projects/VisuSNP/htdocs/gemo/tmp/gemo_run/';
	const analysisDir = workingPath + 'gemo_' + socket.id +'/';
    fs.mkdirSync(analysisDir);
    //run chrom config
	socket.on('run', (tsv, callback) => {
		console.log("run tsv");

        //upload le tsv dans les fichier temp avec uniq id
        fs.writeFile(analysisDir+'musa-acuminata.tsv', tsv, {encoding:'utf8', flag : 'w+' }, function (err) {
            //err
            if (err) return console.log("error write file "+err);
            
            //success
            console.log("musa-acuminata.tsv uploaded to : "+analysisDir);
            
            //go to analysis directory
            try {
                process.chdir(analysisDir);
                console.log(`New directory: ${process.cwd()}`);
            } catch (err) {
                console.error(`chdir: ${err}`);
            }

            const { exec } = require("child_process");
            exec(`python ${progPath}convert_band_data_socket.py`, (error, stdout, stderr) => {
                console.log(`python ${progPath}convert_band_data_socket.py`);
                if (error) {
                    console.error(`exec error: ${error}`);
                }
                console.log(`stdout: ${stdout}`);
                callback(null, socket.id);
            });

		});
	});

    socket.on ( "disconnect" , function (){
        function rimraf(dir_path) {
            if (fs.existsSync(dir_path)) {
                fs.readdirSync(dir_path).forEach(function(entry) {
                    var entry_path = path.join(dir_path, entry);
                    if (fs.lstatSync(entry_path).isDirectory()) {
                        rimraf(entry_path);
                    } else {
                        fs.unlinkSync(entry_path);
                    }
                });
                fs.rmdirSync(dir_path);
                console.log("cleaning "+ dir_path);
            }
        }
        rimraf(analysisDir);
    });


    /* app.post('/upload', function(req, res){

        data = JSON.stringify(req.body.data);

        fs.writeFile('data/bands/ncbi/musa-acuminata.tsv', JSON.parse(req.body.data), function (err) {
            if (err) return console.log(err);
            console.log("musa-acuminata.tsv uploaded to : data/bands/ncbi/");
        });

        res.contentType('string');
        res.send("Apparement je dois répondre quelque chose à ma requête ajax.. alors je pose ça là : 'Lourd est le parpaing de la réalité sur la tartelette aux fraises de nos illusions.' - Boulet");
    }); */

    app.get('/',function(req,res) {
        res.sendFile(path.join(__dirname+'/index.html'));
    });

    /* app.get('/run_convert_band_data.py', (req, res) => {

        let dataToSend;

        let spawn = require("child_process").spawn;
        let python = spawn('python', ["python/convert_band_data.py"]);
        // spawn new child process to call the python script
        // collect data from script
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            console.log(dataToSend);
            // send data to browser
            res.send(dataToSend)
        });

    }); */

    

});