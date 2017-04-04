var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
        login: {
            type: String,
            unique: true,
            require: true
        },
		email: {
            type: String,
            unique: true,
            require: true
        },
        password: {
            type: String,
            unique: false,
            require: true
        }
}, {
    versionKey: false
});

module.exports = mongoose.model('User', User);