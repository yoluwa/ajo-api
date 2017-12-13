var User = require('../models/user');
var Response = require('../util/response');
var bcrypt = require('bcrypt');
var ERRORS = require('../util/errors');
var jwt = require('../util/jwt');

module.exports.index = function(req, res, next) {
    User.find({}).sort('-date').then(function(doc) {
        Response.sendSuccess(res, doc)
    }, function(err){
        Response.sendError(res, err)
    })
};

module.exports.create = function(req, res, next) {
    bcrypt.hash(req.body.password,10, function(err, hash) {
        var user = new User({
            name: req.body.name,
            password: hash,
            email: req.body.email,
            phone: req.body.phone,
            bvn: req.body.bvn,
            account_number: req.body.account_number,
            security_question: req.body.security_question,
            answer_to_security: req.body.answer_to_security,
            date_of_birth: req.body.date_of_birth,
            bank_name: req.body.bank_name
        });
        user.save().then(function(doc){
            Response.sendSuccess(res,doc)
        }, function(err){
            Response.sendError(res, err)
        });
    });
};

module.exports.authenticate = function(req, res, next) {
    var user = User.findOne({
        email : req.body.email
    }).then(function(doc) {
        if (!doc) {
            Response.sendError(res, {'message' : ERRORS.USER_NOT_FOUND});
        } else {
            bcrypt.compare(req.body.password, doc.password, function(err,result) {
                if (result) {
                    var token = jwt.createToken({email: doc.email, password: doc.password});
                    Response.sendSuccess(res, {'token': token});
                } else {
                    Response.sendError(res, {'message' : ERRORS.INCORRECT_LOGIN})
                }
            });
        }
    }, function(err) {
        Response.sendError(res, err)
    });
};