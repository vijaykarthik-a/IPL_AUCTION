const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config(); // Load .env file
const auctionSockets = require('./sockets/auction');

const app = express();
app.use(cors());

const server = http.createServer(app);

// Get environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const RENDER_INTERNAL_HOSTNAME = process.env.RENDER_INTERNAL_HOSTNAME;

// Configure CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: NODE_ENV === 'production' 
      ? FRONTEND_URL.split(',').map(url => url.trim()) 
      : "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowEIO3: true
  },
  transports: ['websocket', 'polling'] // Support both WebSocket and polling
});

app.get('/health', (req, res) => {
  res.send({ status: 'Server is healthy and running.' });
});

// Initialize socket handlers
auctionSockets(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Real-Time IPL Auction Backend running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});
