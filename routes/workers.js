var express = require('express');
var router = express.Router();
var workersCtrl = require('../controllers/workers')
const isLoggedIn = require('../config/auth');



router.get('/workers/', isLoggedIn, workersCtrl.index);
router.get('/workers/new', isLoggedIn, workersCtrl.new);
router.get('/workers/:id', isLoggedIn, workersCtrl.show);
router.post('/workers/', isLoggedIn, workersCtrl.create);
router.post('/events/:id/worker', isLoggedIn, workersCtrl.addToEvent);
router.post('/events/:id/remove/:id1', isLoggedIn, workersCtrl.removeFromEvent);
router.get('/workers/:id/edit', isLoggedIn, workersCtrl.editWorkerDetails);
router.put('/workers/:id', isLoggedIn, workersCtrl.updateWorker);
router.delete('/workers/:id', isLoggedIn, workersCtrl.deleteWorker)

module.exports = router