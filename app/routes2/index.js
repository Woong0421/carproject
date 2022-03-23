// var express = require("express");
// var bodyParser = require("body-parser");
// var app = require("express");
// var router = express.Router();
// var http = require('http').createServer(app);
// var path = require('path');

// var app = express();
// var port = 8888;



// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended : false}));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
// app.set('views' ,__dirname + '/views');
// app.use(express.static(path.join(__dirname,'/views/camera')));

// app.get('/', function (req,res) {
// console.log('Raspberry 서버 ');
// res.send("Raspberry 서버 통신중");
// });


// //파이로부터 1초마다 호출됨

// // app.get('/smartLamp', function(req,res) {
// // if(isData) {
// // isData = false; //한번 데이터 출력한 후 초기화
// // res.send(longtext);
// // }
// // else {
// // res.send(go);
// // }
// // });

// app.get('/handle', (req, res) => {
//     res.send(remote);
//   })
  
//   app.get('/stop', (req, res) => {
//     remote = "stop";
//   })
  
//   app.get('/go', (req, res) => {
//     remote = "go";
//   })
  
//   app.get('/right', (req, res) => {
//     remote = "right";
//   })
  
//   app.get('/back', (req, res) => {
//     remote = "back";
//   })
  
//   app.get('/left', (req, res) => {
//     remote = "left";
//   })

//     app.listen(port, function () {
//     console.log('Smart Lamp Server app listening on port ' + port);
//     });

//     module.exports = {
//         router
//     };