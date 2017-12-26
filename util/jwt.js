var jwt = require('jsonwebtoken');
var CONSTANTS = require('./constants');

module.exports.createToken = function(payload) {
    var token = jwt.sign(payload, CONSTANTS.JWT_SECRET, {
        expiresIn: 600000
    });
    return token;
};

module.exports.verifyToken = function(token) {
    try {
        return jwt.verify(token, CONSTANTS.JWT_SECRET);
    } catch(err) {
        return null;
    }
};