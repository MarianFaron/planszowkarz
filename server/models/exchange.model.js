var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Exchange = new Schema({
    proposeGames: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userGame'
    }],
    selectedGames: [{
    	type: mongoose.Schema.Types.ObjectId,
      ref: 'userGame'
    }],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
    	type: String,
    	default: 'pending' 
    }
}, {
  versionKey: false
});

module.exports = mongoose.model('Exchange', Exchange);