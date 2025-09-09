import React from "react";
import { CheckCircle } from "lucide-react";

const TeamCard = ({ team, onVote, isLoggedIn, votedTeamId }) => {
  const isVotedFor = votedTeamId === team._id;

  return (
    <div
      className={`bg-white rounded-2xl border ${
        isVotedFor ? "border-teal-500 ring-2 ring-teal-200" : "border-gray-200"
      } p-6 shadow-sm transition-all duration-300 ${
        isLoggedIn ? "hover:shadow-lg hover:border-teal-300" : ""
      }`}
    >
      <div className="flex items-start space-x-4">
        {team.avatar && (
          <img
            src={team.avatar}
            alt={team.name}
            className="w-16 h-16 rounded-full flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
          {team.description && (
            <p className="text-gray-600 text-sm mt-1">{team.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-lg font-bold text-gray-800">
          {team.votes.toLocaleString()}{" "}
          <span className="text-sm font-medium text-gray-500">votes</span>
        </div>

        <button
          onClick={() => onVote(team._id)}
          disabled={!isLoggedIn}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
            isVotedFor
              ? "bg-teal-500 text-white"
              : !isLoggedIn
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isVotedFor ? (
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> Voted
            </span>
          ) : (
            "Vote"
          )}
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
