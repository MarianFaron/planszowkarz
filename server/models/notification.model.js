var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notifications = new Schema({
    content: {
      type: String,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sendDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'new'
    }
}, {
  versionKey: false
});

module.exports = mongoose.model('Notifications', Notifications);
