import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockOptimizedPlayers = [
  { id: 1, name: "Suryakumar Yadav", role: "Batsman", valueScore: 98, expectedPrice: "12.5 Cr", actualValue: "18.0 Cr" },
  { id: 2, name: "Jasprit Bumrah", role: "Bowler", valueScore: 95, expectedPrice: "14.0 Cr", actualValue: "20.0 Cr" },
  { id: 3, name: "Glenn Maxwell", role: "All-Rounder", valueScore: 89, expectedPrice: "10.0 Cr", actualValue: "15.0 Cr" },
  { id: 4, name: "Rashid Khan", role: "Bowler", valueScore: 92, expectedPrice: "11.0 Cr", actualValue: "16.5 Cr" },
];

export default function PlayerOptimization({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('targets');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50 max-h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="bg-surface-container-low border border-surface-container-highest rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(253,139,0,0.15)] relative flex flex-col h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
              
              <div className="px-8 pt-8 pb-4 border-b border-surface-container-highest flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">monitoring</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-headline font-black text-on-surface">Player Optimization</h2>
                    <p className="text-sm text-on-surface-variant font-medium mt-1">AI-driven valuation & squad targets</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex border-b border-surface-container-highest px-8 gap-8">
                <button 
                  onClick={() => setActiveTab('targets')}
                  className={`py-4 font-bold text-sm tracking-widest uppercase border-b-2 transition-colors ${activeTab === 'targets' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
                >
                  Optimal Targets
                </button>
                <button 
                  onClick={() => setActiveTab('squad')}
                  className={`py-4 font-bold text-sm tracking-widest uppercase border-b-2 transition-colors ${activeTab === 'squad' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
                >
                  Squad Analysis
                </button>
              </div>

              <div className="p-8 overflow-y-auto bg-surface-dim">
                {activeTab === 'targets' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockOptimizedPlayers.map((player, idx) => (
                        <div key={player.id} className="bg-surface-container rounded-2xl p-5 border border-outline-variant/10 hover:border-primary/20 transition-all group">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-headline font-bold text-lg">{player.name}</h4>
                              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{player.role}</p>
                            </div>
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">bolt</span>
                              <span className="font-black">{player.valueScore}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-surface-container-highest rounded-xl">
                            <div>
                              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Expected Price</p>
                              <p className="font-mono text-lg font-bold">{player.expectedPrice}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">True Value</p>
                              <p className="font-mono text-lg font-black text-primary">{player.actualValue}</p>
                            </div>
                          </div>
                          <button className="w-full mt-4 py-3 bg-surface-container-highest hover:bg-surface-variant text-on-surface font-bold text-sm rounded-xl transition-colors border border-outline-variant/10 group-hover:border-primary/30 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">add_target</span> Add to Watchlist
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'squad' && (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-6xl opacity-20 mb-4">pie_chart</span>
                    <h3 className="text-lg font-bold">Squad Analysis Required</h3>
                    <p className="text-sm mt-2 max-w-sm">Join a room and start building your squad to view real-time balance optimization.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
