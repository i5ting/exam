var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
	
	if(req.query['name']=='upload'){
		console.log(sss);
	}
	
}).listen(3001);