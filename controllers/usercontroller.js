var User = require('../models/user');
var Response = require('../util/response');
var bcrypt = require('bcrypt');
var ERRORS = require('../util/errors');
var jwt = require('../util/jwt');
var paymentprovider = require('./paymentprovider');

module.exports.userExistsById = function(id) {
    return User.findById(id).exec();
};

module.exports.userExistsByEmail = function(email) {
    return User.findOne({email: email}).exec();
};

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
    }, '+password').then(function(doc) {
        if (!doc) {
            Response.sendError(res, {'message' : ERRORS.USER_NOT_FOUND});
        } else {
            bcrypt.compare(req.body.password, doc.password, function(err,result) {
                if (result) {
                    var token = jwt.createToken({email: doc.email, id: doc._id});
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

module.exports.profile = function(req, res, next) {
    User.findById(req.decoded_token.id).populate('groups').exec(function(err, user){
        if (user) {
            Response.sendSuccess(res, user)
        } else {
            Response.sendError(res, {'message': ERRORS.USER_NOT_FOUND});
        }
    })
};

module.exports.creditUser = function(id, amount) {
    return User.findByIdAndUpdate(id, {wallet_balance: amount}).exec();
};

module.exports.fundWallet =  function (req, res, next) {
    paymentprovider.verifyReference(req, req.body.reference).then(function(data) {
        this.creditUser(req.decoded_token.id).then(function (doc){
            Response.sendSuccess(res, doc);
        }).catch( function(err) {
            Response.sendError(res, {'message': err})
        })
    }).catch(function () {
        Response.sendError(res, {'message': ERRORS.INCORRECT_REFERENCE});
    });
};