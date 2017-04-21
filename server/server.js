// MODULES
var express = require('express');
var bodyParser 	= require('body-parser');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const cors = require('cors');

// MODELS
var userModel = require('./models/user.model');
var userGameModel = require('./models/userGame.model');

// ROUTES
var userRoute = require('./routes/user.route.js');
var userGameRoute = require('./routes/userGame.route.js');
var uploadsRoute = require('./routes/uploads.route.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gamesapp:engineering@ds135800.mlab.com:35800/gamesapp');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
require('./config/passport')(passport);
app.use('/', express.static(__dirname));

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/app', (req, res) => {
  res.send('Page about board games');
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PATCH");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/app', userRoute);
app.use('/app', userGameRoute);
app.use('/app', uploadsRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log("Server running on: " + port));
