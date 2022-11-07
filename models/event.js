const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    client: String,
    date: Date,
    // venue: String,
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    duration: Number,
    // workers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }]
}, {
    timeStamps: true
});

module.exports = mongoose.model('Event', eventSchema);