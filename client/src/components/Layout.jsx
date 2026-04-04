import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreateRoomModal from './CreateRoomModal';

const Layout = ({ children }) => {
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="antialiased font-body bg-background text-on-surface min-h-screen">
      <CreateRoomModal isOpen={isRoomModalOpen} onClose={() => setIsRoomModalOpen(false)} />
      
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
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${isActive('/') ? 'text-primary bg-[#262626]' : 'text-gray-500 hover:bg-[#262626] hover:text-white'}`}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
            <span className="font-bold">Home</span>
          </Link>
          <Link to="/lobby" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${isActive('/lobby') ? 'text-primary bg-[#262626]' : 'text-gray-500 hover:bg-[#262626] hover:text-white'}`}>
            <span className="material-symbols-outlined">gavel</span>
            <span>Live Auctions</span>
          </Link>
          <Link to="/players" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${isActive('/players') ? 'text-primary bg-[#262626]' : 'text-gray-500 hover:bg-[#262626] hover:text-white'}`}>
            <span className="material-symbols-outlined">groups</span>
            <span>Player Pool</span>
          </Link>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white transition-all duration-200 ease-in-out rounded-lg" href="#">
            <span className="material-symbols-outlined">history</span>
            <span>History</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white transition-all duration-200 ease-in-out rounded-lg" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-auto pt-6 border-t border-surface-container-highest space-y-1">
          <button className="w-full bg-primary text-on-primary font-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-6 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Quick Bid
          </button>
          <a className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-white transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">help</span>
            <span>Help</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-white transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Header */}
      <header className="w-full top-0 sticky z-30 bg-[#131313] border-none font-headline tracking-tight text-on-surface">
        <div className="flex justify-between items-center px-8 h-16 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8 md:pl-64">
            <Link to="/" className="text-xl font-bold tracking-tighter text-[#ff9f4a] md:hidden">Auction Room</Link>
            <div className="hidden lg:flex items-center bg-surface-container-highest px-4 py-1.5 rounded-full border border-outline-variant/20">
              <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
              <input className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48 text-on-surface placeholder:text-on-surface-variant" placeholder="Search rooms..." type="text"/>
            </div>
            <nav className="hidden md:flex gap-6 items-center text-sm">
              <Link to="/" className="text-gray-400 font-medium hover:text-[#ff9f4a] transition-colors duration-200">New Game</Link>
              <a className="text-gray-400 font-medium hover:text-[#ff9f4a] transition-colors duration-200" href="#">Recent Rooms</a>
              <a className="text-gray-400 font-medium hover:text-[#ff9f4a] transition-colors duration-200" href="#">Help/FAQ</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/lobby" className="hidden lg:flex px-4 py-2 bg-surface-container-highest text-on-surface rounded-lg font-bold hover:text-[#ff9f4a] transition-colors duration-200 scale-95 active:scale-90">Live Auctions</Link>
            <button 
              onClick={() => setIsRoomModalOpen(true)}
              className="px-6 py-2 bg-primary text-on-primary-container rounded-lg font-extrabold scale-95 active:scale-90 transition-transform"
            >
              Create Room
            </button>
            <div className="flex items-center gap-3 ml-4">
              <span className="material-symbols-outlined text-gray-400 hover:text-[#ff9f4a] cursor-pointer">notifications</span>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBflVOPAKCQVK-mSCi_CRSUIImix8ya4-HC96P_0j-dsyvdQk7nOrHJrYv0mV6FdTqq5_byj8WDNpW2_aSRcvZI8_OAwcCHlS7PWwOsonsVTxtgOwBEMpdHgdg-LhuCoPLU8Zed4H4fQ7VGh8kFMNKFVxFyPfjPGcR9labzJo0afeJJpUp_B9Zxvh3DmVr-doTLA6r6VLR5TYZ9FwZjcWkUKkeCY38BjSpOYLJTnUibSTA3XFt1QLzRwLQgsXIcakrOfd01tGa2Mp0j"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen pb-24 md:pb-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
