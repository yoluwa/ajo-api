var mongoose = require('mongoose');
var dbURI = 'mongodb://yolu:yolu@ds259855.mlab.com:59855/ajo';
mongoose.Promise = global.Promise;
var options = {
    useMongoClient: true,
    autoReconnect: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    poolSize: 10
};
mongoose.connect(dbURI, options);
module.exports = mongoose;
