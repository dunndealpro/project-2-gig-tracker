const Worker = require('../models/worker');
const Venue = require('../models/venue');
const Event = require('../models/event')

module.exports = {
    index,
    new: newEvent,
    create,
    show,
    addToEvent,
    editEventDetails,
    updateEvent,
    deleteEvent,
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

            console.log('edit worker begin')
            Event.findById(req.params.id, function(err, event) {
                et = event.date
                let editDate = `${et.getFullYear()}-${(et.getMonth() + 2).toString().padStart(2, '0')}`;
                editDate += `-${et.getDate().toString().padStart(2, '0')}T${et.toTimeString().slice(0, 5)}`;

                console.log('Edit details, venue: ')
                console.log(editDate)
                if (err) console.log(err)
                res.render(`events/edit`, { title: "Edit Event", venues, event, events, editDate })
            })
        })
    })
}

function updateEvent(req, res) {
    Event.findById(req.params.id, function(err, event) {

        //     console.log("event")
        //     console.log(event)
        console.log("Update event working?")
        event.name = req.body.name,
            event.client = req.body.client,
            event.date = req.body.date,
            event.venue = req.body.venue,
            event.duration = req.body.duration,
            event.workers = req.body.workers,
            event.save(function(err) {
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
    console.log('show begin')
    Event.find({}, function(err, events) {
        Event.findById(req.params.id).populate('workers').exec(function(err, event) {
            Worker.find({ _id: { $nin: event.workers } })
                .exec(function(err, workers) {
                    Venue.findById(event.venue, function(err, venue) {
                        console.log('*****', venue)
                        res.render('events/show', { title: 'Details', events, event, venue, workers });
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