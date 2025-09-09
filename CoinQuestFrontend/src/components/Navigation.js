import React from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, X, MessageCircle, Send } from 'lucide-react';

const Navigation = ({ isMenuOpen, setIsMenuOpen, activeSection, scrollToSection }) => (
  <nav className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <span className="text-2xl font-black text-black">CoinQuest</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {["About", "How it works", "Auction", "Themes", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.toLowerCase().replace(' ', '-')
                  ? 'text-black'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              <MessageCircle className="h-4 w-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              <Send className="h-4 w-4" />
            </button>
            <Link to="/signin" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Sign Up
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
    {isMenuOpen && (
      <div className="md:hidden bg-gray-50 border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {["About", "How it works", "Auction", "Themes", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
            >
              {item}
            </button>
          ))}
          <Link to="/SignIn" className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black">
            Sign In
          </Link>
          <Link to="/signup" className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-black rounded-md hover:bg-gray-800">
            Sign Up
          </Link>
        </div>
      </div>
    )}
  </nav>
);

export default Navigation;