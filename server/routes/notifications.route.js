var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var User = require('../models/user.model');
var Notifications = require('../models/notification.model');

router.route('/:userID/notifications')
  .get((req, res) => {
    Notifications.find({
      'userID': req.params.userID
    }, (err, notifications) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else {
        return res.status(200).json({
          notifications: notifications
        });
      }
    });
  })

  router.route('/change-status/:id')
    .get((req, res) => {
      Notifications.findById(req.params.id, function(err, notification) {
        notification.status = 'read';
        notification.save(function(err) {
          if (err)
            throw err;
        });
      });
    })

module.exports = router;
