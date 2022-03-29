const fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const FileStore = require('session-file-store')(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');
var ejs = require('ejs');
const http = require('http');
var createError =require('http-errors');
var logger = require('morgan');

let remote = "stop";
let msg = 0;
let msh = 0;

//var retrofitRouter = require('./routes/retrofit');
//var indexRouter = require('./routes2/index');
const { Console } = require('console');
const router = express.Router();

// express 설정 1
var app = express();
const server = http.createServer(app);

// db 연결 2

const client = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    port : '3306',
    database : 'project'
});

app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store : new FileStore // 세션이 데이터를 저장하는 곳
}));

// 정적 파일 설정 (미들웨어) 3
app.use(express.static(path.join(__dirname,'/app/config')));
//app.use('/retrofit', retrofitRouter);


// ejs 설정 4
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views' ,__dirname + '/views');

// 정제 (미들웨어) 5
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());        // 쿠키 (미들웨어) 6

// 메인페이지
app.get('/',(req,res)=>{
    console.log('메인페이지 작동');    
    
    if(req.session.is_logined == true){
        res.render('index',{
            is_logined : req.session.is_logined,
            name : req.session.name
        });
    }else{
        res.render('index',{
            is_logined : false
        });
    }
});

// 로그인
app.get('/login',(req,res)=>{
    console.log('로그인 작동');
    res.render('login');
});

app.post('/login',(req,res)=>{
    var body = req.body;
    var id = body.id;
    var pw = body.pw;

    client.query('select *from user where id = ?',[id],(err,data)=>{
        // 로그인 확인
    if(data.length===0){
            resultCode = 204;
            message = '존재하지 않는 계정입니다!';
        }else if(pw != data[0].pw){
            resultCode = 204;
            message = '비밀번호가 틀렸습니다!';
        }
        else//(id == data[0].id || pw == data[0].pw)
        {// 세션에 추가
            resultCode = 200;
            message = '로그인 성공! ' + data[0].name + '님 환영합니다!';
           
            req.session.is_logined = true;
            req.session.name = data[0].name;
            req.session.id = data[0].id;
            req.session.pw = data[0].pw;
            req.session.save(function () { // 세션 스토어에 적용하는 작업
            });
        } 

        console.log(req.get('User-Agent'));
        
        if (req.get('User-Agent').includes('okhttp')) {
            res.json({
                'code': resultCode,
                'message': message
            });    
        }
        else {
            res.render('camera', { // 정보전달
                // name: data[0].name,
                id: data[0].id,
                pw: data[0].pw,
                is_logined: true
            });
        }
});
});

// 로그아웃
app.get('/logout',(req,res)=>{
    console.log('로그아웃 성공');
    resultCode = 200;
    message = '로그아웃 되었습니다.'

    req.session.destroy(function(err){
        // 세션 파괴후 할 것들
    });
    if (req.get('User-Agent').includes('okhttp')) {
        res.json({
            'code': resultCode,
            'message': message
        });    
    }
    else {
        res.render('logout',{
        });
    }
});

// 회원가입
app.get('/register',(req,res)=>{
    console.log('회원가입 페이지');
    res.render('register');
});

app.post('/register',(req,res)=>{
    console.log('회원가입 하는중')
    var body = req.body;
    var id = body.id;
    var pw = body.pw;
    var name = body.name;
    var phonenumber = body.phonenumber;

    client.query('select * from user where id=?',[id],(err,data)=>{  
        if(data.length == 0){
            client.query('insert into user values(?,?,?,?)',[
            id, pw, name, phonenumber
            ]);
             resultCode = 200;
             message = '회원가입에 성공했습니다.';
             
             if (req.get('User-Agent').includes('okhttp')) {
                res.json({
                    'code': resultCode,
                    'message': message
                });    
            }
            else {
                res.render('register2',{                    
                });
            }
         
        }else{
            console.log('회원가입 실패');
            if(id == data[0].id){
                res.send('<script>alert("사용중인아이디 입니다.");</script>')
            }else if(phonenumber == data[0].phonenumber)
            {
            res.send('<script>alert("가입된 전화번호 입니다.");</script>')
        }else{
            res.send('<script>alert("정보를 다시확인해 주세요.");</script>')
        }
        }   
    }); 
});

app.get('/temphum', (req, res) => {
    console.log("temphum : " + msg+ " " + msh);
    res.send("temp : " + msg + ", hum : " + msh);
})

app.get('/handle', (req, res) => {
    res.send(remote);
})

app.get('/stop', (req, res) => {
    remote = "stop";
    res.end();
})

app.get('/go', (req, res) => {
    remote = "go";
    res.end();
})

app.get('/right', (req, res) => {
    remote = "right";
    res.end();
})

app.get('/back', (req, res) => {
    remote = "back";
    res.end();
})

app.get('/left', (req, res) => {
    remote = "left";
    res.end();
})

app.use(function(req,res,next){
    next(createError(404));
});

app.use(function(err,req,res,next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'? err :{};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000,()=>{
    console.log('3000 port running...');
});

module.expprts = {
    app
}
