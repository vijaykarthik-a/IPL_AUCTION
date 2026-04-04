import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { socket } from '../socket';

const mockPlayer = {
  name: "Ben Stokes",
  role: "All-Rounder",
  country: "England",
  basePrice: "2.00 Cr",
};

export default function AuctionDashboard() {
  const { roomId } = useParams();
  const [currentBid, setCurrentBid] = useState(2.0);
  const [timer, setTimer] = useState(30);
  const [bids, setBids] = useState([{ team: "CSK", amount: 2.0 }, { team: "MI", amount: 1.8 }]);
  const [roomState, setRoomState] = useState(null);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    if (roomId) socket.emit('join_room', roomId);

    const handleRoomJoined = (room) => {
      setRoomState(room);
      if (room.currentAuctionState) {
        setCurrentBid(room.currentAuctionState.currentBid);
        setTimer(room.currentAuctionState.timer);
      }
    };
    const handleAuctionUpdate = (state) => {
      setCurrentBid(state.currentBid);
      setTimer(state.timer);
    };
    const handleBidLog = (log) => {
      setBids(prev => [{ team: log.teamId, amount: log.amount }, ...prev]);
    };

    socket.on('room_joined', handleRoomJoined);
    socket.on('auctionUpdate', handleAuctionUpdate);
    socket.on('bid_log', handleBidLog);

    return () => {
      socket.off('room_joined', handleRoomJoined);
      socket.off('auctionUpdate', handleAuctionUpdate);
      socket.off('bid_log', handleBidLog);
    };
  }, [roomId]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleBid = (increment) => {
    const newBid = parseFloat((currentBid + increment).toFixed(2));
    socket.emit('place_bid', { roomId, teamId: 'MY TEAM', bidAmount: newBid });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen p-4 bg-[#131313] w-64 left-0 fixed shadow-2xl font-headline text-sm z-40">
        <div className="mb-10 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
            </div>
            <div>
              <h1 className="text-primary font-black uppercase tracking-widest text-lg">Auction Room</h1>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-tighter">High-Performance Trading</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all">
            <span className="material-symbols-outlined">home</span>
            <span className="font-bold">Home</span>
          </Link>
          <Link to="/lobby" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all">
            <span className="material-symbols-outlined">gavel</span>
            <span>Live Auctions</span>
          </Link>
          <Link to="/players" className="flex items-center gap-3 px-4 py-3 text-primary bg-[#262626] rounded-lg transition-all">
            <span className="material-symbols-outlined">groups</span>
            <span>Player Pool</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-surface-container-highest space-y-1">
          <div className="bg-surface-container rounded-xl p-4 mb-4">
            <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Remaining Purse</p>
            <p className="text-primary font-black text-2xl">₹65.40 <span className="text-sm font-semibold">Cr</span></p>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="md:ml-64 sticky top-0 z-30 bg-[#131313] border-b border-surface-container-highest">
        <div className="flex justify-between items-center px-6 h-16">
          <div>
            <h1 className="text-xl font-headline font-black text-primary">
              {roomState ? roomState.name : 'AUCTION WAR ROOM'}
            </h1>
            {roomId && <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Room: {roomId}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Live</span>
            </div>
            <Link to="/players" className="flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container-highest rounded-xl border border-outline-variant/10 text-on-surface-variant hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">groups</span>
              Player Pool
            </Link>
          </div>
        </div>
      </header>

      <main className="md:ml-64 flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1200px] mx-auto w-full">

        {/* Left: Squad Status */}
        <aside className="col-span-3 space-y-4">
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-5">Squad Status</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-on-surface">Total Players</span>
                  <span className="font-bold text-on-surface">18 <span className="text-on-surface-variant text-sm">/ 25</span></span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[72%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-on-surface">Overseas</span>
                  <span className="font-bold text-on-surface">6 <span className="text-on-surface-variant text-sm">/ 8</span></span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[75%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4">My Purse</h2>
            <p className="text-3xl font-black text-primary">₹65.40</p>
            <p className="text-xs text-on-surface-variant mt-1">of ₹100 Cr remaining</p>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden mt-3">
              <div className="h-full bg-primary w-[65%] rounded-full"></div>
            </div>
          </div>
        </aside>

        {/* Center: Main Auction */}
        <section className="col-span-6 flex flex-col items-center justify-center bg-surface-container-low/50 rounded-3xl p-8 border border-outline-variant/5 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 w-full"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Now Up For Bid</p>
            <h2 className="text-5xl font-headline font-black mb-2 text-on-surface">{mockPlayer.name}</h2>
            <p className="text-on-surface-variant font-bold text-sm mb-10 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <span>{mockPlayer.role}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest"></span>
              <span>{mockPlayer.country}</span>
            </p>

            {/* Current Bid */}
            <div className="mb-10 bg-surface-container rounded-3xl p-8 border border-outline-variant/10 max-w-sm mx-auto">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant block mb-3">Current Bid</span>
              <motion.div
                key={currentBid}
                initial={{ scale: 1.15, color: "var(--color-primary)" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-baseline justify-center gap-2"
              >
                <span className="text-4xl text-on-surface-variant font-light">₹</span>
                <span className="text-7xl font-black tracking-tighter">{currentBid.toFixed(2)}</span>
                <span className="text-3xl text-on-surface-variant font-bold">Cr</span>
              </motion.div>
            </div>

            {/* Timer */}
            <div className="mb-10 w-full flex flex-col items-center">
              <div className={`text-4xl font-black mb-3 tracking-tighter transition-colors duration-300 ${timer <= 5 ? 'text-error' : 'text-on-surface'}`}>
                00:{timer.toString().padStart(2, '0')}
              </div>
              <div className="w-full max-w-sm h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(timer / 30) * 100}%` }}
                  transition={{ ease: "linear", duration: 1 }}
                  className={`h-full rounded-full ${timer <= 5 ? 'bg-error' : 'bg-primary'}`}
                />
              </div>
            </div>

            {/* Bid Buttons */}
            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={() => handleBid(0.2)}
                disabled={timer === 0}
                className="bg-surface-container hover:bg-surface-container-highest disabled:opacity-50 text-on-surface font-bold py-3.5 px-6 rounded-xl transition-all border border-outline-variant/20 hover:border-primary/30 active:scale-95"
              >
                + ₹20L
              </button>
              <button
                onClick={() => handleBid(0.5)}
                disabled={timer === 0}
                className="bg-surface-container hover:bg-surface-container-highest disabled:opacity-50 text-on-surface font-bold py-3.5 px-6 rounded-xl transition-all border border-outline-variant/20 hover:border-primary/30 active:scale-95"
              >
                + ₹50L
              </button>
              <button
                onClick={() => handleBid(1.0)}
                disabled={timer === 0}
                className="relative group bg-primary hover:bg-primary-fixed disabled:opacity-50 text-on-primary-fixed font-black py-4 px-10 rounded-xl shadow-[0_10px_20px_rgba(255,159,74,0.2)] hover:shadow-[0_15px_30px_rgba(255,159,74,0.3)] transition-all active:scale-95"
              >
                <span className="flex items-center gap-2 text-lg">
                  BID
                  <span className="font-mono bg-black/10 px-2 py-0.5 rounded text-sm">₹{(currentBid + 1.0).toFixed(2)} Cr</span>
                </span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* Right: Bid Feed */}
        <aside className="col-span-3 bg-surface-container-low border border-outline-variant/5 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-5 border-b border-surface-container-highest">
            <h3 className="font-black text-on-surface uppercase tracking-[0.1em] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Live Bid Feed
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {bids.map((bid, i) => (
                <motion.div
                  key={`${bid.team}-${bid.amount}-${i}`}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className={`flex justify-between items-center p-4 rounded-xl border transition-all ${i === 0 ? 'bg-primary/10 border-primary/30' : 'bg-surface-container border-outline-variant/10 text-on-surface-variant'}`}
                >
                  <span className={`font-black tracking-wide ${i === 0 ? 'text-primary' : 'text-on-surface'}`}>{bid.team}</span>
                  <span className={`font-mono font-bold ${i === 0 ? 'text-on-surface' : 'text-on-surface-variant'}`}>₹ {bid.amount.toFixed(2)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </aside>

      </main>
    </div>
  );
}
