// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// var request = require('request');
// var app = express();
// var http = require('http').createServer(app);
// var path = require('path');

// let remote = "stop";
// var port = 8888;


// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended:false}));

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
// app.set('views' ,__dirname + '/views');
// app.use(express.static(path.join(__dirname,'/views/camera')));

// app.get('/handle', (req, res) => {
//     res.send(remote);
// })

// app.get('/stop', (req, res) => {
//     remote = "stop";
//     res.end();
// })

// app.get('/go', (req, res) => {
//     remote = "go";
//     res.end();
// })

// app.get('/right', (req, res) => {
//     remote = "right";
//     res.end();
// })

// app.get('/back', (req, res) => {
//     remote = "back";
//     res.end();
// })

// app.get('/left', (req, res) => {
//     remote = "left";
//     res.end();
// })
// app.listen(port, function () {
//     console.log('Smart Lamp Server app listening on port ' + port);
//     });

// module.exports = router;