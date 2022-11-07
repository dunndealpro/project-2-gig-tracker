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
    const et = new Date()
    let defaultDate = `${et.getFullYear()}-${(et.getMonth() + 2).toString().padStart(2, '0')}`;
    defaultDate += `-${et.getDate().toString().padStart(2, '0')}T${et.toTimeString().slice(0, 5)}`;
    Event.find({}, function(err, events) {
        Venue.find({}, function(err, venues) {
            Worker.find({}, function(err, workers) {
                console.log('new event')
                res.render('events/new', { title: 'Add event', events, venues, workers, defaultDate });
            })
        })
    });
};

// function create(req, res) {
//     var event = new Event(req.body);
//     event.venue = req.body.venue
//     console.log(req.body.venue)
//     console.log("Event Name: ")
//     console.log(event.name)
//     console.log("Event Venue: ")
//     console.log(event.venue)
//     event.save(function(err) {
//         if (err) return res.redirect('/events/new');

//         res.redirect(`/events/${event._id}`)
//     })
// }

function create(req, res) {

    var event = new Event(req.body);

    Venue.findById(req.body.venue, function(err, venueId) {
        // console.log('Venue dot find')
        // console.log(venueId)
        // event.venue = req.body.venue
        // console.log(req.body)
        // console.log("Event Name: ")
        // console.log(event.name)
        // console.log("Event Venue: ")
        // console.log(event.venue)
        event.save(function(err) {
            if (err) return res.redirect('/events/new');

            res.redirect(`/events/${event._id}`)
        })

    })
}

function show(req, res) {
    Event.find({}, function(err, events) {
        Event.findById(req.params.id, function(err, event) {
            console.log("Venue Find ? ")
            console.log(event.venue)
            Venue.findById(event.venue, function(err, venue) {
                console.log(venue)
                console.log(event)
                console.log("New Event Yass!?")
                    // console.log(events)
                res.render('events/show', { title: 'Details', events, event, venue });
            })
        });
    });
}


// function create(req, res) {

//     var event = new Event(req.body);
//     Venue.findById(`"${req.body.venue}"`, function(err, venueId) {
//         console.log('Venue dot find')
//         console.log(venueId)
//         event.venue = req.body.venue
//         console.log(req.body.venue)
//         console.log("Event Name: ")
//         console.log(event.name)
//         console.log("Event Venue: ")
//         console.log(event.venue)
//         event.save(function(err) {
//             if (err) return res.redirect('/events/new');

//             res.redirect(`/events/${event._id}`)
//         })

//     })
// }