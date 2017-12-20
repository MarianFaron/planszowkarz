var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var TempUser = require('../models/tempUser.model');
var userGame = require('../models/userGame.model');
var Exchange = require('../models/exchange.model');
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
      html: '<div style="background: #f5f5f5; padding-top: 40px;padding-bottom: 40px;"><div class="email" style="width: 500px; margin: 0 auto;border:1px solid #b6b6b6;"><div class="email-header" style="background:#444;text-align: center;color: #fff; padding: 5px;"><h4 style="margin 0;padding: 0;">Planszówkarz</h4></div><div class="email-content" style="padding: 15px; background: #fff;"><h3>Resetowanie hasła</h3><p style="font-size: 14px;">Nowe hasło: <b>' + password + '</b></p><p style="font-size: 14px;">Jeśli nie wysyłałeś prośby o zresetowanie hasła, zignoruj ten e-mail.</p></div><div class="email-footer" style="background:#444;text-align: center;color: #fff; padding: 15px; font-size: 12px">Planszówkarz 2017 <a href="#" style="color: #f98d1a">Kontakt</a></div></div></div>'
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
      scope: ['email']
    })(req, res, next);
  });

router.route('/auth/facebook/callback')
  .get(function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.json({
          message: info.message
        })
      }
      res.redirect('/register?userId='+user._id);
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
        link = "https://" + req.get('host') + "/app/verify?id=" + rand + "&email=" + user.email;
        mailOptions = {
          to: user.email,
          subject: "Potwierdzenie rejestracji",
          html: '<div style="background: #f5f5f5; padding-top: 40px;padding-bottom: 40px;"><div class="email" style="width: 500px; margin: 0 auto;border:1px solid #b6b6b6;"><div class="email-header" style="background:#444;text-align: center;color: #fff; padding: 5px;"><h4 style="margin 0;padding: 0;">Planszówkarz</h4></div><div class="email-content" style="padding: 15px; background: #fff;"><h3>Potwierdzenie rejestracji</h3><p style="font-size: 14px;">Kliknij w poniższy link, aby potwierdzić rejestrację.<br><a href=' + link + '>Weryfikuj</a></p><p style="font-size: 14px;">Jeśli nie rejestrowałeś się w aplikacji Planszówkarz, zignoruj ten e-mail.</p></div><div class="email-footer" style="background:#444;text-align: center;color: #fff; padding: 15px; font-size: 12px">Planszówkarz 2017 <a href="#" style="color: #f98d1a">Kontakt</a></div></div></div>'
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
          newUser.avatarImage = tempUser.avatarImage;


          newUser.save(function(err) {
            if (err) {
              throw err;
            } else {
              TempUser.remove({email: tempUser.email}, function() {
                console.log("User was deleted");
              });
              return res.redirect('/register');
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

router.route('/edit-user/:id')
  .post((req, res) => {
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

          user.dateBirth = req.body.dateBirth;
          user.city = req.body.city;
          user.contactNumber = req.body.contactNumber;
          user.avatarImage = req.body.avatarImage;
          user.numberOfGames = req.body.numberOfGames;
          user.numberOfExchanges = req.body.numberOfExchanges;
          user.numberOfRatings = req.body.numberOfRatings;
          user.sumOfGrades = req.body.sumOfGrades;

          if(!user.facebook && req.body.password != '' && req.body.password.length >= 3) {
            user.local.password = user.generateHash(req.body.password);
          }

          user.save(function(err) {
            if (err)
              throw err;
          });

        return res.status(200).json(user);
      }
    });
  });


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
        email: req.body.email,
        avatarImage: req.body.avatarImage
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
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Bad Requested" });
      } else if (!user) {
        return res.status(404).json({ message: "User not Found" });
      } else {
        return res.status(200).json(user);
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
    }).sort({createdDate: 1});
  });

router.route('/users/login/:login')
  .get((req, res) => {
    // console.log(req.params.login);
    // var login = req.params.login;
    User.findOne({
      'local.login': req.params.login
    }, (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else if (!user) {
        return res.status(404).json({
          message: "User not Found"
        });
      } else {
        console.log(user);
        return res.status(200).json(user);
      }
    });
  });


module.exports = router;
