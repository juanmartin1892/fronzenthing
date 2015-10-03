var express = require('express');
var http = require("http");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var options = {
	  "async": false,
	  "method": "GET",
	  "hostname": "hackathon.ttcloud.net",
	  "port": "10026",
	  "path": "/v1/contextEntities/HM9PKJ/",
	  "headers": {
	    "content-type": "application/json",
	    "accept": "application/json",
	    "fiware-servicepath": "/iot",
	    "fiware-service": "todosincluidos",
	    "cache-control": "no-cache",
	    "postman-token": "699f15eb-ca09-4be5-71fb-b0bb31b50a65"
	  }
	};
	var response;
	var req = http.request(options, function (res1) {
	  var chunks = [];

	  res1.on("data", function (chunk) {
	    chunks.push(chunk);
	  }); 

	  res1.on("end", function () {
	    var body = Buffer.concat(chunks);
	    response = body.toString();
	    res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.send(response);
	  });
	});

	req.end();
});

module.exports = router;
