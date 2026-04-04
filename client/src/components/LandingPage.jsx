import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateRoomModal from './CreateRoomModal';

const LandingPage = () => {
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface selection:bg-primary/30 min-h-screen flex flex-col">
      <CreateRoomModal isOpen={isRoomModalOpen} onClose={() => setIsRoomModalOpen(false)} />
      <header className="w-full top-0 sticky z-50 bg-[#131313] border-none shadow-none">
        <nav className="flex justify-between items-center px-8 h-16 w-full max-w-screen-2xl mx-auto font-headline tracking-tight text-on-surface">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tighter text-[#ff9f4a]">Auction Room</span>
            <div className="hidden md:flex gap-6">
              <Link to="/lobby" className="text-[#ff9f4a] font-bold border-b-2 border-[#ff9f4a] pb-1">New Game</Link>
              <a className="text-gray-400 font-medium hover:text-[#ff9f4a] transition-colors duration-200" href="#">Recent Rooms</a>
              <a className="text-gray-400 font-medium hover:text-[#ff9f4a] transition-colors duration-200" href="#">Help/FAQ</a>
            </div>
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
              <span className="material-symbols-outlined text-gray-400 hover:text-[#ff9f4a] cursor-pointer">account_circle</span>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex max-w-screen-2xl mx-auto w-full flex-1">
        <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-64 sticky top-16 p-4 bg-[#131313] shadow-[4px_0px_24px_rgba(0,0,0,0.5)] font-headline text-sm">
          <div className="flex flex-col gap-2 mb-8 p-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
              </div>
              <div>
                <div className="text-[#ff9f4a] font-black uppercase text-xs">Auction Room</div>
                <div className="text-gray-500 text-[10px]">High-Performance Trading</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-1">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 text-[#ff9f4a] bg-[#262626] rounded-lg transition-all duration-200 ease-in-out">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
            <Link to="/lobby" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all duration-200 ease-in-out">
              <span className="material-symbols-outlined">gavel</span>
              <span>Live Auctions</span>
            </Link>
            <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined">history</span>
              <span>History</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </a>
            <div className="mt-8 mb-4 px-4 text-[10px] uppercase font-bold text-gray-600 tracking-widest">Discover more</div>
            <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined">sports_cricket</span>
              <span>Player Stats</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all duration-200 ease-in-out" href="#">
              <span className="material-symbols-outlined">leaderboard</span>
              <span>Leaderboards</span>
            </a>
          </nav>
          <div className="mt-auto pt-4 border-t border-[#262626] flex flex-col gap-1">
            <button className="w-full py-3 mb-4 bg-primary/10 border border-primary/20 text-primary rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary/20 transition-all">Quick Bid</button>
            <a className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">help</span>
              <span>Help</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-error transition-colors" href="#">
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </a>
          </div>
        </aside>
        <main className="flex-1 min-h-screen px-6 py-12 lg:px-16 lg:py-20 bg-background">
          <div className="max-w-4xl mx-auto">
            <section className="mb-16">
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 leading-[0.95]">
                  Play IPL Auction <br/>
                  <span className="text-primary italic">with Friends</span>
              </h1>
              <p className="text-on-surface-variant text-lg max-w-xl font-body leading-relaxed">
                  Experience the high-speed thrill of a professional trading floor. Build your dream squad in real-time, outbid your rivals, and dominate the league.
              </p>
            </section>
            
            <div className="bg-surface-container-low rounded-3xl p-1 shadow-2xl overflow-hidden">
              <div className="flex items-center border-b border-[#262626] px-8 py-4 gap-8">
                <button className="font-headline font-bold text-primary border-b-2 border-primary pb-4 -mb-[17px]">New Game</button>
                <button className="font-headline font-medium text-gray-500 hover:text-white transition-colors pb-4">Recent</button>
              </div>
              <div className="p-8">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="group cursor-pointer bg-surface-container-highest hover:bg-primary/10 border border-transparent hover:border-primary/30 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">MI</div>
                            <span className="font-headline font-bold text-sm tracking-tight">Mumbai Indians</span>
                        </div>
                        <div className="group cursor-pointer bg-surface-container-highest hover:bg-primary/10 border border-transparent hover:border-primary/30 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-yellow-900/20 group-hover:scale-110 transition-transform">CSK</div>
                            <span className="font-headline font-bold text-sm tracking-tight">Chennai Kings</span>
                        </div>
                        <div className="group cursor-pointer bg-surface-container-highest hover:bg-primary/10 border border-transparent hover:border-primary/30 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform">RCB</div>
                            <span className="font-headline font-bold text-sm tracking-tight">Bangalore</span>
                        </div>
                        <div className="group cursor-pointer bg-surface-container-highest hover:bg-primary/10 border border-transparent hover:border-primary/30 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform">KKR</div>
                            <span className="font-headline font-bold text-sm tracking-tight">Kolkata Riders</span>
                        </div>
                        <div className="group cursor-pointer bg-surface-container-highest hover:bg-primary/10 border border-transparent hover:border-primary/30 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">DC</div>
                            <span className="font-headline font-bold text-sm tracking-tight">Delhi Capitals</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#262626]">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                <img alt="avatar" className="w-10 h-10 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcMXhO4RC2bIwfhTLfXRAs6kiVUkqYffDVRvzsjuS-0iLMj1vzWivgQB1Rb72AS9biLGMWNbZQQCBtiYX0ly3nTPw1AfLiXOnM8uHLMMyJIthaLsKfB6idg_CQMwXJtleUTP0OiI4bSMtKP0q-kLGXgTCMkBGJVP9yW6n5t2GuQpfp76imRYmU4Clw2NqxnpTvTVtttRSOvIJGK_SJEpqRhJlrGZT1FGZrlbrnU_BbG5sUZF38_2WRhjRkgyYRrOQZzkUkQTm9xV3W" />
                                <img alt="avatar" className="w-10 h-10 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-d6I6KmzTydYOTSHgolfpSrvSnHUAMgsSzZmEOWCjRoRpCf2P8BgrTrAXsTYB7AO9EoCaI8LDyBTCudP_ECkaIAAuEMdbn40hnrXfJE7_fusADjFI0FHj7wfFHcm_SsRY9zWUOt-ubNZRcDt5hyBxc2LbaYZnAVzABbx1XDYGkHEez3g5UkgtPxz7VrICe5r81P0T6Za3ntaBZaqefI7uJqQxmhuMdaBKDYFwiNVsbeJn1uDY_RxWyJ9GJ9WEFR_s28l24Tm8oCco" />
                                <img alt="avatar" className="w-10 h-10 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKGJeqxCgAGEFjKLG785C6uhmJ8V6O5vZWnHbj3AbFx2I9keWUb0xziZEEqPYfOCnMXowLQyI8wkOTPCqqQt33SaEUyOXHKF1Hrac6i8Dr6Q-EZ3_OUGziv2xYqtIU9CFNuWh3CaDxroI-LjrHVl_rMY5JpS9OwIl5q5kkgrU5a7kuX1QVlKsD4W4ILFlpFlCV00cnKQKab-HDK03dYN2PqSVwI_0-l-AaRFGZHk7xZINHa6phe504GdV9bTviGVTlsZbHvE47npS" />
                                <div className="w-10 h-10 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">+24</div>
                            </div>
                            <span className="text-sm text-on-surface-variant font-medium">Joined the lobby recently</span>
                        </div>
                        <button onClick={() => setIsRoomModalOpen(true)} className="w-full sm:w-auto px-12 py-5 bg-gradient-to-tr from-primary to-primary-container text-on-primary-fixed font-black text-lg rounded-xl shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center inline-block">
                            Create Room
                        </button>
                    </div>
                </div>
              </div>
            </div>
            
            <section className="mt-24 grid md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 hover:border-primary/10 transition-colors group">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-3xl">analytics</span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em]">High Performance</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Real-time Data Stream</h3>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                    Zero-latency pricing updates and bidding wars. See every move as it happens on the trading floor.
                </p>
              </div>
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 hover:border-primary/10 transition-colors group">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-3xl">security</span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em]">Secure Trading</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-primary transition-colors">The Vault Security</h3>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                    Military-grade encryption for your private rooms and custom league data. Play with total peace of mind.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-[#0e0e0e]/90 backdrop-blur-xl border-t border-[#262626]/50 shadow-[0px_-8px_24px_rgba(0,0,0,0.4)] z-50 rounded-t-2xl">
        <div className="flex flex-col items-center justify-center text-[#ff9f4a] bg-[#ff9f4a]/10 rounded-xl px-3 py-1 scale-98 transition-transform duration-150">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] uppercase font-bold">Lobby</span>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-500 active:bg-[#262626] scale-98 transition-transform duration-150">
          <span className="material-symbols-outlined">sensors</span>
          <span className="text-[10px] uppercase font-bold">Live</span>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-500 active:bg-[#262626] scale-98 transition-transform duration-150">
          <span className="material-symbols-outlined">meeting_room</span>
          <span className="text-[10px] uppercase font-bold">Rooms</span>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-500 active:bg-[#262626] scale-98 transition-transform duration-150">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] uppercase font-bold">Profile</span>
        </div>
      </nav>
      <footer className="w-full py-8 bg-[#0e0e0e] mt-12 border-t border-[#131313] flex flex-col items-center justify-center gap-4">
        <div className="flex gap-8">
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Terms</a>
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Privacy</a>
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Twitter</a>
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Discord</a>
        </div>
        <div className="text-xs text-gray-500 font-inter opacity-80">Made with ❤️ by VK using AI's</div>
      </footer>
    </div>
  );
};

export default LandingPage;
