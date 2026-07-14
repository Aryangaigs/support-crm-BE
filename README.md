# Support CRM Backend

A RESTful backend API for a Customer Support Ticketing CRM built using **Node.js**, **Express.js**, and **MongoDB Atlas**.

## Features

- Create support tickets
- View all tickets
- Search tickets
- Filter tickets by status
- View ticket details
- Update ticket status
- Add notes/comments to tickets
- MongoDB Atlas integration
- RESTful API architecture

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

---

## Project Structure

```
config/
controllers/
models/
routes/
utils/
server.js
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

Start the development server

```bash
npm run dev
```

---

## API Endpoints

### Create Ticket

```
POST /api/tickets
```

### Get All Tickets

```
GET /api/tickets
```

Supports

```
?search=
?status=
```

### Get Ticket Details

```
GET /api/tickets/:ticketId
```

### Update Ticket

```
PUT /api/tickets/:ticketId
```

---

## Ticket Status

- Open
- In Progress
- Closed

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server Port |
| MONGO_URI | MongoDB Atlas Connection String |

---

## Author

Aryan Gaigawale