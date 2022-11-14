const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    client: String,
    date: Date,
    venue: { type: Schema.Types.ObjectId, ref: 'VenueId' },
    workers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }]
}, {
    timeStamps: true
});

module.exports = mongoose.model('Event', eventSchema);