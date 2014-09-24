var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');
var uuid = require('node-uuid');
var BufferHelper = require('bufferhelper');

var indexutils = require('../indexutils');
var debug = false;
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

		Handlebars.registerHelper('fullName', function(obj) {
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
						 html += "<li class='list-group-item' data-score='10' onclick='return toggle(this);'>"
							+  "<i class='glyphicon glyphicon-unchecked'><span>答案</span></i>"
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
						 html += "<li class='list-group-item' data-score='10' onclick='return toggle_only(this);'>"
							+  "<i class='glyphicon glyphicon-unchecked'><span>答案</span></i>"
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
