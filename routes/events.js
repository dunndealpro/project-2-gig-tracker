var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/events')
const isLoggedIn = require('../config/auth')

router.get('/', eventsCtrl.index);
router.get('/new', isLoggedIn, eventsCtrl.new);
router.get('/:id', eventsCtrl.show);
router.post('/', isLoggedIn, eventsCtrl.create);
router.post('/events/:id/worker', eventsCtrl.addToEvent)

module.exports = router