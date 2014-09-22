var express = require('express');

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
	var new_obj = mid_processing(i);
	var dddd = template(new_obj);



console.log(dddd);


   	var ws1 = fs.createWriteStream('public/dataStream.html', { encoding: "utf8" })

   	ws1.write(dddd);
   	ws1.end();
});
//

function mid_processing(origin_obj) {
	var _obj = origin_obj;
	
	// 设置问题类型:0无，1单选，2多选
	function _set_question_type(question){
		var question_type = '0'
		
		if(right_answer_count == 0){
			console.log('没有任何正确答案的题目，做个毛线呀');
		}else if(right_answer_count == 1){
			question_type = '1'
		}else{
			question_type = '2'
		}
		
		question.type = question_type;	
	}
	
	// 设置问题答案个数
	function _set_answers_count(question){
		question.answers_count = question.answers;
	}
	
	// 设置答案前占位符号
	function _set_answer_begin_symbol(answer, i){
		
		function iToChar(z){
			switch(z)
			{
				case 0:
				  return "A";
				  break;
				case 1:
				  return "B";
				  break;
				case 2:
				  return "C";
				  break;
				case 3:
				  return "D";
				  break;
				case 4:
				  return "E";
				  break;
				default:
			 	
			} 
		}
		
		answer.label =  iToChar(i) + ' '+ answer.label
		
		return answer;
	}
	
	for(var i = 0;i < _obj.questions.length; i++){
		
 	   	var question = _obj.questions[i];
		var answers = question.answers;
		
		var right_answer_count = 0;
		
		
		for(var j = 0;j < answers.length; j++){
			var answer = answers[j];
			
			if (answer.is_answer) {
				right_answer_count ++;
				question.right_answer_count = right_answer_count;
			}
			
			// 设置答案前占位符号
			_set_answer_begin_symbol(answer, j);	
		}
		
		_set_answers_count(question);// 设置问题答案个数
		_set_question_type(question);// 设置问题类型:0无，1单选，2多选
		
	}
	
	console.log(_obj);
	
	return _obj;
}