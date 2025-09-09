import React from 'react';
import HackathonAuctionDashboard from './HackathonAuctionDashboard';

const AuctionSection = () => (
  <section id="auction" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-6xl font-black">Live Auction</h2>
        <p className="text-gray-600 mt-2">Bid with strategy. Build with power.</p>
      </div>
      <HackathonAuctionDashboard />
    </div>
  </section>
);

export default AuctionSection;
