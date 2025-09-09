import React from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Twitter, Instagram } from 'lucide-react';

const Footer = ({ scrollToSection }) => (
  <footer id="contact" className="py-16 bg-gray-50 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h4 className="text-2xl font-black text-black mb-4">coinquest.com</h4>
          <p className="text-sm text-gray-600 mb-6 max-w-md">
            COIN QUEST is organized by IoSC-EDC - Company no. IOS2025 registered at Delhi Tech Hub,
            Sector 62, Noida, Delhi NCR, India. The innovative hackathon experience combining
            auction strategy with collaborative innovation, pioneering the future of competitive
            technology events.
          </p>
          <p className="text-xs text-gray-500">© 2025 CoinQuest.com. All rights reserved.</p>
          <div className="flex items-center space-x-3 mt-6">



<div className="flex space-x-2">
  <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
    <span className="sr-only">Twitter</span>
    <Twitter className="h-4 w-4" />
  </button>
  <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
    <span className="sr-only">Instagram</span>
    <Instagram className="h-4 w-4" />
  </button>
  <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
    <span className="sr-only">Chat</span>
    <MessageCircle className="h-4 w-4" />
  </button>
  <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
    <span className="sr-only">Send</span>
    <Send className="h-4 w-4" />
  </button>
</div>




          </div>
        </div>
        <div>
          <h5 className="text-lg font-bold text-black mb-4">Event</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><button onClick={() => scrollToSection('about')} className="hover:text-black transition-colors">About</button></li>
            <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-black transition-colors">How it works</button></li>
            <li><button onClick={() => scrollToSection('auction')} className="hover:text-black transition-colors">Auction</button></li>
            <li><button onClick={() => scrollToSection('themes')} className="hover:text-black transition-colors">Themes</button></li>
            <li><a href="#" className="hover:text-black transition-colors">Register</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-bold text-black mb-4">Legal</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Code of Conduct</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Competition Rules</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Responsible Disclosure</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
