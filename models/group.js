/**
 * Created by user on 2/3/2017.
 */
var mongoose = require ('../config/db');

var one_week_from_now = function() {
    var one_week_in_millisecs = 7*86400*1000;
    var time_object = new Date();
    time_object.setTime(time_object.getTime() + one_week_in_millisecs);
    return time_object;
};

var GroupSchema = mongoose.Schema({
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
    created_at: {
        type: Date, default: Date.now()
    },
    next_date: {
        type: Date, default: one_week_from_now()
    },
    amount: {
        type: Number, required:true
    },
    paid_members: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

GroupSchema.pre('save', function(next) {
   var current_date = new Date();
   if (!this.created_at) {
       this.created_at = current_date;
   }
   next();
});

module.exports = mongoose.model('Group', GroupSchema);

