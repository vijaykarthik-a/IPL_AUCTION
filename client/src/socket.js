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

export const socket = io(getSocketURL(), {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling'] // Support both WebSocket and polling
});
