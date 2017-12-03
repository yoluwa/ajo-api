var User = require('../models/user');
var Response = require('../util/response');
var bcrypt = require('bcrypt');

module.exports.index = function(req, res, next) {
    User.find({}).sort('-date').then(function(doc) {
        Response.sendSuccess(res, doc)
    }, function(err){
        Response.sendError(res, err)
    })
};

module.exports.create = function(req, res, next) {
    var hashed_password = bcrypt.hash(req.body.password,10, function(err, hash) {
       return hash;
    });
    var user = new User({
       name: req.body.name,
       password: hashed_password,
       email: req.body.email,
       phone: req.body.phone,
       bvn: req.body.bvn,
       account_number: req.body.account_number,
       security_question: req.body.security_question,
       date_of_birth: req.body.date_of_birth,
       bank_name: req.body.bank_name
    });
    user.save().then(function(doc){
        Response.sendSuccess(res,doc)
    }, function(err){
        Response.sendError(res, err)
    });
};