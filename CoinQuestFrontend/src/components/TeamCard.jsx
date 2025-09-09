import React from 'react';

const TeamCard = ({ team, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-blue-500 scale-105 shadow-xl'
          : 'hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-600">{team.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{team.name}</h3>
          <p className="text-sm text-gray-500">{team.description}</p>
        </div>
      </div>
      <div className="mt-4 text-right">
        <p className="text-gray-700">
          <span className="font-semibold">{team.votes}</span> Votes
        </p>
      </div>
    </div>
  );
};

export default TeamCard;