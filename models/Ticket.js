const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

    ticketId: {
        type: String,
        unique: true,
        required: true
    },

    customerName: {
        type: String,
        required: true,
        trim: true
    },

    customerEmail: {
        type: String,
        required: true,
        trim: true
    },

    subject: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Open", "In Progress", "Closed"],
        default: "Open"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Ticket", ticketSchema);