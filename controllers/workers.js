const Worker = require('../models/worker')
const Venue = require('../models/venue')
const Event = require('../models/event')

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

    Event.findById(req.params.id, function(err, event) {

        let workers = event.workers
        Worker.findById(req.params.id1, function(err, worker) {
            idx = workers.indexOf(worker._id)
            workers.splice(idx, 1)
            worker.save()
            event.save(function(err) {
                res.redirect(`/events/${event._id}`);
            })
        })
    })

}

function deleteWorker(req, res) {
    Worker.findByIdAndDelete(req.params.id, function(err, docs) {
        res.redirect('/workers/')
    })
}

function editWorkerDetails(req, res) {
    Worker.find({}, function(err, workers) {
        Worker.findById(req.params.id, function(err, worker) {
            if (err) console.log(err)
            res.render(`workers/edit`, { title: "Edit Worker", worker, workers })
        })
    })
}

function updateWorker(req, res) {
    Worker.findById(req.params.id, function(err, worker) {
        worker.name = req.body.name,
            worker.phoneNumber = req.body.phoneNumber,
            worker.city = req.body.city,
            worker.state = req.body.state,
            worker.specialty = req.body.specialty,
            worker.dayRate = req.body.dayRate,
            worker.save(function(err) {
                res.redirect(`/workers/${worker._id}`)
            })
    })
}

function addToEvent(req, res) {
    Event.findById(req.params.id, function(err, event) {
        Worker.findById(req.body.workerId, function(err, worker) {
            event.workers.push(req.body.workerId)
            worker.eventsBooked.push(event)
            worker.save()
            event.save(function(err) {
                if (err) console.log(err)
                res.redirect(`/events/${event._id}`);
            })
        })
    })
}

function index(req, res) {
    Worker.find({}, function(err, workers) {
        res.render('workers/index', { title: 'Workers', workers })
    })
}

function newWorker(req, res) {
    Worker.find({}, function(err, workers) {
        res.render('workers/new', { title: 'Add Worker', workers });
    });
};

function create(req, res) {
    var worker = new Worker(req.body);
    worker.save(function(err) {
        if (err) return res.redirect('/workers/new');
        res.redirect(`/workers/${worker._id}`)
    })
}

function show(req, res) {
    Worker.find({}, function(err, workers) {
        Worker.findById(req.params.id).populate('eventsBooked').exec(function(err, worker) {
            res.render('workers/show', { title: 'Details', workers, worker });
        });
    });
}