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


获取用户信息的api，微信增加了一个字段subscribe,如果值为0的话，说明没有关注，如果值为1的话，则说明已经关注了
 
