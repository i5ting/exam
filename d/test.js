var express = require('express');
var indexutils = require('./indexutils');

var Handlebars = require('handlebars');

var BufferHelper = require('bufferhelper');

/* GET home page. */

var o = "{\"is_ad\":\"false\",\"name\":\"ekzhi 考试\",\"count\":0,\"desc\":\"kezhi\",\"weixinName\":\"kezhi\",\"weixinId\":\"sfsdsf\",\"questions\":[{\"label\":\"kezhi \",\"answers\":[{\"label\":\"sdf\",\"is_answer\":true},{\"label\":\"sdf\",\"is_answer\":true},{\"label\":\"sdf\",\"is_answer\":false}]},{\"label\":\"智楠sddssd柜\",\"answers\":[{\"label\":\"dssdds\",\"is_answer\":true},{\"label\":\"sddssd\",\"is_answer\":false},{\"label\":\"aaaa\",\"is_answer\":true},{\"label\":\"q\",\"is_answer\":false}]}]} "
var i = JSON.parse(o);
console.log( i );

var fs = require('fs');

var ws = fs.createWriteStream('public/dataStream.json', { encoding: "utf8" })

ws.write(o);
ws.end(); // 目前和destroy()和destroySoon()一样



var rs = fs.createReadStream('public/template.html', {encoding: 'utf-8', bufferSize: 11});
var bufferHelper = new BufferHelper();

rs.on("data", function (trunk){
	bufferHelper.concat(trunk);
});

rs.on("end", function () {
	var source = bufferHelper.toBuffer().toString();
	var template = Handlebars.compile(source);

	

	var template = Handlebars.compile(source);
	
	// new 
	var new_obj = indexutils.mid_processing(i);
	var dddd = template(new_obj);



	console.log(dddd);


   	var ws1 = fs.createWriteStream('public/dataStream.html', { encoding: "utf8" })

   	ws1.write(dddd);
   	ws1.end();
});
//
