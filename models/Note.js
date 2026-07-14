const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

    ticketId: {
        type: String,
        required: true
    },

    note: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Note", noteSchema);