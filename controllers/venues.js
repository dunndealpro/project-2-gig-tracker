const Worker = require('../models/worker');
const Venue = require('../models/venue');
const Event = require('../models/event')


module.exports = {
    index,
    new: newVenue,
    create,
    show
}

function index(req, res) {
    Venue.find({}, function(err, venues) {
        console.log('index')
        res.render('venues/index', { title: 'All Venues', venues });
    });
};

function newVenue(req, res) {
    Venue.find({}, function(err, venues) {
        console.log('new venue')
        res.render('venues/new', { title: 'Add Venue', venues });
    });
};

function create(req, res) {
    var venue = new Venue(req.body);
    console.log(venue)
    console.log(req.body)
    venue.save(function(err) {
        if (err) return res.redirect('/venues/new');
        res.redirect(`/venues/${venue._id}`)
    })
}

function show(req, res) {
    Venue.find({}, function(err, venues) {
        Venue.findById(req.params.id, function(err, venue) {

            console.log(venue)
            console.log("Yass!?")
            console.log(venues)
            res.render('venues/show', { title: 'Details', venues, venue });
        });
    });
}