var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var BufferHelper = require('bufferhelper');

var indexutils = require('../indexutils');

var debug = false;
var debug = true;

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
		var template = indexutils.template_compile(source,debug);
	
		// new 
		var new_obj = indexutils.mid_processing(i);
		var dddd = template(new_obj);
		
	   	var ws1 = fs.createWriteStream('public/html/'+pid+'.html', { encoding: "utf8" })

	   	ws1.write(dddd); 
	   	ws1.end(); 
		
		var open = require("open");
		open("http://127.0.0.1:3000/html/"+pid+".html");
	});
	//
	res.render('index', { title: 'Express' ,uuid:pid});
 
});

router.post('/', function(req, res) {
	 
 
});

module.exports = router;
