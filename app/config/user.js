
var mySql = require('mysql');



const client = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    port : '3306',
    // password : '',
    database : 'project',
    // table : 'user'
});

let mysql = mySql.createConnection(info)

mysql.connect((error)=> {
    if(error){
        console.log("DB 연동 실패 : ", error)
    }
    else {
        console.log("DB 연동 성공!")
    }
})

module.exports = {
    mysql, info, router
}