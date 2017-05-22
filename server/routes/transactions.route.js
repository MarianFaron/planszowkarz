var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var User = require('../models/user.model');
var Notification = require('../models/notification.model');

/* NODE MAILER CONFIGURATION */

var rand, mailOptions, host, link;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'planszowkarz@gmail.com',
    pass: '123456789ABC'
  }
});

/* START TRANSACTION */

router.route('/start')
  .post(function(req, res, next) {

    var game = req.body.game;
    var currentUser = req.body.currentUser;
    var gameTitle = game.title;
    var userName;
    var recipient;

    (currentUser.facebook) ? userName = currentUser.facebook.name : userName = currentUser.local.login;

    User.findOne({
      '_id': game.userID
    }, function(err, user, info) {

      if(user.local) {
        recipient = user.local.email;
      } else {
        recipient = user.facebook.email;
      }

      var message = "Użytkownik: <b>" + userName + "</b> poprosił cię o wymianę za grę: <b>" + gameTitle + "</b>. Przejdź do panelu na swoim koncie, aby mu odpowiedzieć.";

      var notification = new Notification();

      notification.content = message;
      notification.userID = user._id;
      notification.date = new Date();
      notification.status = 'new';

      notification.save(function(err) {
        if (err)
          throw err;
      });

      mailOptions = {
        from: '"Planszówkarz" <planszowkarz@gmail.com>',
        to: recipient,
        subject: 'Użytkownik prosi o wymianę',
        text: message,
        html: '<div style="background: #f5f5f5; padding-top: 40px;padding-bottom: 40px;"><div class="email" style="width: 500px; margin: 0 auto;border:1px solid #b6b6b6;"><div class="email-header" style="background:#f98d1a;text-align: center;color: #fff; padding: 5px;"><h4 style="margin 0;padding: 0;">Planszówkarz</h4></div><div class="email-content" style="padding: 15px; background: #fff;"><h3>Prośba o wymianę</h3><p style="font-size: 14px;">' + message + '</p><p style="font-size: 14px;">Jeśli nie chcesz otrzymywać takich wiadomości, zmień ustawienia na swoim profilu.</p></div><div class="email-footer" style="background:#f98d1a;text-align: center;color: #fff; padding: 15px; font-size: 12px">Planszówkarz 2017 <a href="#" style="color: #fff">Kontakt</a></div></div></div>'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    });
  });

module.exports = router;
