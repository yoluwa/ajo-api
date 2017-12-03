var mongoose = require('mongoose');
var dbURI = 'mongodb://yolu:yolu@ds259855.mlab.com:59855/ajo';
mongoose.Promise = global.Promise;
mongoose.connect(dbURI, {server:{auto_reconnect:true}});
module.exports = mongoose;
