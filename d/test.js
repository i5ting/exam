var express = require('express');
var indexutils = require('./indexutils');

var BufferHelper = require('bufferhelper');

var debug = false;
// var debug = true;

/* GET home page. */

var o = "{\"is_ad\":\"false\",\"name\":\"啥玩意儿专业八级考试\",\"count\":0,\"desc\":\"国寿友情提示：不准携带通讯工具，不准交头接耳、 一经发现，取消考试成绩，并终生禁止再次参与本考试！一定要记得哦！\",\"weixinName\":\"智楠金柜\",\"weixinId\":\"188888888\",\"questions\":[{\"label\":\"单选4\",\"answers\":[{\"label\":\"萨顶顶\",\"is_answer\":false},{\"label\":\"水电费\",\"is_answer\":true},{\"label\":\"色温\",\"is_answer\":false},{\"label\":\"问问\",\"is_answer\":false}]},{\"label\":\"单选2\",\"answers\":[{\"label\":\"打算减肥了\",\"is_answer\":true},{\"label\":\"速度\",\"is_answer\":false}]},{\"label\":\"多选4\",\"answers\":[{\"label\":\"圣诞节快放假了\",\"is_answer\":true},{\"label\":\"的方式框架\",\"is_answer\":true},{\"label\":\"水电费发生的\",\"is_answer\":false},{\"label\":\"2323\",\"is_answer\":false}]},{\"label\":\"多选2\",\"answers\":[{\"label\":\"ewer\",\"is_answer\":true},{\"label\":\"是否\",\"is_answer\":true}]}]}"
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
	
	var template = indexutils.template_compile(source,{
		debug: false,
		show_subscribe_btn:false,
		show_question_title_tip:false,
		shartToYourFriendsTitle:"炫耀一下",
		is_show_result_with_share:false
	});

	// new 
	var new_obj = indexutils.mid_processing(i);
	var dddd = template(new_obj);

	console.log(dddd);


   	var ws1 = fs.createWriteStream('public/dataStream.html', { encoding: "utf8" })

   	ws1.write(dddd);
   	ws1.end();
});
//
