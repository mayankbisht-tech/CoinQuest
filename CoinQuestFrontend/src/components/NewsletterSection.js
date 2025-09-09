import React from 'react';

const NewsletterSection = ({ email, setEmail }) => (
  <section className="py-16 bg-teal-100">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-black mb-4">
              Sign up to our<br />
              newsletter
            </h3>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default NewsletterSection;
