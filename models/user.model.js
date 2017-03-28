var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User = new Schema({
    //local: {
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
        },
    //},
    /*facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    */
}, {
    versionKey: false
});

User.pre('save', function (callback) {
    var user = this;
    if(!this.isModified('password')){
        return callback();
    } else {
        // Password changed so we need to hash it
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return callback(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return callback(err);
                }
                user.password = hash;
                callback();
            });
        });
    }
});

module.exports = mongoose.model('User', User);
