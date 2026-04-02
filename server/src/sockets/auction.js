const rooms = {};

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('create_room', (data) => {
            const { roomName, budget, squadSize } = data;
            const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
            
            rooms[roomId] = {
                id: roomId,
                name: roomName,
                budget: budget || 100,
                squadSize: squadSize || 25,
                host: socket.id,
                currentAuctionState: {
                    playerId: "player_1",
                    currentBid: 2.0, // in Cr
                    highestBidder: null,
                    timer: 30,
                    status: "ACTIVE" 
                },
                participants: [{ id: socket.id, role: 'host' }]
            };

            socket.join(roomId);
            console.log(`Room created: ${roomId} by ${socket.id}`);
            socket.emit('room_created', { roomId, room: rooms[roomId] });
        });

        socket.on('join_room', (roomId) => {
            if (rooms[roomId]) {
                socket.join(roomId);
                
                // Add to participants if not already
                if (!rooms[roomId].participants.find(p => p.id === socket.id)) {
                   rooms[roomId].participants.push({ id: socket.id, role: 'bidder' });
                }

                console.log(`User ${socket.id} joined room: ${roomId}`);
                // Send current room state to the newly joined client
                socket.emit('room_joined', rooms[roomId]);
                // Notify others in room
                io.to(roomId).emit('user_joined', { userId: socket.id, totalParticipants: rooms[roomId].participants.length });
            } else {
                socket.emit('error', { message: 'Room not found' });
            }
        });

        // The heart of the bidding logic
        socket.on('place_bid', async (data) => {
            const { roomId, teamId, bidAmount } = data;
            const room = rooms[roomId];

            if (!room) return socket.emit('bid_error', { message: 'Invalid room' });

            // 1. Race condition protection: Ignore if bid is lower or equal to current
            if (bidAmount <= room.currentAuctionState.currentBid) {
                return socket.emit('bid_error', { message: 'Bid is too low, someone else may have just bid.' });
            }

            // 2. Process the successful bid
            room.currentAuctionState.currentBid = bidAmount;
            room.currentAuctionState.highestBidder = teamId;
            
            // Reset Timer to 30 seconds
            room.currentAuctionState.timer = 30;
            
            // Broadcast update to specific room clients
            io.to(roomId).emit('auctionUpdate', room.currentAuctionState);
            io.to(roomId).emit('bid_log', { teamId, amount: bidAmount, time: new Date() });
            
            console.log(`Bid placed by ${teamId} in ${roomId}: ${bidAmount} Cr`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            // Logic to remove user from rooms could be added here
        });
    });
};
