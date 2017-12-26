var express = require('express');
var router = express.Router();
var UserController = require('../controllers/usercontroller');
var HomeController = require('../controllers/homecontroller');
var GroupController = require('../controllers/groupcontroller');
var Auth = require('../middlewares/auth');

router.get('/', HomeController.index);
router.get('/users', UserController.index);
router.post('/register', UserController.create);
router.post('/login', UserController.authenticate);
router.use('/user', [Auth.isAuthenticated]);
router.post('/user/group/create', GroupController.create);
router.get('/user/profile', UserController.profile);

module.exports = router;