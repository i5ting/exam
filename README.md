exam
====


index.html?wid=42755&id=87&r=73753&from=singlemessage&isappinstalled=0


## 模板

	<div id='timu_shengcheng_container'> 
		<div id="panel2" class="panel-body js_answer"
		data-type="1"		 style="display: none;">
		    <dl>
				<dd><p>看到那几个孩子在哪里藏老门二突然发现自己老了！藏老门是是弄啥了？</p></dd>				
		    </dl>
		    <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onclick="return toggle(this);">
					<i class="glyphicon glyphicon-unchecked"></i>A 把门藏起来
				</li>				
				<li class="list-group-item" data-score="10" onclick="return toggle(this);">
					<i class="glyphicon glyphicon-unchecked"></i>B 捉迷藏
				</li>				
				<li class="list-group-item" data-score="0" onclick="return toggle(this);">
					<i class="glyphicon glyphicon-unchecked"></i>
					C 唐三藏
				</li>				
				<li class="list-group-item" data-score="0" onclick="return toggle(this);">
					<i class="glyphicon glyphicon-unchecked"></i>
					D 找老门
				</li>																												
		    </ul>
			<div class="buttons buttons2">
		        <a href="http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd" class="btn btn-danger btn-danger2 btn-block"> 
					一键关注
				</a>
		    </div>        
		</div>
	</div>
	
	
## open

	open -a /Applications/Google\ Chrome.app --args --disable-web-security



## express 

	➜  exam git:(master) express --hbs web

	   create : web
	   create : web/package.json
	   create : web/app.js
	   create : web/public
	   create : web/public/javascripts
	   create : web/public/images
	   create : web/public/stylesheets
	   create : web/public/stylesheets/style.css
	   create : web/routes
	   create : web/routes/index.js
	   create : web/routes/users.js
	   create : web/views
	   create : web/views/index.hbs
	   create : web/views/layout.hbs
	   create : web/views/error.hbs
	   create : web/bin
	   create : web/bin/www

	   install dependencies:
	     $ cd web && npm install

	   run the app:
	     $ DEBUG=web ./bin/www
	 
	 
## url

