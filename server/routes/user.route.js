var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var TempUser = require('../models/tempUser.model');
var userGame = require('../models/userGame.model');
var passport = require('passport');
var generator = require('generate-password');
var nodemailer = require('nodemailer');

/* NODE MAILER CONFIGURATION */

var rand, mailOptions, host, link;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'planszowkarz@gmail.com',
    pass: '123456789ABC'
  }
});

/* RESET PASSWORD */

router.route('/forgot')
  .post(function(req, res, next) {

    var email = req.body.email;
    var password = generator.generate({
      length: 10,
      numbers: true
    });

    mailOptions = {
      from: '"Planszówkarz" <planszowkarz@gmail.com>',
      to: email,
      subject: 'Resetowanie hasła',
      text: 'Nowe hasło: ' + password,
      html: 'Nowe hasło: <b>' + password + '</b>'
    };

    User.findOne({
      'local.email': email
    }, function(err, user, info) {
      user.local.password = user.generateHash(password);
      user.save(function(err) {
        if (err)
          throw err;
      });
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  });

// =====================================
// FACEBOOK ROUTES =====================
// =====================================

router.route('/auth/facebook')
  .get(function(req, res, next) {
    passport.authenticate('facebook', {
      scope: 'email'
    })(req, res, next);
  });

router.route('/auth/facebook/callback')
  .get(function(req, res, next) {
    // passport.authenticate('facebook', {
    // 	successRedirect : '/user-game,
    // 	failureRedirect : '/register',
    // })(req, res, next);
    passport.authenticate('facebook', function(err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.json({
          message: info.message
        })
      }
      res.json({
        user: user
      });
    })(req, res, next);
  });

// =====================================
// LOCAL ROUTES ========================
// =====================================

/* REGISTER */

router.route('/users/register')
  .post(function(req, res, next) {
    passport.authenticate('local-register', function(err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.json({
          message: info.message
        })
      } else {
        rand = Math.floor((Math.random() * 10000) + 54);
        host = req.get('host');
        link = "http://" + req.get('host') + "/app/verify?id=" + rand + "&email=" + user.email;
        mailOptions = {
          to: user.email,
          subject: "Potwierdzenie rejestracji",
          html: "Kliknij w poniższy link, aby potwierdzić rejestrację.<br><a href=" + link + ">Weryfikuj</a>"
        }
        transporter.sendMail(mailOptions, function(error, response) {
          if (error) {
            console.log(error);
            return false;
          } else {
            console.log("Wysłano e-mail weryfikacyjny.");
            return res.json({
              "user": user
            });
          }
        });
      }
    })(req, res, next);
  });


/* VERIFY REGISTRATION */

router.route('/verify')
  .get(function(req, res) {

    var email = req.query.email;

    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
      if (req.query.id == rand) {

        var tempUser = TempUser.findOne({
          'email': email
        }, function(err, tempUser) {

          var newUser = new User();

          newUser.local.login = tempUser.login;
          newUser.local.email = tempUser.email;
          newUser.local.password = tempUser.password;

          newUser.save(function(err) {
            if (err) {
              throw err;
            } else {
              return res.redirect('/main');
            }
          });
        });
      } else {
        console.log("email is not verified");
      }
    } else {
      console.log("Request is from unknown source");
    }
  });

/* LOGIN */

router.route('/users/login')
  .post(function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.json({
          message: info.message
        })
      }
      res.json({
        user: user
      });
    })(req, res, next);

  });

/* LOGOUT */

router.route('/users/logout')
  .post(function(req, res, next) {
    req.logout();
  })

// =====================================
// DEFAULT ROUTES =====================
// =====================================

router.route('/users')
  // get all users
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else {
        return res.status(200).json({
          users: users
        });
      }
    });
  })
  // post new user
  .post((req, res) => {
    if (!req.body.login || !req.body.password) {
      return res.status(401).end({
        message: "You must pass login/password"
      });
    } else {
      var newUser = new User({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email
      });
      // save the user
      newUser.save((err) => {
        if (err) {
          return res.status(409).json({
            message: 'Wrong user'
          });
        } else {
          return res.status(201).json(newUser);
        }
      });
    }
  });

router.route('/users/:id')
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else if (!user) {
        return res.status(404).json({
          message: "User not Found"
        });
      } else {
        return res.status(200).json(user);
      }
    });
  })

  .patch((req, res) => {
    User.findByIdAndUpdate({
      _id: req.params.id
    }, req.body, (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else if (!user) {
        return res.status(404).json({
          message: "User not Found"
        });
      } else {
        return res.status(200).json({
          user
        });
      }
    });
  })

  .delete(function(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else if (!user) {
        return res.status(404).json({
          message: "User not Found"
        });
      } else {
        User.remove({
          _id: req.params.id
        }, (err, user) => {
          if (err) {
            return res.status(400).json({
              message: "Bad Requested"
            });
          } else {
            return res.status(204).end();
          }
        });
      }
    })
  });

router.route('/users/:id/userGames')
  .get((req, res) => {
    userGame.find({
      userID: req.params.id
    }, (err, game) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else if (!game) {
        return res.status(404).json({
          message: "Games not Found"
        });
      } else {
        return res.status(200).json(game);
      }
    });
  });


module.exports = router;
