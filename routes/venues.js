var express = require('express');
var router = express.Router();
var venuesCtrl = require('../controllers/venues')
const isLoggedIn = require('../config/auth');


router.get('/venues', venuesCtrl.index);
router.get('/venues/new', isLoggedIn, venuesCtrl.new);
router.get('/venues/:id', isLoggedIn, venuesCtrl.show);
router.post('/venues/', isLoggedIn, venuesCtrl.create);
router.get('/venues/:id/edit', isLoggedIn, venuesCtrl.editVenueDetails);
router.put('/venues/:id', isLoggedIn, venuesCtrl.updateVenue);
router.get('/venues/:id/delete', isLoggedIn, venuesCtrl.deleteVenue)

module.exports = router