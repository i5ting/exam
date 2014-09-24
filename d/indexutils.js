var Handlebars = require('handlebars');

function mid_processing(origin_obj) {
	var _obj = origin_obj;
	
	// 设置问题类型:0无，1单选，2多选
	function _set_question_type(question){
		var question_type = '0'
		var question_type_desc = '无'
		
		if(right_answer_count == 0){
			console.log('没有任何正确答案的题目，做个毛线呀');
		}else if(right_answer_count == 1){
			question_type = '1'
			question_type_desc = '单选'
		}else{
			question_type = '2'
			question_type_desc = '多选'
		}
		
		question.type = question_type;	
		question.type_desc = question_type_desc;
	}
	
	// 设置问题答案个数
	function _set_answers_count(question){
		question.answers_count = question.answers.length;
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
		
		answer.label = ' ' + iToChar(i) + ' '+ answer.label
		
		return answer;
	}
	
	for(var i = 0;i < _obj.questions.length; i++){
		
 	   	var question = _obj.questions[i];
		var answers = question.answers;
		
		var right_answer_count = 0;
		
		question.right_answer_array = [];
		
		for(var j = 0;j < answers.length; j++){
			var answer = answers[j];
			
			if (answer.is_answer) {
				right_answer_count ++;
				question.right_answer_count = right_answer_count;
				question.right_answer_array.push(j + 1);
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

function template_compile(source,debug){
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
			  	+ "<a class='btn btn-info btn-block question_next_btn'>下一个</a>"
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
	
	return template;
}

module.exports = {
	'mid_processing' 	: 	mid_processing,
	'template_compile' 	: 	template_compile
}