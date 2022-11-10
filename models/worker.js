const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workerSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    phoneNumber: String,
    city: String,
    state: String,
    specialty: String,
    dayRate: Number,
    eventsBooked: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
        // venuesWorked: [{ type: Schema.Types.ObjectId, ref: 'Venue' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Worker', workerSchema);