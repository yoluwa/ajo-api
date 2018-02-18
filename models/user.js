/**
 * Created by user on 2/3/2017.
 */
var mongoose = require ('../config/db');

var UserSchema = new mongoose.Schema({
    email: {
        type: String, required: true, minlength: 1
    },
    password: {
        type: String, required: true, minlength: 1, select: false
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
        type: Number, required: true, minlength: 1
    },
    account_number: {
        type: Number, required: true
    },
    bank_name: {
        type: String, required: true
    },
    security_question: {
        type: String, required: true, select: false
    },
    answer_to_security: {
        type: String, required: true, select: false
    },
    wallet_balance: {
        type: Number, default: 0
    },
    created_at: {
        type: Date, default: Date.now()
    },
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
});

UserSchema.pre('save', function(next) {
   const user = this;
});

module.exports = mongoose.model('User', UserSchema);

