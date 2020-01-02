var http = require("http"); //http request
var fs = require('fs'); //파일 입출력 시스템
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./dbconnect.js');


app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// db();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: '@#@$BOGUENSONG$@#',
    resave: false,
    saveUninitialized: true


}))
//secret : 쿠키를 임의변조하는것을 방지하기 위한 sign값.
//resave : 세션을 언제나 저장할지 정하는 값.(false 권장)
//saveU~ : 새로 생겼지만, 변경되지 않은 세션을 의미. (true 권장)
app.listen(8081, () =>{
    console.log('Express App on port 8081!');
})

var router = require('./router/main')(app, fs);


console.log("server running at http://localhost:8081");
