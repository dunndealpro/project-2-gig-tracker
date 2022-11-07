const Worker = require('../models/worker');
const Venue = require('../models/venue');
const Event = require('../models/event')

module.exports = {
    index,
    new: newEvent,
    create,
    show
}

function index(req, res) {
    Event.find({}, function(err, events) {
        console.log('index')
        res.render('events/index', { title: 'All events', events });
    });
};

function newEvent(req, res) {
    Event.find({}, function(err, events) {
        Venue.find({}, function(err, venues) {
            Worker.find({}, function(err, workers) {

                console.log('new event')
                res.render('events/new', { title: 'Add event', events, venues, workers });
            })
        })
    });
};

function create(req, res) {
    var event = new Event(req.body);
    console.log(event)
    event.save(function(err) {
        if (err) console.log(err)
        return res.redirect('/events/new');

        res.redirect(`/events/${event._id}`)
    })
}

function show(req, res) {
    Event.find({}, function(err, events) {
        Event.findById(req.params.id, function(err, event) {

            console.log(event)
            console.log("Event Yass!?")
            console.log(events)
            res.render('events/show', { title: 'Details', events, event });
        });
    });
}