// MODULES
var express = require('express');
var bodyParser 	= require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var config = require('./config/database');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var ejs = require('ejs');
var User = require('./models/user.model');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

// MODELS
var userModel = require('./models/user.model');

// ROUTES
var userRoute = require('./routes/user.route.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', express.static(__dirname));

app.get('/', function(req, res) {
  res.redirect('/app');
});

app.get('/app', function(req, res) {
  res.render('index', {
    user: req.user
  });
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
