import React from 'react';
import { Lock, Shield, Search } from 'lucide-react';

const ProtectionSection = () => (
  <section id="protect" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-black mb-8">
          How we protect<br />
          your progress
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-12 w-12 text-orange-700" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Compete with Confidence</h3>
          <p className="text-gray-600">
            Licensed for both virtual and physical resource exchange and custody.
          </p>
        </div>
        <div className="text-center">
          <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-12 w-12 text-purple-700" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Secure & Compliant</h3>
          <p className="text-gray-600">
            Fully audited by leading security firms (2025) for platform integrity and compliance.
          </p>
        </div>
        <div className="text-center">
          <div className="w-24 h-24 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-pink-700" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Established since 2025</h3>
          <p className="text-gray-600">
            Trusted by innovation leaders, we're shaping the future of competitive hackathons.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ProtectionSection;
