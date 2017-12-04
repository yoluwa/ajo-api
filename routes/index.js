var express = require('express');
var router = express.Router();
var UserController = require('../controllers/usercontroller');
var HomeController = require('../controllers/homecontroller');

router.get('/', HomeController.index);
router.get('/users', UserController.index);
router.post('/register', UserController.create);

module.exports = router;