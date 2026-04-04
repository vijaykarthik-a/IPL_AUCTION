import { io } from 'socket.io-client';

// Determine the socket server URL based on environment
const getSocketURL = () => {
  // Development
  if (!import.meta.env.PROD) {
    return 'http://localhost:3001';
  }
  
  // Production - use environment variable or default to current origin
  const backendURL = import.meta.env.VITE_BACKEND_URL || window.location.origin;
  return backendURL;
};

const socketURL = getSocketURL();

// Log for debugging
if (typeof window !== 'undefined') {
  console.log('[Socket.IO] Configured URL:', socketURL);
  console.log('[Socket.IO] Environment:', import.meta.env.MODE);
}

export const socket = io(socketURL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling'] // Support both WebSocket and polling
});

// Connection logging
socket.on('connect', () => {
  console.log('[Socket.IO] ✅ Connected', socket.id);
});

socket.on('disconnect', () => {
  console.log('[Socket.IO] ❌ Disconnected');
});

socket.on('connect_error', (error) => {
  console.error('[Socket.IO] Connection Error:', error);
});

socket.on('error', (error) => {
  console.error('[Socket.IO] Error:', error);
});
