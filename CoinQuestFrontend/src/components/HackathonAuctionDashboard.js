import { useEffect , useState } from "react";
import { Clock , Zap } from "lucide-react";

// Minimal Avatar component for members/bidders
const Avatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-8 h-8 rounded-full ring-2 ring-gray-200"
    style={{ objectFit: 'cover' }}
  />
);

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

function StatusPill({ label = 'Active' }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      {label}
    </span>
  );
}

export default function HackathonAuctionDashboard() {
  const [tokens, setTokens] = useState(500);
  const [currentBid, setCurrentBid] = useState(mockAuctionItem.basePrice);
  const [minIncrement] = useState(5);
  const [nextBid, setNextBid] = useState(mockAuctionItem.basePrice + 5);
  const [history, setHistory] = useState(initialBidHistory);
  const [secondsLeft, setSecondsLeft] = useState(parseTimerString(mockAuctionItem.timer));
  const [placing, setPlacing] = useState(false);
  const [justPlaced, setJustPlaced] = useState(false);

  // Countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  // Keep next bid at least current + minIncrement
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
    // Simulate processing
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

      {/* Top: Team + Item */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* Team Card */}
        <div className="bg-white/70 backdrop-blur rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{mockTeam.name}</span>
            <div className="flex -space-x-2">
              {mockTeam.members.map(m => (
                <div key={m.name} className="inline-block">
                  <Avatar src={m.avatar} alt={m.name} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Elysian Tokens</span>
              <span className="text-2xl font-black text-yellow-600">{tokens}</span>
            </div>
            {/* Token progress */}
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500"
                style={{ width: progress + '%' }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>0</span>
              <span>{progress}%</span>
              <span>500</span>
            </div>
          </div>
        </div>

        {/* Auction Item Card */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-100 blur-2xl" />
          <div className="flex items-center gap-4">
            <img src={mockAuctionItem.image} alt="" className="w-16 h-16" />
            <div>
              <div className="text-sm uppercase tracking-wider text-gray-500">Current Lot</div>
              <div className="text-lg font-bold">{mockAuctionItem.name}</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">{mockAuctionItem.description}</p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <div className="text-xs text-gray-500">Base Price</div>
              <div className="text-xl font-extrabold text-gray-900">{mockAuctionItem.basePrice}</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <div className="text-xs text-gray-500">Current Bid</div>
              <div className="text-xl font-extrabold text-gray-900">{currentBid}</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <div className="text-xs text-gray-500 inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> Time Left
              </div>
              <div className={`text-xl font-extrabold ${secondsLeft < 20 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatTime(secondsLeft)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls + History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Bid Controls */}
        <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-lg">Place Your Next Bid</span>
            <span className="text-xs text-gray-500">Min increment: {minIncrement}</span>
          </div>

          <div className="flex items-stretch">
            <button
              aria-label="decrement"
              onClick={() => setNextBid(Math.max(currentBid + minIncrement, nextBid - minIncrement))}
              className="px-4 rounded-l-lg border border-gray-300 text-lg font-bold hover:bg-gray-50"
            >
              −
            </button>
            <input
              type="number"
              value={nextBid}
              min={currentBid + minIncrement}
              step={minIncrement}
              onChange={e => {
                const val = Number(e.target.value || 0);
                setNextBid(val);
              }}
              className="border-t border-b border-gray-300 px-4 py-2 font-bold text-lg w-32 text-center focus:outline-none"
            />
            <button
              aria-label="increment"
              onClick={() => setNextBid(nextBid + minIncrement)}
              className="px-4 rounded-r-lg border border-gray-300 text-lg font-bold hover:bg-gray-50"
            >
              +
            </button>
          </div>

          {/* Quick adds */}
          <div className="flex gap-2 mt-3">
            {[5, 10, 25, 50].map(n => (
              <button
                key={n}
                onClick={() => handleQuickAdd(n)}
                className="px-3 py-1.5 text-sm rounded-full ring-1 ring-gray-300 hover:bg-gray-50"
              >
                +{n}
              </button>
            ))}
          </div>

          {/* Warnings */}
          <div className="mt-3 text-sm">
            {secondsLeft <= 0 && (
              <div className="text-red-600 font-medium">Bidding closed.</div>
            )}
            {nextBid > tokens && secondsLeft > 0 && (
              <div className="text-red-600 font-medium">Not enough tokens! Earn more to bid higher.</div>
            )}
            {nextBid < currentBid + minIncrement && secondsLeft > 0 && (
              <div className="text-amber-600">Next bid must be ≥ {currentBid + minIncrement}</div>
            )}
          </div>

          <button
            onClick={placeBid}
            disabled={!canBid || placing}
            className={`mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition
              ${canBid ? 'bg-yellow-500 hover:brightness-110 active:translate-y-px' : 'bg-gray-300 cursor-not-allowed'}
              ${placing ? 'opacity-80' : ''}`}
          >
            <Zap className="w-5 h-5" />
            {placing ? 'Placing…' : `Place Bid (${nextBid})`}
          </button>

          {justPlaced && (
            <div className="mt-3 text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-3 py-2 rounded-lg text-sm">
              Bid placed successfully!
            </div>
          )}

          <div className="mt-4 text-xs text-gray-500">
            Tip: Use quick adds for last-second jumps.
          </div>
        </div>

        {/* Bid History */}
        <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-lg">Bid History</span>
            <span className="text-xs text-gray-500">{history.length} bids</span>
          </div>
          <ul className="divide-y divide-gray-100">
            {history.map(b => (
              <li key={b.id} className="py-3 flex items-center">
                <Avatar src={b.bidder.avatar} alt={b.bidder.name} />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-800">{b.bidder.name}</div>
                  <div className="text-xs text-gray-500">{b.time}</div>
                </div>
                <div className="ml-auto text-yellow-600 font-extrabold">{b.amount} Tokens</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}