var paystack_config = require('../config/paystack');
var request = require('request');

module.exports.paymentLink = function(req, res, next){

};

module.exports.verifyReference = function (req, reference) {
    var options = {
        headers: {
            'Authorization': 'Bearer ' + paystack_config.secret_key
        },
        url: 'https://api.paystack.co/transaction/verify/' + reference
    };
    return new Promise(function ( resolve, reject) {
        request(options, function(error, response, body) {
            console.log(body);
            if (!error && (response.statusCode === 200)) {
                var data = JSON.parse(body).data;
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
};