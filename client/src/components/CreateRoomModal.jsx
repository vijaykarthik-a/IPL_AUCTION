import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

export default function CreateRoomModal({ isOpen, onClose }) {
  const [roomName, setRoomName] = useState('');
  const [budget, setBudget] = useState(100);
  const [squadSize, setSquadSize] = useState(25);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    
    const handleRoomCreated = (data) => {
      setIsCreating(false);
      onClose();
      navigate(`/auction/${data.roomId}`);
    };

    socket.on('room_created', handleRoomCreated);
    
    return () => {
      socket.off('room_created', handleRoomCreated);
    };
  }, [navigate, onClose]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    setIsCreating(true);
    socket.emit('create_room', { roomName, budget, squadSize });
  };

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-surface-container-low border border-surface-container-highest rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(253,139,0,0.15)] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-fixed"></div>
              
              <div className="px-8 pt-8 pb-6 border-b border-surface-container-highest flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-headline font-black text-on-surface">Create Vault Room</h2>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Configure your environment</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleCreate} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-primary">Room Name</label>
                  <input 
                    type="text" 
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="e.g. Mega Draft 2026"
                    className="w-full bg-surface-container px-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface font-headline font-bold placeholder:text-on-surface-variant/50 placeholder:font-normal"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-primary">Total Purse (Cr)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">₹</span>
                      <input 
                        type="number" 
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 bg-surface-container rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface font-headline font-bold"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-primary">Squad Limit</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg">group</span>
                      <input 
                        type="number" 
                        value={squadSize}
                        onChange={(e) => setSquadSize(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface font-headline font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    disabled={isCreating}
                    className="w-full py-4 bg-gradient-to-r from-primary to-primary-fixed text-on-primary-fixed font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(253,139,0,0.4)] transition-all flex justify-center items-center gap-2 group disabled:opacity-70"
                  >
                    {isCreating ? 'Initializing...' : 'Initialize Secure Room'}
                    {!isCreating && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                  </button>
                  <p className="text-center text-[10px] text-on-surface-variant font-medium">All rooms are secured via end-to-end WebSocket encryption.</p>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
