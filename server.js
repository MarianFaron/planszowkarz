var express = require('express');
var bodyParser 	= require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname));
app.get('/', function(req, res) {
  res.send("Hello World");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, function() {
	console.log("Server running on: " + port);
});