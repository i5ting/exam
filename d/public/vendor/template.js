var user_answer_arr = []
var debug = true
var user_answer_dic = {
	
}

function play(url){
	var audio = document.createElement('audio');
	var source = document.createElement('source');
	source.type = "audio/mpeg";
	source.type = "audio/mpeg";
	source.src = url;
	source.autoplay = "autoplay";
	source.controls = "controls";
	audio.appendChild(source);
	audio.play();
	$('.btn').hide();
	$('.stop').show();
}
// var audio = new Audio();

var tScore = 0;
var scoreArr = new Array();
    scoreArr[0] = 0;
    scoreArr[1] = 10;
    scoreArr[2] = 20;
    scoreArr[3] = 30;
    scoreArr[4] = 40;
    scoreArr[5] = 50;
    scoreArr[6] = 60;
	scoreArr[7] = 70;
	scoreArr[8] = 80;
	scoreArr[9] = 90;
	
function next(t){
    //console.log(t);
    $(".panel-body").hide();
    var $_this = $(".js_answer").eq(t);
        $_this.show();
    var type = $_this.attr('data-type');
    if(type==2){
        // audio.src = $_this.find('audio').attr('src');
        // audio.load();
        // audio.play();
        $('#sicon').html('<span class="glyphicon glyphicon-headphones"></span>');
    }
    else if(type==1){
        // stop = true;
        // audio.pause();
        $('#sicon').html('<span class="glyphicon glyphicon-picture"></span>');
    }
    else{
        // stop = true;
        // audio.pause();
        $('#sicon').html('<span class="glyphicon glyphicon-pencil"></span>');
    }
}

function result(t){
    console.log("得分"+tScore);
    $(".panel-body").hide();
    for (var i = scoreArr.length - 1; i >= 0; i--) {
        if ( parseInt(t) >= parseInt(scoreArr[i]) ) {
            console.log("应该弹"+i);
			
			if(i==0){
				$(".js_result").eq(-0).show();
			}else{
				$(".js_result").eq(i).show();
			}
            
            if(i>(total/2)){
                $('#sicon').html('<span class="glyphicon glyphicon-thumbs-up"></span>');
            }
            else{
                $('#sicon').html('<span class="glyphicon glyphicon-thumbs-down"></span>');
            }
            $.get("/Fy/up/", {
				wid: 42755,
				id: 87,
				score: tScore
			});
            return false;
        }
        else{
            continue;    
        }
    };
}

// 多选 
function toggle_only(t){
	console.log("当前得分"+score);
    $(".list-group-item").removeClass('active')
    var score = $(t).attr("data-score");
    tScore  = parseInt(tScore) + parseInt(score);
	
	var iii = $(t).find('i').find('span').length > 0 ? true :false;
	
	
	// alert(a_count);
	
	
	if( $(t).find('i').hasClass('glyphicon-unchecked')){
		// alert(iii);
		$(t).find('i').find('span').addClass('right');
		$(t).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
		
	
		show_result(t);
	}else{
		$(t).find('i').removeClass('glyphicon-ok').addClass('glyphicon-unchecked');
		show_result(t);
	}
    
    var t = $(".js_answer").index($(t).parents(".js_answer")) + 1;
	//音乐播放beg
	$('.btn').show();
    $('.stop').hide();
}

function show_result(t){
	var a_count = $(t).parent().find('span').length 
	var b_count = $(t).parent().find('span.right').length 
	var c_count = $(t).parent().find('i.glyphicon-ok').length 
	
	if(a_count == b_count && b_count == c_count){
		// alert(' 完全答对了 ');
		$(t).parent().css('border','5px dashed green');
		
		if($(t).closest('.js_answer').data('right_count') == undefined){
			$(t).closest('.js_answer').data('right_count',1)
		}
		
		//alert($(t).parent().data('right_count'));
	}else{
		// alert(' 答错了 ');
		$(t).parent().css('border','5px dashed red');
		
		$(t).closest('.js_answer').data('right_count',0);
	}
	
}

 
// 单选
function toggle(t){
	console.log("当前得分"+score);
    $(".list-group-item").removeClass('active')
    var score = $(t).attr("data-score");
    tScore  = parseInt(tScore) + parseInt(score);
    $(t).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
    var t = $(".js_answer").index($(t).parents(".js_answer")) + 1;
	//音乐播放beg
	$('.btn').show();
    $('.stop').hide();
	//音乐播放end
    if(t == total){
        result(tScore);
    }
    else{
        setTimeout(function(){next(t);},300);
    }
}

