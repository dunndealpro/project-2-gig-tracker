var express = require('express');
var router = express.Router();
var workersCtrl = require('../controllers/workers')

router.get('/', workersCtrl.index);
router.get('/new', workersCtrl.new);
router.get('/:id', workersCtrl.show);
router.post('/', workersCtrl.create);

module.exports = router