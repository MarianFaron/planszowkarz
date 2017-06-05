// MODULES
var express = require('express');
var bodyParser 	= require('body-parser');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const cors = require('cors');
var nev = require('email-verification')(mongoose);
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);



// SOCKETS

var clients = [];

io.set("origins", "*:*");

io.on('connection', function (socket, data) {

    if (socket.handshake.query.userId) {
      var client = {
        "socketId": socket.id,
        "userId": socket.handshake.query.userId
      }
      clients.push(client);
      // console.log(clients);

      socket.on('sendNotification', function (data) {
        clients.find(function (el) {
          if(el.userId == data) {
              io.to(el.socketId).emit('getNotification', data);;
          }
        });
      });
    }

    socket.on('disconnect', function() {
     var index = clients.indexOf(socket);
     if (index != -1) {
         clients.splice(index, 1);
         console.info('Client gone (id=' + socket.id + ').');
     }
   });
});

// MODELS
var userModel = require('./models/user.model');
var tempUserModel = require('./models/tempUser.model');
var userGameModel = require('./models/userGame.model');
var exchangeModel = require('./models/exchange.model');

// ROUTES
var userRoute = require('./routes/user.route.js');
var userGameRoute = require('./routes/userGame.route.js');
var exchangeRoute = require('./routes/exchange.route.js');
var coverUploadRoute = require('./routes/coverUpload.route.js');
var avatarUploadRoute = require('./routes/avatarUpload.route.js');
var transactionsRoute = require('./routes/transactions.route.js');
var notificationsRoute = require('./routes/notifications.route.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gamesapp:engineering@ds135800.mlab.com:35800/gamesapp');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PATCH");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/scripts', express.static(__dirname + '/node_modules/'));
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
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/app', (req, res) => {
  res.send('Page about board games');
});

app.use('/app', userRoute);
app.use('/app', userGameRoute);
app.use('/app', exchangeRoute);
app.use('/app', coverUploadRoute);
app.use('/app', avatarUploadRoute);
app.use('/app', transactionsRoute);
app.use('/app', notificationsRoute);

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'http') {
      return res.redirect(
       ['http://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.use(forceSSL());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// app.listen(port, () => console.log("Server running on: " + port));
server.listen(port, "127.0.0.1");
