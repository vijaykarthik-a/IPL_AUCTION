import { io } from 'socket.io-client';

// Determine the socket server URL based on environment
const getSocketURL = () => {
  // Development
  if (!import.meta.env.PROD) {
    console.log('[Socket.IO] Development mode - using localhost:3001');
    return 'http://localhost:3001';
  }
  
  // Production - MUST use environment variable
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  
  if (!backendURL) {
    console.error('[Socket.IO] ❌ CRITICAL: VITE_BACKEND_URL not set in production!');
    console.error('[Socket.IO] Add VITE_BACKEND_URL to Vercel environment variables');
    console.error('[Socket.IO] Example: https://your-render-url.onrender.com');
    throw new Error('Socket.IO backend URL not configured');
  }
  
  console.log('[Socket.IO] Production mode - using:', backendURL);
  return backendURL;
};

const socketURL = getSocketURL();

export const socket = io(socketURL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling'],
  path: '/socket.io/',
  withCredentials: true
});

// Connection logging
socket.on('connect', () => {
  console.log('[Socket.IO] ✅ Connected', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('[Socket.IO] ❌ Disconnected -', reason);
});

socket.on('connect_error', (error) => {
  console.error('[Socket.IO] Connection Error:', error.message);
  console.error('[Socket.IO] Details:', error);
});

socket.on('error', (error) => {
  console.error('[Socket.IO] Error:', error);
});
