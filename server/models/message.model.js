var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Message = new Schema({
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
    	type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
}, {
  versionKey: false
});

module.exports = mongoose.model('Message', Message);
