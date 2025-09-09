import React from 'react';

const StatusPill = ({ label = 'Active' }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    {label}
  </span>
);

export default StatusPill;
