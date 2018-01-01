var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Exchange = new Schema({
    proposeGames: [{
      type: String
    }],
    recipientGame: {
    	type: mongoose.Schema.Types.ObjectId,
      ref: 'userGame'
    },
    senderGame: {
      type: String
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    senderRate: {
      type: Boolean,
      default: false
    },
    recipientRate: {
      type: Boolean,
      default: false
    },
    isCLosedBySender: {
      type: Boolean,
      default: false
    },
    isClosedByRecipient: {
      type: Boolean,
      default: false
    },
    status: {
    	type: String,
    	default: 'pending'
    },
    date: {
      type: Date,
      default: Date.now
    }
}, {
  versionKey: false
});

module.exports = mongoose.model('Exchange', Exchange);
