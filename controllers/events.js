const Worker = require('../models/worker');
const Venue = require('../models/venue');
const Event = require('../models/event');
const { events } = require('../models/user');

module.exports = {
    index,
    new: newEvent,
    create,
    show,
    // addToEvent,
    editEventDetails,
    updateEvent,
    deleteEvent,
    detailed,
    // removeFromEvent,
}




function deleteEvent(req, res) {
    Event.findByIdAndDelete(req.params.id, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("Deleted : ", docs);
        }
        res.redirect('/events/')
    })
}

function editEventDetails(req, res) {
    Event.find({}, function(err, events) {
        Venue.find({}, function(err, venues) {

            console.log('edit EVENT begin')
            Event.findById(req.params.id, function(err, event) {
                Venue.findById(event.venue, function(err, venue) {
                    let workers = event.workers
                    console.log(workers)
                    et = event.date
                    console.log(event.date)
                    let editDate = `${et.getFullYear()}-${(et.getMonth() + 1).toString().padStart(2, '0')}`;
                    editDate += `-${et.getDate().toString().padStart(2, '0')}T${et.toTimeString().slice(0, 5)}`;

                    console.log('Edit details, venue: ')
                    console.log(event.venue)
                    if (err) console.log(err)
                    res.render(`events/edit`, { title: "Edit Event", venues, venue, event, events, editDate, workers })
                })
            })
        })
    })
}

function updateEvent(req, res) {
    Event.findById(req.params.id, function(err, event) {

        console.log("event")
        console.log(req.body.name)
        console.log("Update event working?")

        event.name = req.body.name,
            event.client = req.body.client,
            event.date = req.body.date,
            event.venue = req.body.venue,
            event.duration = req.body.duration,

            event.save(function(err) {
                console.log(event)
                console.log('Huh', event._id)
                res.redirect(`/events/${event._id}`)
            })
    })

}

function addToEvent(req, res) {
    console.log("wanna do me a push?")
    Event.findById(req.params.id, function(err, event) {
        console.log('worker push?')
        event.workers.push(req.body.workerId)
        event.save(function(err) {
            res.redirect(`/events/${event._id}`);
        })
    })
}

// function removeFromEvent(req, res) {
//     console.log('remove start')
//     Event.findById(req.params.id, function(err, event) {
//         Worker.findById(req.body.workerId, function(err, worker) {
//             idx = events.workers.findIndex(worker)
//             console.log('worker slice?')
//             event.workers.slice(idx, 1)
//             event.save(function(err) {
//                 res.redirect(`/events/${event._id}`);
//             })

//         })
//     })

// }

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

function create(req, res) {

    var event = new Event(req.body);
    console.log("new event")
    console.log(event)

    Venue.findById(req.body.venue, function(err, venue) {
        // console.log('Venue dot find')
        // console.log(venueId)
        // event.venue = req.body.venue
        // console.log(req.body)
        // console.log("Event Name: ")
        // console.log(event.name)
        // console.log("Event Venue: ")
        // console.log(event.venue)
        venue.events.push(event)
        console.log("Add event to venue begin")
        console.log(event)
        console.log(venue)
        venue.save()
        event.save(function(err) {
            if (err) return res.redirect('/events/new');

            res.redirect(`/events/${event._id}`)
        })

    })
}

function show(req, res) {
    console.log('show begin')
    Event.find({}, function(err, events) {
        Event.findById(req.params.id).populate('workers').exec(function(err, event) {
            console.log(event)
            Worker.find({ _id: { $nin: event.workers } })
                .exec(function(err, workers) {
                    Venue.findById(event.venue, function(err, venue) {
                        console.log('*****', event.venue)
                        res.render('events/show', { title: 'Details', events, event, venue, workers });
                    })
                })
        });
    });
}

function detailed(req, res) {
    console.log('detailed event begin')
    Event.find({}, function(err, events) {
        Event.findById(req.params.id).populate('workers').exec(function(err, event) {
            console.log(event)
            Worker.find({ _id: { $nin: event.workers } })
                .exec(function(err, workers) {
                    Venue.findById(event.venue, function(err, venue) {
                        Worker.findById(req.params.id1, function(err, worker){

                            console.log('*****', event.venue)
                            res.render('events/detailed', { title: 'Details', events, event, venue, workers, worker });
                        })
                    })
                })
        });
    });

}

// function show(req, res) {
//     Event.find({}, function(err, events) {
//         Event.findById(req.params.id, function(err, event) {
//             Worker.find({}, function(err, workers) {
//                 // console.log(workers)
//                 // console.log("Venue Find ? ")
//                 // console.log(event.venue)
//                 Venue.findById(event.venue, function(err, venue) {
//                     // console.log(venue)
//                     // console.log(event)
//                     // console.log("New Event Yass!?")
//                     // console.log(events)
//                     res.render('events/show', { title: 'Details', events, event, venue, workers });

//                 })
//             })
//         });
//     });
// }