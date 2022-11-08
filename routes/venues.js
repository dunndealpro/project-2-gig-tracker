var express = require('express');
var router = express.Router();
var venuesCtrl = require('../controllers/venues')
const isLoggedIn = require('../config/auth');


router.get('/', venuesCtrl.index);
router.get('/new', isLoggedIn, venuesCtrl.new);
router.get('/:id', isLoggedIn, venuesCtrl.show);
router.post('/', isLoggedIn, venuesCtrl.create);

module.exports = router