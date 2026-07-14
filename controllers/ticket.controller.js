const Ticket = require("../models/Ticket");
const Note = require("../models/Note");

const generateTicketId = require("../utils/generateTicketId");

// CREATE TICKET
const createTicket = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      subject,
      description,
    } = req.body;

    // Validation
    if (!customerName || !customerEmail || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const ticketId = await generateTicketId();

    const ticket = await Ticket.create({
      ticketId,
      customerName,
      customerEmail,
      subject,
      description,
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL TICKETS
const getAllTickets = async (req, res) => {
    try {

        const { search, status } = req.query;

        let query = {};

        // Status Filter
        if (status && status !== "All") {
            query.status = status;
        }

        // Search Filter
        if (search) {
            query.$or = [
                { ticketId: { $regex: search, $options: "i" } },
                { customerName: { $regex: search, $options: "i" } },
                { customerEmail: { $regex: search, $options: "i" } },
                { subject: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        const tickets = await Ticket.find(query).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};



const getTicketById = async (req, res) => {
    try {
        

        const ticket = await Ticket.findOne({
            ticketId: req.params.ticketId
        });
        

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        const notes = await Note.find({
            ticketId: req.params.ticketId
        });

        return res.status(200).json({
            success: true,
            data: {
                ticket,
                notes
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateTicket = async (req, res) => {
    try {

        const { status, note } = req.body;

        const ticket = await Ticket.findOne({
            ticketId: req.params.ticketId
        });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        if (status) {
            ticket.status = status;
        }

        await ticket.save();

        if (note && note.trim() !== "") {
            await Note.create({
                ticketId: ticket.ticketId,
                note
            });
        }

        res.status(200).json({
            success: true,
            message: "Ticket Updated Successfully",
            data: ticket
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
};