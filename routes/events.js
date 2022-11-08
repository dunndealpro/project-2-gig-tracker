var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/events')

router.get('/', eventsCtrl.index);
router.get('/new', eventsCtrl.new);
router.get('/:id', eventsCtrl.show);
router.post('/', eventsCtrl.create);
router.post('/events/:id/workers', eventsCtrl.addToEvent)

module.exports = router