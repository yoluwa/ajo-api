var jwt = require('../util/jwt');
var Response = require('../util/response');
var ERRORS = require('../util/errors');

module.exports.isAuthenticated = function(req, res, next) {
    var token = req.header('Authorization');
    if (token) {
        var decoded_token = jwt.verifyToken(token);
        if (!decoded_token) {
            Response.sendAuthError(res, {'message': ERRORS.INVALID_TOKEN})
        } else {
            req.decoded_token = decoded_token;
            return next();
        }
    } else {
        Response.sendAuthError(res,{'message': ERRORS.TOKEN_REQUIRED})
    }
};
