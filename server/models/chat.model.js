var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Chat = new Schema({
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    exchange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exchange'
    },
    status: {
      type: String
    }
}, {
  versionKey: false
});

module.exports = mongoose.model('Chat', Chat);
