const Worker = require('../models/worker');
const Venue = require('../models/venue');
const Event = require('../models/event');
const { events } = require('../models/user');
const venue = require('../models/venue');

module.exports = {
    index,
    new: newEvent,
    create,
    show,
    editEventDetails,
    updateEvent,
    deleteEvent,
    detailed,
}


function deleteEvent(req, res) {
    Event.findByIdAndDelete(req.params.id, function(err, docs) {
        res.redirect('/events/')
    })
}

function editEventDetails(req, res) {
    Event.find({}, function(err, events) {
        Venue.find({}, function(err, venues) {

            Event.findById(req.params.id, function(err, event) {
                Venue.findById(event.venue, function(err, venue) {
                    let workers = event.workers
                    et = event.date
                    let editDate = `${et.getFullYear()}-${(et.getMonth() + 1).toString().padStart(2, '0')}`;
                    editDate += `-${et.getDate().toString().padStart(2, '0')}T${et.toTimeString().slice(0, 5)}`;
                    if (err) console.log(err)
                    res.render(`events/edit`, { title: "Edit Event", venues, venue, event, events, editDate, workers })
                })
            })
        })
    })
}

function updateEvent(req, res) {
    Event.findById(req.params.id, function(err, event) {
        oldVenue = event.venue,
        newVenue = req.body.venue,
        event.name = req.body.name,
        event.client = req.body.client,
        event.date = req.body.date,
        event.venue = newVenue,
        Venue.findById(oldVenue, function(err, venueOld){
            console.log("huh", venueOld)
            idx=venueOld.events.indexOf(event._id)
            venueOld.events.splice(idx, 1)
            console.log(venueOld.events)
            console.log(newVenue)
            venueOld.save()
        })
        Venue.findById(newVenue, function(err, venueNew){
            venueNew.events.push(event)
            venueNew.save()
        })
        
        event.save(function(err) {
                res.redirect(`/events/${event._id}`)
            })
            
    })

    Venue.findById(req.body.venue, function(err, venue){
        Venue.events
    })
    console.log("update working?")
}

function addToEvent(req, res) {
    console.log("wanna do me a push?")
    Event.findById(req.params.id, function(err, event) {
        event.workers.push(req.body.workerId)
        event.save(function(err) {
            res.redirect(`/events/${event._id}`);
        })
    })
}

function index(req, res) {
    Event.find({}, function(err, events) {
        res.render('events/index', { title: 'All Events', events });
    });
};

function newEvent(req, res) {
    const et = new Date()
    let defaultDate = `${et.getFullYear()}-${(et.getMonth() + 2).toString().padStart(2, '0')}`;
    defaultDate += `-${et.getDate().toString().padStart(2, '0')}T${et.toTimeString().slice(0, 5)}`;
    Event.find({}, function(err, events) {
        Venue.find({}, function(err, venues) {
            Worker.find({}, function(err, workers) {
                res.render('events/new', { title: 'Add event', events, venues, workers, defaultDate });
            })
        })
    });
};

function create(req, res) {
    var event = new Event(req.body);
    Venue.findById(req.body.venue, function(err, venue) {
        venue.events.push(event)
        venue.save()
        event.save(function(err) {
            if (err) return res.redirect('/events/new');
            res.redirect(`/events/${event._id}`)
        })
    })
}

function show(req, res) {
    Event.find({}, function(err, events) {
        Event.findById(req.params.id).populate('workers').exec(function(err, event) {
            Worker.find({ _id: { $nin: event.workers } })
                .exec(function(err, workers) {
                    Venue.findById(event.venue, function(err, venue) {
                        res.render('events/show', { title: 'Details', events, event, venue, workers });
                    })
                })
        });
    });
}

function detailed(req, res) {
    Event.find({}, function(err, events) {
        Event.findById(req.params.id).populate('workers').exec(function(err, event) {
            Worker.find({ _id: { $nin: event.workers } })
                .exec(function(err, workers) {
                    Venue.findById(event.venue, function(err, venue) {
                        Worker.findById(req.params.id1, function(err, worker) {
                            res.render('events/detailed', { title: 'Events', events, event, venue, workers, worker });
                        })
                    })
                })
        });
    });
}