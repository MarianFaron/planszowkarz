var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
    local: {
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
    },
    facebook: {
        id: {
            type: String
        },
        token: {
            type: String
        },
        email: {
            type: String
        },
        name: {
            type: String
        }
    },
    name: {
        type: String
    },
    dateBirth: {
        type: String
    },
    contactNumber: {
        type: String
    },
    city: {
        type: String
    },
    avatarImage: {
        type: String,
    }
}, {
  versionKey: false
});


User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
