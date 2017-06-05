var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Exchange = new Schema({
    games: [{
    	type: mongoose.Schema.Types.ObjectId,
      	ref: 'userGame'
    }],
    users: [{
    	type: mongoose.Schema.Types.ObjectId,
      	ref: 'User'
    }],
    status: {
    	type: String,
    	default: 'pending' 
    }
}, {
  versionKey: false
});

module.exports = mongoose.model('Exchange', Exchange);