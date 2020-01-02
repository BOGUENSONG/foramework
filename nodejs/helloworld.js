var http = require("http"); //http request
var fs = require('fs'); //파일 입출력 시스템

http.createServer(function(request, response){

    var url = request.url;
    if (request.url == '/'){
        url = '/index.html';
    }
    if (request.url == '/favicon.ico') {
        response.writeHead(404);
        response.end('Not found');
    }
 /*
    http 헤더 전송
    http status: 200 : OK
  */
 response.writeHead(200);

 /*
    Response Body를 url로 설정.
  */
 response.end(fs.readFileSync(__dirname + url));
}).listen(8081);

console.log("server running at http://localhost:8081");
