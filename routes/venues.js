var express = require('express');
var router = express.Router();
var venuesCtrl = require('../controllers/venues')

router.get('/', venuesCtrl.index);
router.get('/new', venuesCtrl.new);
router.get('/:id', venuesCtrl.show);
router.post('/', venuesCtrl.create);

module.exports = router