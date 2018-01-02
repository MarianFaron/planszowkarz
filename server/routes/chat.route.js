var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var Chat = require('../models/chat.model');
var Message = require('../models/message.model');

/* Get chat messages */

router.route('/chat')
  // get chat
  .get((req, res) => {
    Chat.find({_id: req.body.chatId}, (err, messages) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else {
        return res.status(200).json({
          chat: chat
        });
      }
    })
  })
  .post((req, res) => {
    var users = [req.body.sender, req.body.recipient];
    var exchangeId = req.body.exchangeId;
    Chat.findOne({exchange: exchangeId}, function(err,chat) {
  			if(err){
  				return res.status(400).json({message: "Bad Requested"});
  			} else if (chat != undefined) {
          return res.status(200).json(chat);
        } else {
          var newChat = new Chat({
            user1: req.body.sender,
            user2: req.body.recipient,
            exchange: exchangeId,
            status: 'new'
          });
          // save the chat
          newChat.save((err) => {
            if (err) {
              return res.status(409).json({
                message: 'Wrong chat'
              });
            } else {
              return res.status(201).json(newChat);
            }
          });
  			}
  		});
  });

router.route('/chat/:id')
  .get((req, res) => {
    Chat.find({_id: req.params.id}, (err, chat) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else {
        return res.status(200).json({
          chat: chat
        });
      }
    })
  })


router.route('/chat/:id/messages')
  // get all messages
  .get((req, res) => {
    Message.find({chat: req.params.id}, (err, messages) => {
      if (err) {
        return res.status(400).json({
          message: "Bad Requested"
        });
      } else {
        return res.status(200).json({
          messages: messages
        });
      }
    })
  })
  // send message
  .post((req, res) => {
    var newMessage = new Message({
      chat: req.body.chat,
      sender: req.body.sender,
      recipient: req.body.recipient,
      content: req.body.content
    });
    // save the message
    newMessage.save((err) => {
      if (err) {
        return res.status(409).json({
          message: 'Wrong message'
        });
      } else {
        return res.status(201).json(newMessage);
      }
    });
  });

module.exports = router;
