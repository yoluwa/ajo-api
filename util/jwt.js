var jwt = require('jsonwebtoken');
var CONSTANTS = require('./constants');

module.exports.createToken = function(payload) {
    var token = jwt.sign(payload, CONSTANTS.JWT_SECRET, {
        expiresIn: 600000
    });
    return token;
};