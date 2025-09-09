import React from 'react';
import { Zap } from 'lucide-react';

const HeroSection = ({ scrollToSection }) => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-7xl md:text-9xl font-black leading-tight mb-8">
          <div>Compete</div>
          <div>with</div>
          <div className="text-orange-400">strategy</div>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-lg">
          The revolutionary way to discover, bid and build with
          the tech resources you care about.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Join the Quest
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-full h-full bg-blue-100 rounded-2xl transform rotate-3"></div>
        <div className="absolute -top-2 -left-2 w-full h-full bg-yellow-200 rounded-2xl transform rotate-2"></div>
        <div className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">©</span>
            </div>
            <div>
              <div className="text-sm font-semibold">Coin Quest is live</div>
              <div className="text-xs text-gray-500">The ultimate strategy-based hackathon</div>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">SUSTAIN</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm">▲ 2.87%</span>
                <span className="font-semibold">$0.512</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">CULTURE</span>
              <div className="flex items-center space-x-2">
                <span className="text-red-600 text-sm">▼ 0.48%</span>
                <span className="font-semibold">$0.073</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-pink-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium">UniQuest</span>
              </div>
              <button className="px-3 py-1 bg-black text-white text-xs rounded-md">Buy</button>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            The leading decentralized hackathon protocol.
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl border border-gray-200 p-4 shadow-lg">
          <div className="text-xs text-gray-500 mb-1">306k participants</div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600 text-sm">▲ 1.96% Today</span>
            <span className="font-bold">$5.10</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
