import React from 'react';
import { Menu, X, MessageCircle, Send } from 'lucide-react';
import { Link , useLocation , useNavigate } from 'react-router-dom';

const Navigation = ({ isMenuOpen, setIsMenuOpen, activeSection, scrollToSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-black text-black">CoinQuest</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              // href="#about"
              onClick={e => {
                e.preventDefault();
                if(location.pathname === '/auction') navigate('/');
                scrollToSection('about');
              }}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'about'
                  ? 'text-black'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              About
            </a>
            <a
              // href="#how-it-works"
              onClick={e => {
                e.preventDefault();
                if(location.pathname === '/auction') navigate('/');
                scrollToSection('how-it-works');
              }}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'how-it-works'
                  ? 'text-black'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              How it works
            </a>
            <Link
              to="/auction"
              className={`text-sm font-medium transition-colors ${
                activeSection === 'auction'
                  ? 'text-black'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Auction
            </Link>
            <a
              // href="#timeline"
              onClick={e => {
                e.preventDefault();
                if(location.pathname === '/auction') navigate('/');
                scrollToSection('timeline');
              }}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'timeline'
                  ? 'text-black'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Timeline
            </a>
            <a
              // href="#contact"
              onClick={e => {
                e.preventDefault();
                if(location.pathname === '/auction') navigate('/');
                scrollToSection('contact');
              }}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'contact'
                  ? 'text-black'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                <Send className="h-4 w-4" />
              </button>
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
            <a
              href="#about"
              onClick={e => {
                e.preventDefault();
                scrollToSection('about');
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
            >
              About
            </a>
            <a
              href="#how-it-works"
              onClick={e => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
            >
              How it works
            </a>
            <Link
              to="/auction"
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
            >
              Auction
            </Link>
            <a
              href="#themes"
              onClick={e => {
                e.preventDefault();
                scrollToSection('themes');
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
            >
              Themes
            </a>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;