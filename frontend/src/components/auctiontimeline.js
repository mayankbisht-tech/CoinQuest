import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Users, Gavel, Lightbulb, Trophy, ArrowRight, Timer, Coins, Target, Award, CheckCircle, XCircle, Vote } from 'lucide-react';

const EventTimeline = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const eventData = [
    {
      id: 1,
      round: "Round 1",
      title: "Auction",
      startTime: "2025-09-15T10:00:00",
      endTime: "2025-09-15T12:00:00",
      duration: "2 hours",
      status: "upcoming",
      description: "Teams bid on 20-25 tech items with limited budget. Must purchase minimum 3 items to proceed.",
      outcome: "All teams advance to next round",
      icon: Gavel,
      color: "orange"
    },
    {
      id: 2,
      round: "Round 2", 
      title: "Ideation & Pitching",
      startTime: "2025-09-15T13:00:00",
      endTime: "2025-09-15T17:00:00",
      duration: "4 hours",
      status: "upcoming",
      description: "Teams develop project ideas and deliver 2-minute pitches explaining problem, solution, and item usage.",
      outcome: "Selected teams advance, eliminated teams become audience voters",
      icon: Lightbulb,
      color: "blue",
      note: "Eliminated teams vote in finals"
    },
    {
      id: 3,
      round: "Round 3",
      title: "Final Judgement", 
      startTime: "2025-09-16T09:00:00",
      endTime: "2025-09-16T15:00:00", 
      duration: "6 hours",
      status: "upcoming",
      description: "Final teams refine projects and present 3-5 minute pitch decks or whiteboard demos.",
      outcome: "Winners announced",
      icon: Trophy,
      color: "green"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoundColor = (color) => {
    const colors = {
      'orange': 'bg-orange-100 text-orange-800 border-orange-200',
      'blue': 'bg-blue-100 text-blue-800 border-blue-200',
      'green': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };
//id="timeline"
  return (
    <div className="bg-gray-50 min-h-screen p-20" id="timeline">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
          <h1 className="text-6xl md:text-7xl font-black mb-4">
            IoSC Event<br />
            <span className="text-orange-400">Timeline</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Three-round hackathon competition combining strategy, innovation, and execution.
          </p>
        </div>

        {/* Event Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gavel className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Round 1</div>
            <div className="text-sm text-gray-600">Auction Phase</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Round 2</div>
            <div className="text-sm text-gray-600">Ideation & Pitching</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Round 3</div>
            <div className="text-sm text-gray-600">Final Judgement</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {eventData.map((round, index) => {
            const IconComponent = round.icon;
            
            return (
              <div key={round.id} className="relative">
                {/* Timeline Line */}
                {index !== eventData.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200 z-0"></div>
                )}
                
                {/* Timeline Dot */}
                <div className={`absolute left-6 top-8 w-4 h-4 rounded-full border-4 border-white shadow-md z-10 ${
                  round.color === 'orange' ? 'bg-orange-400' :
                  round.color === 'blue' ? 'bg-blue-400' : 'bg-green-400'
                }`}></div>
                
                {/* Content Card */}
                <div className="ml-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          round.color === 'orange' ? 'bg-orange-100' :
                          round.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          <IconComponent className={`h-6 w-6 ${
                            round.color === 'orange' ? 'text-orange-600' :
                            round.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                          }`} />
                        </div>
                        
                        <div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border inline-block mb-2 ${getRoundColor(round.color)}`}>
                            {round.round}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{round.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {round.description}
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-gray-700">Outcome:</span>
                        </div>
                        <p className="text-gray-600">{round.outcome}</p>
                      </div>

                      {round.note && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Vote className="h-4 w-4 text-yellow-600 mt-0.5" />
                            <p className="text-sm text-yellow-800">{round.note}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Time & Status */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-5 w-5 text-gray-600" />
                          <span className="font-semibold text-gray-700">Schedule</span>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="text-gray-500">Date</div>
                            <div className="font-medium">{formatDate(round.startTime)}</div>
                          </div>
                          
                          <div>
                            <div className="text-gray-500">Start Time</div>
                            <div className="font-medium">{formatTime(round.startTime)}</div>
                          </div>
                          
                          <div>
                            <div className="text-gray-500">End Time</div>
                            <div className="font-medium">{formatTime(round.endTime)}</div>
                          </div>
                          
                          <div>
                            <div className="text-gray-500">Duration</div>
                            <div className="font-medium">{round.duration}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`px-4 py-3 rounded-lg text-center font-medium border ${getStatusColor(round.status)}`}>
                        {round.status.charAt(0).toUpperCase() + round.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">3</div>
            <div className="text-sm text-gray-600">Competition Rounds</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">2</div>
            <div className="text-sm text-gray-600">Event Days</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">12hrs</div>
            <div className="text-sm text-gray-600">Total Duration</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">25</div>
            <div className="text-sm text-gray-600">Tech Items Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');

  const products = [
    {
      id: 1,
      title: "React Framework License",
      category: "Frontend",
      startingBid: 150,
      currentBid: 280,
      bidders: 8,
      timeLeft: "2h 15m",
      status: "active",
      description: "Professional React development framework with advanced features"
    },
    {
      id: 2,
      title: "AWS Cloud Credits",
      category: "Cloud",
      startingBid: 200,
      currentBid: 450,
      bidders: 12,
      timeLeft: "1h 45m",
      status: "active",
      description: "$500 worth of AWS cloud computing credits"
    },
    {
      id: 3,
      title: "Arduino Starter Kit",
      category: "Hardware",
      startingBid: 80,
      currentBid: 120,
      bidders: 5,
      timeLeft: "3h 20m",
      status: "active",
      description: "Complete Arduino development kit with sensors and components"
    },
    {
      id: 4,
      title: "TensorFlow Pro API",
      category: "AI/ML",
      startingBid: 300,
      currentBid: 520,
      bidders: 15,
      timeLeft: "45m",
      status: "active",
      description: "Advanced machine learning API access with premium features"
    },
    {
      id: 5,
      title: "Stripe Payment API",
      category: "API",
      startingBid: 100,
      currentBid: 180,
      bidders: 9,
      timeLeft: "2h 30m",
      status: "active",
      description: "Payment processing API with transaction credits included"
    },
    {
      id: 6,
      title: "MongoDB Atlas Credits",
      category: "Database",
      startingBid: 120,
      currentBid: 200,
      bidders: 7,
      timeLeft: "1h 10m",
      status: "active",
      description: "Cloud database service with premium tier access"
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'bid':
        return b.currentBid - a.currentBid;
      case 'bidders':
        return b.bidders - a.bidders;
      case 'time':
        return a.timeLeft.localeCompare(b.timeLeft);
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const categories = ['all', ...new Set(products.map(item => item.category))];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-6xl md:text-7xl font-black mb-4">
                Auction<br />
                <span className="text-orange-400">Dashboard</span>
              </h1>
              <p className="text-xl text-gray-600">
                Monitor live bidding on tech resources and track your acquisitions.
              </p>
            </div>
            
            <div className="bg-teal-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-teal-800">{filteredProducts.length}</div>
              <div className="text-sm text-teal-600">Items Available</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Controls */}
            <div className="flex gap-4 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="title">Sort by Title</option>
                <option value="bid">Sort by Current Bid</option>
                <option value="bidders">Sort by Bidders</option>
                <option value="time">Sort by Time Left</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              {/* Image Placeholder */}

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-500">{product.bidders} bidders</span>
                </div>
                
                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <div className="text-gray-500">Starting Bid</div>
                    <div className="font-bold">${product.startingBid}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Current Bid</div>
                    <div className="font-bold text-green-600">${product.currentBid}</div>
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">
              {sortedProducts.length}
            </div>
            <div className="text-sm text-gray-600">Items Available</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              ${Math.max(...sortedProducts.map(p => p.currentBid))}
            </div>
            <div className="text-sm text-gray-600">Highest Bid</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {sortedProducts.reduce((sum, p) => sum + p.bidders, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Bidders</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              ${Math.round(sortedProducts.reduce((sum, p) => sum + p.currentBid, 0) / sortedProducts.length)}
            </div>
            <div className="text-sm text-gray-600">Average Bid</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export both components
export { EventTimeline, ProductDashboard };