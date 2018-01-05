var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userGame = new Schema({
        title: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        description: {
            type: String,
        },
        createdDate: {
            type: Date,
        },
        modifiedDate: {
            type: Date,
            default: Date.now
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Image: {
            type: String,
        },
        isDeleted: {
          type: Boolean,
          default: false
        }
}, {
    versionKey: false
});

module.exports = mongoose.model('userGame', userGame);
