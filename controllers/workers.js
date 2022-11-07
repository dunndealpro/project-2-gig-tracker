const Worker = require('../models/worker')
const Venue = require('../models/venue')

module.exports = {
    index,
    new: newWorker,
    show,
    create
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

function create(req, res) {
    var worker = new Worker(req.body);
    worker.save(function(err) {
        if (err) return res.redirect('/workers/new');
        res.redirect(`/workers/${worker._id}`)
    })
}

function show(req, res) {
    Worker.find({}, function(err, workers) {
        Worker.findById(req.params.id, function(err, worker) {

            // console.log(venue)
            // console.log("Yass!?")
            // console.log(venues)
            res.render('workers/show', { title: 'Details', workers, worker });
        });
    });
}