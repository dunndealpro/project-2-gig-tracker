const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    power: String,
    union: Boolean,
})

module.exports = mongoose.model('Venue', venueSchema);