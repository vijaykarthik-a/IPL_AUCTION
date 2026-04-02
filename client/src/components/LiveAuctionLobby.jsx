import React from 'react';
import { Link } from 'react-router-dom';

const LiveAuctionLobby = () => {
  return (
    <div className="antialiased font-body bg-background text-on-surface min-h-screen">
      <aside className="hidden md:flex flex-col h-screen p-4 bg-[#131313] w-64 left-0 fixed shadow-2xl font-headline text-sm z-40">
        <div className="mb-10 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
            </div>
            <div>
              <h1 className="text-primary font-black uppercase tracking-widest text-lg">Kinetic Vault</h1>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-tighter">High-Performance Trading</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
            <span className="font-bold">Home</span>
          </Link>
          <Link to="/lobby" className="flex items-center gap-3 px-4 py-3 text-primary bg-[#262626] rounded-lg transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">gavel</span>
            <span>Live Auctions</span>
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
      
      <header className="w-full top-0 sticky z-30 bg-[#131313] border-none font-headline tracking-tight text-on-surface">
        <div className="flex justify-between items-center px-8 h-16 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8 md:pl-64">
            <span className="text-xl font-bold tracking-tighter text-[#ff9f4a] md:hidden">The Kinetic Vault</span>
            <div className="hidden lg:flex items-center bg-surface-container-highest px-4 py-1.5 rounded-full border border-outline-variant/20">
              <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
              <input className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48 text-on-surface placeholder:text-on-surface-variant" placeholder="Search rooms..." type="text"/>
            </div>
            <nav className="hidden md:flex gap-6 items-center">
              <a className="text-gray-400 font-medium hover:text-[#ff9f4a] transition-colors duration-200" href="#">New Game</a>
              <a className="text-[#ff9f4a] font-bold border-b-2 border-[#ff9f4a] pb-1" href="#">Recent Rooms</a>
              <a className="text-gray-400 font-medium hover:text-[#ff9f4a] transition-colors duration-200" href="#">Help/FAQ</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center px-4 py-1.5 rounded-md bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors">
              Live Auctions
            </button>
            <button className="flex items-center px-5 py-2 rounded-md bg-primary text-on-primary font-bold text-sm transform scale-95 active:scale-90 transition-transform">
              Create Room
            </button>
            <div className="flex items-center gap-3 ml-2">
              <button className="material-symbols-outlined text-on-surface-variant hover:text-white transition-colors">notifications</button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBflVOPAKCQVK-mSCi_CRSUIImix8ya4-HC96P_0j-dsyvdQk7nOrHJrYv0mV6FdTqq5_byj8WDNpW2_aSRcvZI8_OAwcCHlS7PWwOsonsVTxtgOwBEMpdHgdg-LhuCoPLU8Zed4H4fQ7VGh8kFMNKFVxFyPfjPGcR9labzJo0afeJJpUp_B9Zxvh3DmVr-doTLA6r6VLR5TYZ9FwZjcWkUKkeCY38BjSpOYLJTnUibSTA3XFt1QLzRwLQgsXIcakrOfd01tGa2Mp0j"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="md:ml-64 min-h-screen pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Live Dashboard
                </div>
                <h2 className="text-5xl font-headline font-extrabold tracking-tighter text-on-surface">Auction Lobby</h2>
                <p className="text-on-surface-variant max-w-md font-body">Real-time room management and high-velocity trade environments. Join a room to start your session.</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant/10">
                <button className="px-5 py-2 rounded-lg bg-surface-container-highest text-primary font-bold text-sm transition-all">All Rooms</button>
                <button className="px-5 py-2 rounded-lg text-on-surface-variant hover:text-white font-medium text-sm transition-all">Cricket</button>
                <button className="px-5 py-2 rounded-lg text-on-surface-variant hover:text-white font-medium text-sm transition-all">Football</button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 bg-surface-container-low rounded-2xl p-6 flex items-center justify-between group border border-outline-variant/5 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
                <div className="w-full">
                  <label className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Room Name Search</label>
                  <input className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xl font-headline font-bold w-full text-on-surface placeholder:text-surface-container-highest" placeholder="Enter keyword..." type="text"/>
                </div>
              </div>
              <button className="p-3 bg-surface-container-highest rounded-xl text-primary-fixed group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary">groups</span>
                </div>
                <span className="text-primary font-black text-2xl">24</span>
              </div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">Active Participants</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-surface-container-low rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-outline-variant/5 relative">
              <div className="h-40 relative overflow-hidden">
                <img alt="Mega Auction Banner" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG8WZYwI4ZNcK0Jqo01nbPl3VCUuCQXKAQYOTNaMpm_hOACBH91WJOT_XHnCnSM6PT27W9PRFDxgs8gRKA8ElN8TzkhR6W0TBbZDvsyL-aE0YJKdj8mtj_Jo0LZ08egee1W48mkC5sM6NH11rSWR6yToBeFJsHdRs-jXL4RpxItTiXw8kmNL50PgA9EsdzxDqj9sMDZ3Vv7hs13E8E14ebVM_VhQmKK3YMC3I-vuTMU5mEOD515JuDJIOKU685uyf5l3mSkE6Eq74g"/>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                <div className="absolute top-4 left-4 bg-error px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-on-error flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-on-error animate-ping"></span>
                  Live Now
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-headline font-extrabold text-on-surface group-hover:text-primary transition-colors">Mega Auction</h3>
                  <p className="text-sm text-on-surface-variant font-medium mt-1">International Premier Draft</p>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-outline-variant/10">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Players</p>
                    <p className="text-lg font-headline font-bold text-on-surface">342 Total</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Slots</p>
                    <p className="text-lg font-headline font-bold text-primary">8/10 Filled</p>
                  </div>
                </div>
                <Link to="/auction" className="w-full py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors shadow-lg shadow-primary/10">
                  Join Game
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="group bg-surface-container-low rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-outline-variant/5 relative">
              <div className="h-40 relative overflow-hidden">
                <img alt="Football" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7VzQgVaw3hxivEfGoKA9u6CykAUuYH__0y-f9Le0mTS6yMWfkw1YuXQETVq3gtkJrKsQyMMVD5ZmCygfZ1S6KfUSQG-MJHgFUI1XBD7BU17ZIooOb-dFAZsEl07JuFcJyt-mjHSaYMv0kFqoqdexpFF807CJbohWWAbsly4haHY_huLoZkuEimMqU2jcVWkjHkaaM18Vy9x0BBkyGv4p6PZTNv70ou1jQROiQ4WZlJixj6ZQ48_NbApxHzmFD6pqPLXoSOE2RuPa"/>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-on-primary flex items-center gap-1">
                  Waiting
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-headline font-extrabold text-on-surface group-hover:text-primary transition-colors">Football Auction</h3>
                  <p className="text-sm text-on-surface-variant font-medium mt-1">European League Fantasy</p>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-outline-variant/10">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Squad Size</p>
                    <p className="text-lg font-headline font-bold text-on-surface">15 Players</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Slots</p>
                    <p className="text-lg font-headline font-bold text-primary">4/10 Filled</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors">
                  Join Game
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="group bg-surface-container-low rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-outline-variant/5 relative">
              <div className="h-40 relative overflow-hidden">
                <img alt="Mock" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOBHqhzS8zjbRdXFHoXysycJIty7Xxeg7i-HQiqI6HAz6fxTwdMBEnYH235goNIBoDqaYy5S2JypjO5cOwe3l4btKCi56r1twH8s4gatR3IQK7mSLp-2dLkyfszoXnBDaoSZUtb-b1vZdGHzAmPmOwcySJdvWO0KV809n5ztVpRK9lYl1xefRyFJ3CX0c2ostcxSz3lyDLHpul2cwVx31cYprDg_ygm2j4FG2AhDIXTWfR_iQzoTT0TOF51Ty75kd9Mi5gnpw1R3lL"/>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                <div className="absolute top-4 left-4 bg-on-surface-variant/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-on-surface flex items-center gap-1">
                  Scheduled: 8:00 PM
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-headline font-extrabold text-on-surface group-hover:text-primary transition-colors">2026 Mock Auction</h3>
                  <p className="text-sm text-on-surface-variant font-medium mt-1">Strategic Practice Hub</p>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-outline-variant/10">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Type</p>
                    <p className="text-lg font-headline font-bold text-on-surface">Practice</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Slots</p>
                    <p className="text-lg font-headline font-bold text-primary">0/10 Filled</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-surface-container-highest text-on-surface font-black uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors border border-outline-variant/20">
                  Pre-Join
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                </button>
              </div>
            </div>
          </div>

          <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-headline font-bold">Trending Stats</h4>
                <a className="text-xs uppercase font-bold text-primary tracking-widest hover:underline" href="#">View Global Leaderboard</a>
              </div>
              <div className="bg-surface-container-low rounded-3xl p-1 border border-outline-variant/5">
                <table className="w-full text-left font-body">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">
                      <th className="px-6 py-4 font-bold">User</th>
                      <th className="px-6 py-4 font-bold">Active Bids</th>
                      <th className="px-6 py-4 font-bold">Win Rate</th>
                      <th className="px-6 py-4 font-bold text-right">Vault Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="hover:bg-surface-container-highest/50 transition-colors">
                      <td className="px-6 py-4 font-bold">@AlphaTrader</td>
                      <td className="px-6 py-4">12</td>
                      <td className="px-6 py-4 text-primary">84%</td>
                      <td className="px-6 py-4 text-right font-black text-xs">ELITE</td>
                    </tr>
                    <tr className="hover:bg-surface-container-highest/50 transition-colors">
                      <td className="px-6 py-4 font-bold">@VaultMaster</td>
                      <td className="px-6 py-4">08</td>
                      <td className="px-6 py-4 text-primary">72%</td>
                      <td className="px-6 py-4 text-right font-black text-xs text-on-surface-variant">PRO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-headline font-bold">Discover</h4>
              <div className="glass-effect rounded-3xl p-6 border border-primary/10 space-y-4">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">New Feature</p>
                <h5 className="text-lg font-headline font-extrabold leading-tight">Advanced Proxy Bidding Now Active</h5>
                <p className="text-sm text-on-surface-variant">Set your ceiling prices and let the Kinetic engine handle the speed. Never miss a player again.</p>
                <button className="text-xs font-bold uppercase tracking-widest text-on-surface flex items-center gap-1 group">
                  Learn More 
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-[#0e0e0e]/90 backdrop-blur-xl border-t border-[#262626]/50 z-50 rounded-t-2xl shadow-[0px_-8px_24px_rgba(0,0,0,0.4)]">
        <a className="flex flex-col items-center justify-center text-[#ff9f4a] bg-[#ff9f4a]/10 rounded-xl px-3 py-1 scale-98 transition-transform duration-150" href="#">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] uppercase font-bold">Lobby</span>
        </a>
        <a className="flex flex-col items-center justify-center text-gray-500 active:bg-[#262626] transition-transform duration-150" href="#">
          <span className="material-symbols-outlined">sensors</span>
          <span className="text-[10px] uppercase font-bold">Live</span>
        </a>
        <div className="flex flex-col items-center justify-center text-gray-500 active:bg-[#262626] transition-transform duration-150">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>meeting_room</span>
          <span className="text-[10px] uppercase font-bold">Rooms</span>
        </div>
        <a className="flex flex-col items-center justify-center text-gray-500 active:bg-[#262626] transition-transform duration-150" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] uppercase font-bold">Profile</span>
        </a>
      </footer>

      <footer className="md:ml-64 bg-[#0e0e0e] mt-12 py-8 border-t border-[#131313] flex flex-col items-center justify-center gap-4 w-full">
        <div className="flex gap-8">
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors" href="#">Terms</a>
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors" href="#">Privacy</a>
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors" href="#">Twitter</a>
          <a className="text-xs text-gray-600 font-inter hover:text-white transition-colors" href="#">Discord</a>
        </div>
        <p className="text-xs text-gray-500 font-inter">Made with ❤️ in the Kinetic Vault</p>
      </footer>
    </div>
  );
};

export default LiveAuctionLobby;
