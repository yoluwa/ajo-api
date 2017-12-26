var User = require('../models/user');
var Response = require('../util/response');
var bcrypt = require('bcrypt');
var ERRORS = require('../util/errors');
var jwt = require('../util/jwt');
var Group = require('../models/group');
var UserController = require('./usercontroller');

module.exports.create = function(req, res, next) {
    var members = req.body.members.split(',');
    var group = new Group({
        name: req.body.name,
        creator: req.decoded_token.id,
        frequency: req.body.frequency,
        reason: req.body.reason,
        members: []
    });
    if (!req.body.members) {
        return Response.sendError(res, {'message': ERRORS.MINIMUM_MEMBERS})
    } else {
        Group.findOne({creator: req.decoded_token.id, name: req.body.name}).exec()
            .then(function(doc){
                if (doc) {
                    return Response.sendError(res, {'message': ERRORS.UNIQUE_GROUP_NAME});
                } else if (members.indexOf(req.decoded_token.email) > -1){
                    return Response.sendError(res, {'message': ERRORS.CREATOR_ERROR})
                } else {
                    members.forEach(function(member) {
                        UserController.userExistsByEmail(member).then(function(user){
                            group.members.push(user._id);
                            saveGroup();
                        }).catch(function(err) {
                            return Response.sendError(res, {'message': member +' not found'});
                        })
                    });
                }
            });

        var saveGroup = function () {
            console.log(group.members);
            if (members.length === group.members.length) {
                group.save().then(function (doc) {
                    return Response.sendSuccess(res, doc)
                })
            }
        }

    }
};