var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Contact = new Schema({
    subject: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    authorEmail: {
        type: String,
        require: true
    },
    authorName: {
        type: String,
    },
    authorSurname: {
        type: String,
    }
}, {
versionKey: false
});

module.exports = mongoose.model('Contact', Contact);
