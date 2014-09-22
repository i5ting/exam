var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');
var uuid = require('node-uuid');
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
	 
	  
	 // Generate a v1 (time-based) id
	var pid = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
	
	var rs = fs.createReadStream('public/template.html', {encoding: 'utf-8', bufferSize: 11});
	var bufferHelper = new BufferHelper();

	rs.on("data", function (trunk){
		bufferHelper.concat(trunk);
	});

	rs.on("end", function () {
		var source = bufferHelper.toBuffer().toString();
		var template = Handlebars.compile(source);

		console.log(source + i);

		var template = Handlebars.compile(source);
		var dddd = template(i);
				
	   	var ws1 = fs.createWriteStream('public/'+pid+'.html', { encoding: "utf8" })

	   	ws1.write(dddd); 
	   	ws1.end(); 
	});
	//
	res.render('index', { title: 'Express' ,uuid:pid});
 
});

router.post('/', function(req, res) {
	 
 
});

module.exports = router;
