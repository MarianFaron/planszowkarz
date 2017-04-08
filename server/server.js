// MODULES
var express = require('express');
var bodyParser 	= require('body-parser');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');

// MODELS
var userModel = require('./models/user.model');
var userGameModel = require('./models/userGame.model');

// ROUTES
var userRoute = require('./routes/user.route.js');
var userGameRoute = require('./routes/userGame.route.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gamesapp:engineering@ds135800.mlab.com:35800/gamesapp');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/app', (req, res) => {
  res.send('Page about board games');
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/app', userRoute);
app.use('/app', userGameRoute);

app.listen(port, () => console.log("Server running on: " + port));