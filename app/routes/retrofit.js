var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var http = require('http').createServer(app);
var path = require('path');

let remote = "stop";
 var port = 8888;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views' ,__dirname + '/views');
app.use(express.static(path.join(__dirname,'/views/camera')));


app.get('/', function (req,res) {
    console.log('Raspberry 서버 ');
    res.send("stop");
    });

app.get('/get', function (req, res) {
    console.log('GET 호출 / data : ' + req.query.data);
    console.log('path : ' + req.path);
    res.send('get success')
    // if (req.body.data == "go") {
    //     app.post('/', function (req,res) {
    //         console.log('go');
    //         res.send("go");
    //     });
    // }
    // else if (req.body.data == "back") {
    //     app.post('/', function (req,res) {
    //         console.log('back');
    //         res.send("back");
    //     });
    // }
    // else if (req.body.data == "right") {
    //     app.post('/', function (req,res) {
    //         console.log('right');
    //         res.send("right");
    //     });
    // }
    // else if (req.body.data == "left") {
    //     app.post('/', function (req,res) {
    //         console.log('left');
    //         res.send("left");
    //     });
    // } else {
    //     app.post('/', function (req,res) {
    //         console.log('stop');
    //         res.send("stop");
    //     });
    // }
});

router.post('/post', function (req, res) {
    console.log('POST 호출 / data : ' + req.body.data);
    console.log('path : ' + req.path);
    res.send('post success') 
    // if (req.body.data == "go"){
    //     remote = "go";
    // }
    // else if (req.body.data == "back"){
    //     remote = "back";
    // }
    // else if (req.body.data == "right"){
    //     remote = "right";
    // }
    // else if (req.body.data == "left"){
    //     remote = "left";
    // }else{
    //     remote="stop";
    // }
});

// app.post('/camera', (req, res) => {
//     res.render('camera');
//     // var msg=req.body.msg;
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//     res.write('<script>document.getElementById("temp").value = msg;</script>');
  
//     res.end();
//   })
  
  

  app.listen(port, function () {
    console.log('Smart Lamp Server app listening on port ' + port);
    });

module.exports = router;