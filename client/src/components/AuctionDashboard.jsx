import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Socket for now if backend isn't running yet
const mockPlayer = {
  name: "Ben Stokes",
  role: "Current All-Rounder",
  country: "England",
  image: "https://via.placeholder.com/250",
  basePrice: "2.00 Cr",
};

export default function AuctionDashboard({ socket }) {
  const [currentBid, setCurrentBid] = useState(5.5); // Current Bid in Cr
  const [timer, setTimer] = useState(30);
  const [bids, setBids] = useState([{ team: "CSK", amount: 5.5 }, { team: "MI", amount: 5.0 }]);

  // Simulate Timer
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleBid = (increment) => {
    const newBid = currentBid + increment;
    setCurrentBid(newBid);
    setTimer(30); // reset timer
    setBids(prev => [{ team: "MY TEAM", amount: newBid }, ...prev]);
    // socket?.emit('place_bid', { teamId: 'my_team', bidAmount: newBid * 10000000 });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center shadow-lg relative z-10">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wider">
          AUCTION WAR ROOM
        </h1>
        <div className="flex gap-4 items-center">
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 shadow-inner">
            <span className="text-slate-400 text-xs font-bold uppercase block mb-0.5">Remaining Purse</span>
            <span className="text-amber-400 font-black text-xl tracking-wide">₹ 65.40<span className="text-sm font-semibold ml-1">Cr</span></span>
          </div>
        </div>
      </header>

      <main className="p-6 grid grid-cols-12 gap-6 max-w-[1400px] mx-auto w-full flex-1">
        
        {/* Left Sidebar: Team Status */}
        <aside className="col-span-3 space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50"></div>
            <h2 className="text-slate-400 font-black mb-6 uppercase tracking-[0.2em] text-xs">Squad Status</h2>
            <div className="space-y-5">
              <div className="flex flex-col gap-2 pb-4 border-b border-slate-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-semibold text-sm">Total Players</span>
                  <span className="font-bold text-lg text-white">18 <span className="text-slate-500 text-sm">/ 25</span></span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[72%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
              </div>
              <div className="flex flex-col gap-2 pb-4 border-b border-slate-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-semibold text-sm">Overseas</span>
                  <span className="font-bold text-lg text-white">6 <span className="text-slate-500 text-sm">/ 8</span></span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: The Main Action */}
        <section className="col-span-6 flex flex-col items-center justify-center bg-slate-900/40 rounded-2xl p-8 border border-slate-800/60 ring-1 ring-white/5 relative overflow-hidden backdrop-blur-md shadow-2xl">
          {/* subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 w-full"
          >
             <h2 className="text-5xl font-black mb-3 tracking-tight text-white drop-shadow-lg">{mockPlayer.name}</h2>
             <p className="text-amber-500 font-bold text-sm mb-10 uppercase tracking-[0.25em] flex items-center justify-center gap-3">
                <span>{mockPlayer.role}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span>{mockPlayer.country}</span>
             </p>
             
             {/* The BIG Price */}
             <div className="mb-12 bg-slate-900/80 p-8 rounded-3xl border border-slate-700/50 shadow-inner max-w-sm mx-auto relative overflow-hidden">
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-50"></div>
               <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] block mb-3">Target Bid Amount</span>
               <motion.div 
                  key={currentBid}
                  initial={{ scale: 1.15, y: -10, color: "#fbbf24" }}
                  animate={{ scale: 1, y: 0, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-baseline justify-center gap-2"
                >
                  <span className="text-4xl text-slate-400 font-light">₹</span>
                  <span className="text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    {currentBid.toFixed(2)}
                  </span>
                  <span className="text-3xl text-slate-500 font-bold">Cr</span>
               </motion.div>
             </div>

             {/* The Timer */}
             <div className="mb-12 w-full flex flex-col items-center">
                <div className={`text-4xl font-black mb-3 tracking-tighter transition-colors duration-300 ${timer <= 5 ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-110' : 'text-slate-300'}`}>
                  00:{timer.toString().padStart(2, '0')}
                </div>
                <div className="w-full max-w-sm h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 shadow-inner">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${(timer / 30) * 100}%` }}
                    transition={{ ease: "linear", duration: 1 }}
                    className={`h-full ${timer <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-600 to-amber-400'}`}
                  />
                </div>
             </div>

             {/* Smart Bidding Buttons */}
             <div className="flex gap-4 justify-center items-center">
                <button 
                  onClick={() => handleBid(0.2)} 
                  disabled={timer === 0}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold py-3.5 px-6 rounded-xl transition-all border border-slate-700 hover:border-slate-500 shadow-lg hover:shadow-xl active:scale-95"
                >
                  + ₹20L
                </button>
                <button 
                  onClick={() => handleBid(0.5)} 
                  disabled={timer === 0}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold py-3.5 px-6 rounded-xl transition-all border border-slate-700 hover:border-slate-500 shadow-lg hover:shadow-xl active:scale-95"
                >
                  + ₹50L
                </button>
                <button 
                  onClick={() => handleBid(1.0)} 
                  disabled={timer === 0}
                  className="relative group bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 disabled:opacity-50 disabled:grayscale text-slate-950 font-black py-4 px-10 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 rounded-xl shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.3)] transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out"></div>
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    <span>BID</span>
                    <span className="font-mono bg-black/10 px-2 py-0.5 rounded">₹{(currentBid + 1.0).toFixed(2)} Cr</span>
                  </span>
                </button>
             </div>
          </motion.div>
        </section>

        {/* Right Sidebar: Activity Log */}
        <aside className="col-span-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-xl overflow-hidden relative">
           <div className="absolute top-0 right-0 w-full h-1 bg-amber-500/50"></div>
           <div className="p-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md z-10">
             <h3 className="font-black text-slate-300 uppercase tracking-[0.1em] text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Bid Feed
             </h3>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide relative z-0">
             <AnimatePresence>
               {bids.map((bid, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className={`flex justify-between items-center p-4 rounded-xl border transition-all ${i === 0 ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)] translate-x-[-4px]' : 'bg-slate-800/40 border-slate-700/50 text-slate-400'}`}
                  >
                    <span className={`font-black tracking-wide ${i === 0 ? 'text-amber-400' : 'text-slate-300'}`}>{bid.team}</span>
                    <span className={`font-mono font-bold ${i === 0 ? 'text-white' : 'text-slate-400'}`}>₹ {bid.amount.toFixed(2)}</span>
                  </motion.div>
               ))}
             </AnimatePresence>
           </div>
           
           {/* Fade overlay for bottom of list */}
           <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
        </aside>

      </main>
    </div>
  );
}
