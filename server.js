/**
 * Created by user on 2/2/2017.
 */
var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var morgan = require ('morgan');
var jwt = require('jsonwebtoken');
var constants = require('./util/constants');

var api = require('./routes/index');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api/v1', api);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({'status': 'error', 'data': {'message': err.message}});
});

app.listen(port, function(){
    console.log('Running at Port' + port);
});

module.exports = app;


