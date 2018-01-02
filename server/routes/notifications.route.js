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
    }).sort({sendDate:1});
  })

  router.route('/:userID/unread-notifications')
    .get((req, res) => {
      Notifications.find({
        'userID': req.params.userID,
        'status': 'new'
      }, (err, notifications) => {
        if (err) {
          return res.status(400).json({
            message: "Bad Requested"
          });
        } else {
          return res.status(200).json({
            notificationsCount: notifications.length
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

  router.route('/notifications/:id')
    .delete(function(req, res) {
      Notifications.findById(req.params.id, (err, notification) => {
        if (err) {
          return res.status(400).json({
            message: "Bad Requested"
          });
        } else if (!notification) {
          return res.status(404).json({
            message: "Notification not Found"
          });
        } else {
          Notifications.remove({
            _id: req.params.id
          }, (err, notification) => {
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

module.exports = router;
