// MODULES
var express = require('express');
var bodyParser 	= require('body-parser');
var app = express();
var path = require('path');
var port = process.env.PORT || 80;
var portHttps = process.env.PORT || 443;
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
var https = require('https');
var fs = require('fs');
var force = require('express-force-https');

var options = {
	key: fs.readFileSync("/home/kamil/Publiczny/privkey.pem"),
	cert: fs.readFileSync("/home/kamil/Publiczny/cert.pem"),
	ca: fs.readFileSync("/home/kamil/Publiczny/chain.pem")
};

//var server = http.createServer(app);
var serverHttps = https.createServer(options, app);
var io = require('socket.io').listen(serverHttps);
var dns = require('dns');
// SOCKETS

dns.lookupService('150.254.78.144', port, (err, hostname, service) => {
	console.log(hostname, service);
});

var clients = [];

io.set("origins", "*:*");
io.on('connection', function (socket, data) {

    if (socket.handshake.query.userId) {

      var client = {
        "socketId": socket.id,
        "userId": socket.handshake.query.userId
      };
      var unique = true;
      for(var i = 0; i < clients.length; i++) {
        if(clients[i].userId == client.userId) {
          unique = false;
        }
      }
      if(unique == true) {
        clients.push(client);
      }
      console.log(clients);

      socket.on('sendNotification', function (data) {
        clients.find(function (el) {
          if(el.userId == data) {
              io.to(el.socketId).emit('getNotification', data);
          }
        });
      });

      socket.on('sendMessage', function (data) {
        clients.find(function (el) {
          if(el.userId == data) {
              io.to(el.socketId).emit('getMessage', data);
          }
        });
      });
    }

    socket.on('disconnect', function() {
      for(var i = 0; i < clients.length; i++) {
        if(clients[i].socketId == socket.id) {
          clients.splice(i, 1);
          console.info('Client ' + socket.id + ' disconnected');
        }
      }
   });
});

// MODELS
var userModel = require('./models/user.model');
var tempUserModel = require('./models/tempUser.model');
var userGameModel = require('./models/userGame.model');
var exchangeModel = require('./models/exchange.model');
var chatModel = require('./models/chat.model');
var messageModel = require('./models/message.model');
var contactModel = require('./models/contact.model');

// ROUTES
var userRoute = require('./routes/user.route.js');
var userGameRoute = require('./routes/userGame.route.js');
var exchangeRoute = require('./routes/exchange.route.js');
var coverUploadRoute = require('./routes/coverUpload.route.js');
var avatarUploadRoute = require('./routes/avatarUpload.route.js');
var transactionsRoute = require('./routes/transactions.route.js');
var notificationsRoute = require('./routes/notifications.route.js');
var chatRoute = require('./routes/chat.route.js');
var contactRoute = require('./routes/contact.route.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gamesapp:engineering@ds135800.mlab.com:35800/gamesapp');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PATCH");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//app.use(force);
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
//app.use('/', express.static(__dirname));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/app', userRoute);
app.use('/app', userGameRoute);
app.use('/app', exchangeRoute);
app.use('/app', coverUploadRoute);
app.use('/app', avatarUploadRoute);
app.use('/app', transactionsRoute);
app.use('/app', notificationsRoute);
app.use('/app', chatRoute);
app.use('/app', contactRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// app.listen(port, () => console.log("Server running on: " + port));
//server.listen(port,() => console.log("Server running on: " + port));
serverHttps.listen(portHttps, () => console.log("Server running on:" + portHttps));