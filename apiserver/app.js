// 패키지 Loading
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// mongoose 라이브러리 설정
var db = mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
//    몽구스 db서버에 연결
    console.log("DB서버에 연결 완료");
});
mongoose.connect('mongodb://localhost/mongodb_game');

//model 정의.
var Monster = require('./models/monster');

// bodyparser를 위한 설정
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 서버 포트 설정
var port = process.env.PORT || 8001;

// 라우터 설정
var router = require('./routes')(app,Monster);

// [서버 실행]
var server = app.listen(port,function(){
    console.log("Express server start port = " + port);
});

