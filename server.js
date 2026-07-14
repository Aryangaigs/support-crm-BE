const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/database");

const ticketRoutes = require("./routes/ticket.routes");

connectDB();

const app = express();

app.use(cors({
    origin: "*", // Allow all origins (good for development/demo)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false
}));

app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
    res.send("Support CRM API Running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});