https://www.npmjs.org/package/handlebars

	var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
	             "{{kids.length}} kids:</p>" +
	             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
	var template = Handlebars.compile(source);

	var data = { "name": "Alan", "hometown": "Somewhere, TX",
	             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
	var result = template(data);




## 说明

### 存放当前状态

	<span id='current_status'>

比如
	
	一共2道题，当前是第2道
	
### 存放当前结果状态

	<span id='current_answer_info'></span>

比如

	一共做了1道题，答对了1道
	
### 配置项说明
	
	var template = indexutils.template_compile(source,{
		debug: false,
		show_subscribe_btn:false,
		show_question_title_tip:false
	});

- debug 调试信息
- show_subscribe_btn 是否显示一键关注按钮
- show_question_title_tip 是否显示题干的提示（单选还是多选）

	
## todo

- [ ] 多选，做最多选项判断
- [ ] 多选，如果答对，自动跳到下一题
- [ ] 单选，对的时候的状态
- [ ] 单选，自动到下一题的时间
- [ ] 多选，计算对一半的情况
- [ ] 每道题限时30秒
- [ ] 每天5道题
- [ ] 改成ajax
获取用户信息的api，微信增加了一个字段subscribe,如果值为0的话，说明没有关注，如果值为1的话，则说明已经关注了
 
- aid是代理账户
- uid是微信账户


答题， 未关注
http://2.dabuu.sinaapp.com/getquestions.php?aid=18e6255ebbf2d72f64625c63f29c600d&uid=o123127fsdouvpz
http://2.dabuu.sinaapp.com/getresult.php?aid=18e6255ebbf2d72f64625c63f29c600d&uid=o123127fsdouvpz

未答题， 已关注
http://2.dabuu.sinaapp.com/getquestions.php?aid=18e6255ebbf2d72f64625c63f29c600d&uid=oPpghuGYJAi8c1iyp0-y9GaU1wM0
http://2.dabuu.sinaapp.com/getresult.php?aid=18e6255ebbf2d72f64625c63f29c600d&uid=oPpghuGYJAi8c1iyp0-y9GaU1wM0


答题页面的url : question.html?aid=xxxxx&uid=wx_open_id

============================  获取题目 getquestioninfo.json?agent=xxxx&token=wx_open_id  ============================
{
	"status":true,
	"data":{
		"user_id": 1010,
		"is_answered": true; (这里 是显示 用户是否今天打过题了， 如果打过题了， 直接跳转到 结果页面， 如果今天没答题，则继续显示题目)
		"questions":[
			{
				"id": 22,
				"label":"这里是22题干这里是22题干这里是22题干这里是22题干这里是22题干",
				"type";1, (这里 是题目的类型， type =1 单选， type=2 多选)
				"answers":[
					{
						"label":"许久了"
					},
					{
						"label":"注意没注意",
						"is_answer":true
					},
					{
						"label":"呼噜呼噜"
					},
					{
						"label":"嘘嘘"
					}
				]
			},
			{
				"id": 44,
				"label":"这里是44题干这里是44题干这里是44题干这里是44题干这里是44题干",
				"type";2,
				"answers":[
					{
						"label":"许久了"
					},
					{
						"label":"注意没注意",
						"is_answer":true
					},
					{
						"label":"呼噜呼噜"
					},
					{
						"label":"嘘嘘"
					}
				]
			}
			
		]
	}
}


============================  提交用户答题的信息结果  ============================

POST: getresult.php? user_id=1010&q_11=1{#$}2_1&&q_22=3_0

解释：
user_id=1010 是从 getquestioninfo.json 获取 的user_id
q_11=1{#$}2_1  
	q_11 中 11是 "questions"."id"
	1{#$}2 是 用户 多选的答案
	1 是 用户答对
	
q_22=3_0
	3 用户 单选的答案
	0 是 用户答错




============================  提交用户答题结果后 返回的值  getresult.json ============================
返回的格式 如下：
{
	"status": true,
	"data": {
		"user": "user_id",
		"focus": 1,
		"today": 4,
		"total": 100,
		"today_rate": 80,
		"questions":[  (这里是 结果里面显示解释的部分)
        			{
        				"id": 22,
        				"label":"这里是22题干这里是22题干这里是22题干这里是22题干这里是22题干",
        				"type";1,
        				"explain":[
        					{
        						"label":"许久了"
        					},
        					{
        						"label":"注意没注意",
        					},
        					{
        						"label":"呼噜呼噜"
        					},
        					{
        						"label":"嘘嘘"
        					}
        				]
        			},
        			{
        				"id": 44,
        				"label":"这里是44题干这里是44题干这里是44题干这里是44题干这里是44题干",
        				"type";1,
        				"explain":[
        					{
        						"label":"许久了"
        					},
        					{
        						"label":"注意没注意",
        					},
        					{
        						"label":"呼噜呼噜"
        					},
        					{
        						"label":"嘘嘘"
        					}
        				]
        			}

        		]
	}
}
status =true 正常返回， 
focus = 1 是关注， 0 是没关注 
today = 今天答对题数 （0-5）
total = 总答对题数 (0+）
today_rate  =  击败多少同行 ( 0 -100)

{
	"status": false, 
	"data": {}
}


## 流程

- 如果未关注
- 跳转到关注界面
- 然后关注成功可看到答案（答案里有炫耀一下）

- 如果已关注
- 点击查看答案可看到答案（答案里有炫耀一下）



- dati.html?aid=xx&&uid=xx
- jieguo.html?aid=xx&&uid=xx(给未关注的要得,已关注的就直接)



财付通需要提供：

http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd




查看答案
开始答题

