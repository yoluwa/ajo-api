
module.exports.sendSuccess = function (res, content) {
    res.status(200);
    res.json({status: 'success', data: content});
};

module.exports.sendError = function (res, content) {
    res.status(200);
    res.json({status: 'error', data: content});
};