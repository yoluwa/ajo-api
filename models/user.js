/**
 * Created by user on 2/3/2017.
 */
var mongoose = require ('../config/db');

var User = mongoose.model('User', {
    email: {
        type: String, required: true, minlength: 1
    },
    password: {
        type: String, required: true, minlength: 1
    },
    name: {
        type: String, required: true, minlength: 1
    },
    date_of_birth: {
        type: String, required: true
    },
    phone: {
        type: Number, required: true
    },
    bvn: {
        type: Number, required: true
    },
    account_number: {
        type: Number, required: true
    },
    bank_name: {
        type: Number, required: true
    },
    security_question: {
        type: String, required: true
    }
});

module.exports = User;

