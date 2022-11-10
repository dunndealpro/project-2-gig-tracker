const Worker = require('../models/worker');
const Venue = require('../models/venue');
const Event = require('../models/event')


module.exports = {
    index,
    new: newVenue,
    create,
    show,
    deleteVenue,
    editVenueDetails,
    updateVenue
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

            // console.log(venue)
            console.log("Yass!?")
            console.log(venue)
            res.render('venues/show', { title: 'Details', venues, venue });
        });
    });
}

function deleteVenue(req, res) {
    Venue.findByIdAndDelete(req.params.id, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("Deleted : ", docs);
        }
        res.redirect('/venues/')
    })
}

function editVenueDetails(req, res) {
    Venue.find({}, function(err, venues) {
        console.log('edit venue begin')
        Venue.findById(req.params.id, function(err, venue) {
            console.log(venue)
            if (err) console.log(err)
            res.render(`venues/edit`, { title: "Edit Venue", venue, venues })
        })
    })
}

function updateVenue(req, res) {
    Venue.findById(req.params.id, function(err, venue) {
        //     console.log("venue")
        //     console.log(venue)
        console.log("Update venue working?")
        venue.name = req.body.name,

            venue.city = req.body.city,
            venue.state = req.body.state,
            venue.power = req.body.power,
            venue.union = req.body.union,
            venue.save(function(err) {
                console.log('Huh', venue._id)
                res.redirect(`/venues/${venue._id}`)
            })
    })

}