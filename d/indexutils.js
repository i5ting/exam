
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

module.exports = {
	'mid_processing' : mid_processing
}