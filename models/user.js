/**
 * Created by user on 2/3/2017.
 */
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

//set up a mongoose model and pass it using modelu.exports
module.exports = mongoose.model('User', new Schema({
    email: String,
    password: String,
    phone: String
}));
