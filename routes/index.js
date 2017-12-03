var express = require('express');
var router = express.Router();
var UserController = require('../controllers/usercontroller');

router.get('/users', UserController.index);
router.post('/register', UserController.create);

module.exports = router;