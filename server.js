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
    res.render('error');
});

app.listen(port, function(){
    console.log('Running at Port' + port);
});

module.exports = app;


/*
routes.get('/', function (req, res) {
    res.json({message: "Welcome authentication Api"});
});

app.get('/users', function (req, res) {
    User.find({}, function(err, users){
        res.json(users)
    });
});

routes.post('/login', function (req, res) {
    //find the user
    User.findOne({
     email :req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user){
         res.json({success:false, message: "Authentication failed!, User not found"})
        }else{
             if (user.password === req.body.password){
                 // if user is found and password is right
                 // create a token
                 var token = jwt.sign(user, app.get('superSecret'), {
                     //expiresInMinutes: 1440 // expires in 24 hours
                 });

             }

            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });

        }
    })
});

app.post('/register', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    var newUser = new User({
        email:email,
        password: password,
        phone: phone
    });


    newUser.save(function(err){
        if(err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    });


   // req.flash('success_msg', 'You are registered and can now login');
    res.json({
        success: true,
        message: 'You are registered and can now login'
    });

});


routes.use(function(req, res, next){
 var token = req.body.token || req.query.token || req.headers['x-access-token'];

 if (token){
  jwt.verify(token, app.get('superSecret'), function (err, decoded) {
     if (err){
      return res.json({success: false, message: 'Failed to authenticate'});
     } else{
      //if everthing is good, save to request for use in the routes
         req.decoded = decoded;
         next();
     }
  });
 }else{
  return res.status(403).send({
   success: false,
      messsage: 'no token provided'
  });
 }
});

app.use('/api', routes);

app.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({
        email: 'micheal@gmail.com',
        password: 'password',
        phone: "081"
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

app.get('/', function (req, res) {
    res.send('Hello! ');
});

app.listen(port, function(){
 console.log('Running at Port' + port);
});*/
