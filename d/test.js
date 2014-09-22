var express = require('express');
var indexutils = require('./indexutils');

var Handlebars = require('handlebars');

var BufferHelper = require('bufferhelper');

/* GET home page. */

var o = "{\"is_ad\":\"false\",\"name\":\"啥玩意儿专业八级考试\",\"count\":0,\"desc\":\"国寿友情提示：不准携带通讯工具，不准交头接耳、 一经发现，取消考试成绩，并终生禁止再次参与本考试！一定要记得哦！\",\"weixinName\":\"智楠金柜\",\"weixinId\":\"188888888\",\"questions\":[{\"label\":\"智楠金柜\",\"answers\":[{\"label\":\"大师傅\",\"is_answer\":false},{\"label\":\"速度多少\",\"is_answer\":true},{\"label\":\"大声道\",\"is_answer\":false},{\"label\":\"阿斯顿\",\"is_answer\":false}]},{\"label\":\"桑世龙\",\"answers\":[{\"label\":\"人数啊\",\"is_answer\":false},{\"label\":\"水电费是\",\"is_answer\":false},{\"label\":\"都是啥地方\",\"is_answer\":false},{\"label\":\"啊\",\"is_answer\":true}]}]} ";
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
