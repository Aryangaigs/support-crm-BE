const Ticket = require("../models/Ticket");

const generateTicketId = async () => {

    const latestTicket = await Ticket
        .findOne()
        .sort({ createdAt: -1 });

    if (!latestTicket) {
        return "TKT-1001";
    }

    const lastNumber = parseInt(
        latestTicket.ticketId.split("-")[1]
    );

    return `TKT-${lastNumber + 1}`;
};

module.exports = generateTicketId;