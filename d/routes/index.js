var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	
	console.log(req.query);
	
 
    var o = req.query.data
    var i = JSON.parse(o);
	console.log( i );
	
	 var fs = require('fs');
 	 
	 var ws = fs.createWriteStream(path.join('public/dataStream.json'), { encoding: "utf8" })

	 ws.write(o); 
	 ws.end(); // 目前和destroy()和destroySoon()一样 
	 
	
	 res.render('index', { title: 'Express' });
 
});

router.post('/', function(req, res) {
	 
 
});

module.exports = router;
