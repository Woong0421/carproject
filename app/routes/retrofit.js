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
});

router.post('/post', function (req, res) {
    console.log('POST 호출 / data : ' + req.body.data);
    console.log('path : ' + req.path);
    res.send('post success') 
});
  app.listen(port, function () {
    console.log('Smart Lamp Server app listening on port ' + port);
    });

module.exports = router;