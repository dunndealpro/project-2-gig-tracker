var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/events')
const isLoggedIn = require('../config/auth')

router.get('/events', eventsCtrl.index);
router.get('/events/new', isLoggedIn, eventsCtrl.new);
router.get('/events/:id', isLoggedIn, eventsCtrl.show);
router.post('/events/', isLoggedIn, eventsCtrl.create);
router.get('/events/:id/edit', isLoggedIn, eventsCtrl.editEventDetails);
router.get('/events/:id/:id1', isLoggedIn, eventsCtrl.detailed)

// router.post('/events/:id/worker', isLoggedIn, workersCtrl.addToEvent);
// router.get('/events/:id/edit', isLoggedIn, eventsCtrl.editeventDetails);
router.put('/events/:id', isLoggedIn, eventsCtrl.updateEvent);
router.delete('/events/:id', isLoggedIn, eventsCtrl.deleteEvent)

module.exports = router