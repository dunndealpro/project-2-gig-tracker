var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/events')
const isLoggedIn = require('../config/auth')

router.get('/events/:id/delete', isLoggedIn, eventsCtrl.deleteEvent)
router.get('/events', eventsCtrl.index);
router.get('/events/new', isLoggedIn, eventsCtrl.new);
router.get('/events/:id', isLoggedIn, eventsCtrl.show);
router.post('/events/', isLoggedIn, eventsCtrl.create);
router.get('/events/:id/edit', isLoggedIn, eventsCtrl.editEventDetails);
router.get('/events/:id/:id1', isLoggedIn, eventsCtrl.detailed)
router.put('/events/:id', isLoggedIn, eventsCtrl.updateEvent);

module.exports = router