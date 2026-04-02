let currentAuctionState = {
    playerId: "player_10",
    currentBid: 2.0, // in Cr
    highestBidder: null,
    timer: 30,
    status: "ACTIVE" // ACTIVE, SOLD
  };
  
let timerInterval;

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Send the current state immediately to newly connected clients
        socket.emit('auctionUpdate', currentAuctionState);

        // The heart of the bidding logic
        socket.on('place_bid', async (data) => {
            const { teamId, bidAmount } = data;

            // 1. Race condition protection: Ignore if bid is lower or equal to current
            if (bidAmount <= currentAuctionState.currentBid) {
                return socket.emit('bid_error', { message: 'Bid is too low, someone else may have just bid.' });
            }

            // 2. Process the successful bid
            currentAuctionState.currentBid = bidAmount;
            currentAuctionState.highestBidder = teamId;
            
            // Reset Timer to 30 seconds
            currentAuctionState.timer = 30;
            
            // Broadcast update to ALL connected clients
            io.emit('auctionUpdate', currentAuctionState);
            io.emit('bid_log', { teamId, amount: bidAmount, time: new Date() });
            
            console.log(`Bid placed by ${teamId}: ${bidAmount} Cr`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
