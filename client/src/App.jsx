import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuctionDashboard from './components/AuctionDashboard';
import LandingPage from './components/LandingPage';
import LiveAuctionLobby from './components/LiveAuctionLobby';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lobby" element={<LiveAuctionLobby />} />
        <Route path="/auction" element={<AuctionDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
