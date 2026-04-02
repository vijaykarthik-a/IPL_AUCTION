const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const auctionSockets = require('./sockets/auction');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for dev
    methods: ["GET", "POST"]
  }
});

app.get('/health', (req, res) => {
  res.send({ status: 'Server is healthy and running.' });
});

// Initialize socket handlers
auctionSockets(io);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Real-Time IPL Auction Backend running on port ${PORT}`);
});
