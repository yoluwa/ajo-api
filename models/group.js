/**
 * Created by user on 2/3/2017.
 */
var mongoose = require ('../config/db');

var Group = mongoose.model('Group', {
    name: {
        type: String, required: true, minlength: 1
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    reason: {
        type: String, required: true, minlength: 1
    },
    frequency: {
        type: String, required: true, minlength: 1
    },
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = Group;

