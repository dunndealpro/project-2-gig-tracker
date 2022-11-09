const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workerSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    phoneNumber: Number,
    city: String,
    state: String,
    specialty: String,
    dayRate: Number,
    // venuesWorked: [{ type: Schema.Types.ObjectId, ref: 'Venue' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Worker', workerSchema);