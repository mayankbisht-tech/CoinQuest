import React from 'react';
import { TrendingUp, User, ShoppingCart } from 'lucide-react';

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 bg-teal-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-black mb-8">
          How the<br />
          quest works
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Explore Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-4">Explore</h3>
          <p className="text-gray-600 mb-6">
            Discover a vast collection of tech resources; from AI tools to cloud platforms
            and hardware kits. All curated in our themed Categories.
          </p>
          <div className="bg-black rounded-3xl p-4 mx-auto w-64">
            <div className="bg-white rounded-2xl p-4 h-80">
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <h4 className="font-bold text-lg mb-2">Sustainability<br />resources</h4>
                <div className="text-xs text-gray-600 mb-3">12 resources</div>
                <div className="w-20 h-20 bg-green-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Trends Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8" />
            <h3 className="text-2xl font-bold">Tap into trends</h3>
          </div>
          <p className="text-gray-600">
            Uncover the hottest tech resources with our Trending Resources feature.
          </p>
        </div>
        {/* Express Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full ml-1"></div>
            </div>
            <h3 className="text-2xl font-bold">Express yourself</h3>
          </div>
          <p className="text-gray-600">
            Share your profile with the tech community.
          </p>
        </div>
        {/* Additional Cards */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-8 w-8" />
            <span className="text-lg font-semibold">+</span>
          </div>
          <div className="w-16 h-16 bg-blue-200 rounded-full mb-4"></div>
          <p className="text-sm text-gray-600">Connect with mentors and experts</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <ShoppingCart className="h-8 w-8 mb-2" />
            <div className="text-sm text-gray-600">Your auction basket</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <div className="bg-gray-900 text-white rounded-lg p-4">
            <div className="text-xs text-gray-300 mb-1">#crypto #cryptalk #cryptocurrency</div>
            <div className="text-xs text-gray-300 mb-2">#ethereum #uniswap #nfts... more</div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-xs">@coinquest</span>
              <button className="text-xs border border-gray-600 px-2 py-1 rounded">Follow</button>
            </div>
            <div className="text-lg font-bold">
              Buy the future!<br />
              Tech is up<br />
              by 15% 🦄
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
