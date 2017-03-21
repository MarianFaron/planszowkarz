// MODULES
var express = require('express');
var bodyParser 	= require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var config = require('./config/database');
var morgan = require('morgan');
var mongoose = require('mongoose');

// MODELS
var userModel = require('./models/user.model');

// ROUTES
var userRoute = require('./routes/user.route.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use('/', express.static(__dirname));
app.get('/', function(req, res) {
  res.send("Hello World");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/app', userRoute);

app.listen(port, function() {
	console.log("Server running on: " + port);
});