// 下一个
function next_btn(t) {

	//console.log(p)
	// console.log(user_answers);
	
	dump_user_answer_arr(t);
	 
	var current = $(".js_answer").index($(t).parents(".js_answer")) 
    var t = current + 1;
	
	
	//音乐播放beg
	$('.btn').show();
    $('.stop').hide();
	//音乐播放end
    
	count_right(t);
	
	// alert(t);
    if(t == total){
        result(tScore);
    }else{
        setTimeout(function(){next(t);},300);
    }
}

function dump_user_answer_arr(t){
	var user_answers_index_array = [];
	var right_answers_index_array = [];
	var is_all_right = false;
	
	var user_answers = $(t).parent().find('ul li i.glyphicon-ok')
	var all_answers = $(t).parent().find('ul li');
	
	if(user_answers.length == 0){
		alert('没选择任何答案');
		return;
	}
	
	$.each(user_answers, function(i){
		var o = $(user_answers[i]).parent();
		console.log('o=' + o);
		var index = $(all_answers).index(o) + 1;
		console.log('index=' + index);
		
		if($(o).find('span').length > 0){
			right_answers_index_array.push(i + 1);
		}
		
		user_answers_index_array.push(index);
	});
	console.log(user_answers_index_array);
	$(t).closest('#panel2').data('user_answers_index_array', user_answers_index_array);
	
	var current = $(".js_answer").index($(t).parents(".js_answer")) 
	
	var a_count = $(t).parent().find('span').length
	var b_count = $(t).parent().find('span.right').length
	var c_count = $(t).parent().find('i.glyphicon-ok').length
	var is_right = false;

	if(a_count == b_count && b_count == c_count){
		is_right = true;
	}
	
	var answer_obj = {
		'right_answers'	: right_answers_index_array,
		'user_answers' 	: user_answers_index_array,
		'is_right' 		: is_right
	}

	user_answer_arr.push(answer_obj);
	
	console.log('user_answer_arr',user_answer_arr);
}

/**
 * 获取用户答对题目数字
 */
function count_right(){
	var user_right_count = 0;
	var user_answers_count = user_answer_arr.length;
	$.each(user_answer_arr ,function(i){
		var answer = user_answer_arr[i]
		
		if(answer.is_right == true){
			user_right_count ++;
		}
	})
	
	if(debug == true){
		var info = ' 一共做了'+user_answers_count + "道题"+"，答对了"+user_right_count +"道";
		$('#current_answer_info').html(info);
	}
	console.log("user_right_count = "+user_right_count +'; and all count='+user_answers_count);
	
	return user_right_count;
}

Zepto(function($){
    $('.loads').hide();	
})

WeixinApi.ready(function(Api) {
    Api.showOptionMenu();
    var wxData = {
        "appId": "wx6987e3e535ea35fe",
        "imgUrl" : 'http://weixiaoxinpic.qiniudn.com/Public/upload/42755/54082eb7c71e3.jpg',
        "link" : 'http://wap.weixiaoxin.com/Fy/index/?wid=42755&id=87&r=99517',
        "desc" : '刚在河南方言考试中，得了[n]分，你也来测试一下吧！',
        "title" : '在河南方言考试中我获得了[n]分，足厉害啊！'
    };
    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready:function () {
            wxData['title']=wxData['title'].replace('[n]',tScore);
            wxData['desc']=wxData['desc'].replace('[n]',tScore);
        },
        // 分享被用户自动取消
        cancel : function(resp) {
            alert("别这样的啦，好东西要和朋友分享的嘛！分享后我告诉你一个秘密。");
        },
        // 分享失败了
        fail : function(resp) {
            alert("分享失败，可能是网络问题，一会儿再试试？");
        },
        // 分享成功
        confirm : function(resp) {
            //$.get("mobile.php?act=module&name=dialect&do=detail&weid=6", {id: "7",op:'share'});
			 $.get("/Fy/up_share/", {
				wid: 42755,
				id: 87,
				score: tScore
			});
			window.location.href='http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd';				
        },
    };
    Api.shareToFriend(wxData,wxCallbacks);
    Api.shareToTimeline(wxData,wxCallbacks);
    Api.shareToWeibo(wxData,wxCallbacks);
});

$("#content img").each(function(){
$(this).removeAttr('height');
if(($(this).width()+20)>$('#content').innerWidth()){
	
	$(this).removeAttr('style').removeAttr('width');
	$(this).removeAttr('style').attr('width',($('#content').innerWidth()-20));
}else{
	$(this).removeAttr('style').attr('max-width','100%');
}
				   
});
$("#content2 img").each(function(){
$(this).removeAttr('height');
if(($(this).width()+20)>$('#content2').innerWidth()){
	
	$(this).removeAttr('style').removeAttr('width');
	$(this).removeAttr('style').attr('width',($('#content2').innerWidth()-20));
}else{
	$(this).removeAttr('style').attr('max-width','100%');
}
				   
});

