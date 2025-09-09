import React from 'react';

const MarqueeBanner = ({ count = 8, position = 'top' }) => (
  <div className={`${position === 'bottom' ? 'fixed bottom-0 left-0 right-0 z-40' : ''} bg-teal-100 border-${position === 'bottom' ? 't' : 'b'} border-teal-200 py-2 overflow-hidden`}>
    <div className="relative w-full overflow-hidden">
      <div className="flex whitespace-nowrap animate-scroll" style={{ minWidth: '200%' }}>
        {/* Duplicate content for seamless infinite scroll */}
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {Array.from({ length: count }).map((_, i) => (
              <span key={i + idx * count} className="inline-flex items-center text-black font-medium mx-8">
                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                Join the waitlist
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  </div>
);

export default MarqueeBanner;