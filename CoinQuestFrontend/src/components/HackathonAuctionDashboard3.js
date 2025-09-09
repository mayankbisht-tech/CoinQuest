import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import Avatar from './Avatar';
import StatusPill from './StatusPill';

const mockTeam = {
  name: 'Team Phoenix',
  members: [
    { name: 'Alex', avatar: 'https://i.pravatar.cc/40?u=alex' },
    { name: 'Sam', avatar: 'https://i.pravatar.cc/40?u=sam' },
    { name: 'Taylor', avatar: 'https://i.pravatar.cc/40?u=taylor' },
  ],
};

const mockAuctionItem = {
  name: 'Premium API Bundle',
  image: 'https://cdn-icons-png.flaticon.com/512/3039/3039403.png',
  description: 'A set of premium APIs for your project.',
  basePrice: 120,
  timer: '02:15', // mm:ss
};

const initialBidHistory = [
  { id: 1, bidder: mockTeam.members[0], amount: 110, time: '21:11' },
  { id: 2, bidder: mockTeam.members[1], amount: 115, time: '21:15' },
  { id: 3, bidder: mockTeam.members[2], amount: 120, time: '21:18' },
];

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return (m < 10 ? '0' + m : '' + m) + ':' + (s < 10 ? '0' + s : '' + s);
}

function parseTimerString(mmss) {
  const [m, s] = mmss.split(':').map(Number);
  return m * 60 + s;
}

const HackathonAuctionDashboard = () => {
  const [tokens, setTokens] = useState(500);
  const [currentBid, setCurrentBid] = useState(mockAuctionItem.basePrice);
  const [minIncrement] = useState(5);
  const [nextBid, setNextBid] = useState(mockAuctionItem.basePrice + 5);
  const [history, setHistory] = useState(initialBidHistory);
  const [secondsLeft, setSecondsLeft] = useState(parseTimerString(mockAuctionItem.timer));
  const [placing, setPlacing] = useState(false);
  const [justPlaced, setJustPlaced] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  useEffect(() => {
    setNextBid(n => Math.max(n, currentBid + minIncrement));
  }, [currentBid, minIncrement]);

  const handleQuickAdd = val => {
    setNextBid(Math.max(currentBid + minIncrement, nextBid + val));
  };

  const canBid = nextBid <= tokens && nextBid >= currentBid + minIncrement && secondsLeft > 0;

  const placeBid = () => {
    if (!canBid) return;
    setPlacing(true);
    setTimeout(() => {
      const spend = nextBid - currentBid;
      setCurrentBid(nextBid);
      setTokens(t => t - spend);
      const bidder = mockTeam.members[Math.floor(Math.random() * mockTeam.members.length)];
      const now = new Date();
      const time =
        (now.getHours() < 10 ? '0' : '') +
        now.getHours() +
        ':' +
        (now.getMinutes() < 10 ? '0' : '') +
        now.getMinutes();
      setHistory(h => [{ id: h.length + 1, bidder, amount: nextBid, time }, ...h]);
      setJustPlaced(true);
      setPlacing(false);
      setTimeout(() => setJustPlaced(false), 1200);
    }, 350);
  };

  const progress = Math.min(100, Math.round((tokens / 500) * 100));

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-amber-50 via-white to-teal-50 rounded-3xl border border-gray-200 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] p-6 md:p-10">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Auction Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Bid smart with Elysian tokens. Highest bid wins when the timer hits zero.
          </p>
        </div>
        <StatusPill label={secondsLeft > 0 ? 'Active' : 'Closed'} />
      </div>
      {/* ...existing code for dashboard... */}
      {/* Team + Item, Controls, History, etc. (unchanged) */}
      {/* ...existing code... */}
    </div>
  );
};

export default HackathonAuctionDashboard;
