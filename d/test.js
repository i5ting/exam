var express = require('express');
var indexutils = require('./indexutils');

var Handlebars = require('handlebars');

var BufferHelper = require('bufferhelper');

var debug = false;
var debug = true;

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
	var template = Handlebars.compile(source);

	Handlebars.registerHelper('fullName', function(obj) {
		if(debug == false){
			return "【"+ obj.type_desc+"题目】"+ obj.label
		}
	  	return "【"+ obj.type_desc+"题目】"+ obj.label + " 总共有" + obj.answers_count+ "个答案，正确答案有"+obj.right_answer_count+"个/正确答案是("+obj.right_answer_array+")";
	});
	
	
	Handlebars.registerHelper('answersTag', function(obj) {
		 // <li class='list-group-item' data-score='10' onclick='return toggle(this);'>
		 // 	<i class='glyphicon glyphicon-unchecked'></i>
		 // 	{{label}}
		 // </li>
	 	 var type = parseInt(obj.type);//问题类似
		 
		 var html = ""
		 for(var i = 0; i < obj.answers.length; i++){
			 var answer = obj.answers[i];
			 
			 if (type === 1){
				 if(answer.is_answer == true){
					 var extra = '<span></span>'
					 if(debug == true){
						 extra = "<span>答案</span>";
					 }
					 
					 html += "<li class='list-group-item' data-score='10' onclick='return toggle(this);'>"
						+  "<i class='glyphicon glyphicon-unchecked'>"+extra+"</i>"
						+  answer.label
						+ "</li>";
				 }else{
					 html += "<li class='list-group-item' data-score='10' onclick='return toggle(this);'>"
						+  "<i class='glyphicon glyphicon-unchecked'></i>"
						+  answer.label
						+ "</li>";
				 }
				 
			 }
			 
			 if (type === 2){
				 if(answer.is_answer == true){
					 var extra = '<span></span>'
					 if(debug == true){
						 extra = "<span>答案</span>";
					 }
					 
					 html += "<li class='list-group-item' data-score='10' onclick='return toggle_only(this);'>"
						+  "<i class='glyphicon glyphicon-unchecked'>"+extra+"</i>"
						+  answer.label
						+ "</li>";
				 }else{
					 html += "<li class='list-group-item' data-score='10' onclick='return toggle_only(this);'>"
						+  "<i class='glyphicon glyphicon-unchecked'></i>"
						+  answer.label
						+ "</li>";
					 
				 }
			 }
			 
			 if (type === 0){
			 	html += "<h1>没有答案</h1>";
			 }
			 
			 
		 }
	 
	  	 return  new Handlebars.SafeString(html);
	});
	
	Handlebars.registerHelper('qustionBottomTag', function(question) {
		// <div class='buttons buttons2'>
		// 	  		<a href='http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd' class='btn btn-danger btn-danger2 btn-block'>
		// 	  		一键关注
		// 	  		</a>
		// 	  	</div>
		var type = parseInt(question.type);//问题类似
		
		var html = '';
		
		if (type === 0){
			
		}
		
		if (type === 1){
			
		}
		
		if (type === 2){
			html += "<div class='buttons buttons2'  onclick='return next_btn(this);'>"
			  	+ "<a class='btn btn-info btn-block'>下一个</a>"
				+ "</div>";
		}
		
		html += "<div class='buttons buttons2'>"
			+ "	<a href='http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd' class='btn btn-danger btn-danger2 btn-block'>"
		  	+ "一键关注"
			+ "</a>"
			+ "</div>";
		
		return  new Handlebars.SafeString(html);
	});
	

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
