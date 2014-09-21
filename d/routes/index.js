var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');

var BufferHelper = require('bufferhelper');

/* GET home page. */
router.get('/', function(req, res) {
	
	console.log(req.query);
	
 
    var o = req.query.data
    var i = JSON.parse(o);
	console.log( i );
	
	 var fs = require('fs');
 	 
	 var ws = fs.createWriteStream('public/dataStream.json', { encoding: "utf8" })

	 ws.write(o); 
	 ws.end(); // 目前和destroy()和destroySoon()一样 
	 
	 
	var source = bufferHelper.toBuffer().toString();
	var template = Handlebars.compile(source);
	
	
	var rs = fs.createReadStream('res/template.html', {encoding: 'utf-8', bufferSize: 11}); 
	var bufferHelper = new BufferHelper();

	rs.on("data", function (trunk){
			bufferHelper.concat(trunk);
	});

	rs.on("end", function () {
		var source = bufferHelper.toBuffer().toString();
		var template = Handlebars.compile(source);

	});
	
	 res.render('index', { title: 'Express' });
 
});

router.post('/', function(req, res) {
	 
 
});

module.exports = router;
