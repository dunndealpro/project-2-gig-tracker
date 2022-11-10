const Worker = require('../models/worker')
const Venue = require('../models/venue')
const Event = require('../models/event')
    // const worker = require('../models/worker')

module.exports = {
    index,
    new: newWorker,
    show,
    create,
    addToEvent,
    editWorkerDetails,
    updateWorker,
    deleteWorker,
    removeFromEvent
}

function removeFromEvent(req, res) {
    console.log('remove start')
    console.log(req.params.id1)
    Event.findById(req.params.id, function(err, event) {
        console.log("Event: ")
        console.log(event)
        console.log(event.workers)
        let workers = event.workers
        Worker.findById(req.params.id1, function(err, worker) {
            console.log("Worker: ")
            console.log(worker)
            console.log(worker._id)
                // console.log(event.workers[0])
            idx = workers.indexOf(worker._id)
            console.log('worker slice?')
            console.log(idx)
            workers.splice(idx, 1)
            worker.save()
            console.log(event.workers)
            event.save(function(err) {
                res.redirect(`/events/${event._id}`);
            })

        })
    })

}

function deleteWorker(req, res) {
    Worker.findByIdAndDelete(req.params.id, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("Deleted : ", docs);
        }
        res.redirect('/workers/')
    })
}

function editWorkerDetails(req, res) {
    Worker.find({}, function(err, workers) {
        console.log('edit worker begin')
        Worker.findById(req.params.id, function(err, worker) {
            console.log(worker)
            if (err) console.log(err)
            res.render(`workers/edit`, { title: "Edit Worker", worker, workers })
        })
    })
}

function updateWorker(req, res) {
    Worker.findById(req.params.id, function(err, worker) {
        //     console.log("worker")
        //     console.log(worker)
        console.log("Update worker working?")
        worker.name = req.body.name,
            worker.phoneNumber = req.body.phoneNumber,
            worker.city = req.body.city,
            worker.state = req.body.state,
            worker.specialty = req.body.specialty,
            worker.dayRate = req.body.dayRate,
            worker.save(function(err) {
                console.log('Huh', worker._id)
                res.redirect(`/workers/${worker._id}`)
            })
    })

}

function addToEvent(req, res) {

    console.log('worker push? 1')
    Event.findById(req.params.id, function(err, event) {
        Worker.findById(req.body.workerId, function(err, worker) {

            console.log('worker push? 2')
            event.workers.push(req.body.workerId)

            console.log('gig push??')
            worker.eventsBooked.push(event)
            worker.save()
            console.log(worker)
            event.save(function(err) {
                if (err) console.log(err)
                res.redirect(`/events/${event._id}`);
            })
        })
    })
}

function index(req, res) {

    Worker.find({}, function(err, workers) {
        console.log('worker index')
        res.render('workers/index', { title: 'Workers', workers })
    })
}

function newWorker(req, res) {

    Worker.find({}, function(err, workers) {
        console.log('new worker')
        res.render('workers/new', { title: 'Add Worker', workers });
    });
};

// function create(req, res) {
//     // var worker = new Worker(req.body);
//     worker.create(req.body)
//     res.redirect(`/workers/${worker._id}`)
// }


function create(req, res) {
    var worker = new Worker(req.body);
    worker.save(function(err) {
        if (err) return res.redirect('/workers/new');
        res.redirect(`/workers/${worker._id}`)
    })
}

function show(req, res) {
    Worker.find({}, function(err, workers) {
        console.log("Show Worker Start")
        console.log(req.params.id)
        Worker.findById(req.params.id).populate('eventsBooked').exec(function(err, worker) {
            console.log(err)
            console.log("is this working?")
            console.log(worker)
            res.render('workers/show', { title: 'Details', workers, worker });
        });
    });
}


// function show(req, res) {
//     Worker.find({}, function(err, workers) {
//         Worker.findById(req.params.id, function(err, worker) {

//             // console.log(venue)
//             console.log("Workers Show working")
//                 // console.log(venues)
//             events = worker.eventsBooked

//             res.render('workers/show', { title: 'Details', workers, worker, events });
//         });
//     });
// }
// // function editWorkerDetails(req, res) {
//     console.log('edit starts')
//     console.log(req.params.id)
//     res.render('workers/edit', {
//         worker: Worker.findById(req.params.id),
//         workers: Worker.find({}),
//         title: "Edit Workers"
//     })
// }

// function updateWorker(req, res) {
//     console.log("update")
//     Worker.updateOne(req.params.id, req.body);
//     // console.log(Worker.findById(req.params.id))
//     res.redirect('/workers');
// }
// function updateWorker(req, res) {
//     console.log("Update worker working?")
//     console.log(req.body)
//         // req.body = req.body
//     Worker.updateOne({ _id: req.params.id }, {
//         $set: {
//             'name': req.body.name,
//             'phoneNumber': req.body.phoneNumber,
//             'city': req.body.city,
//             'state': req.body.state,
//             'specialty': req.body.specialty,
//             'dayRate': req.body.dayRate
//         }
//     })
//     console.log('update work?')

//     res.redirect(`/workers/${worker._id}`)
// }