import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import TeamCard from "./TeamCard";

const socket = io("http://localhost:5000");

const VotingPage = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [votedFor, setVotedFor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        const teamsRes = await axios.get("http://localhost:5000/api/teams");
        setTeams(teamsRes.data);

        if (user) {
          try {
            const voteRes = await axios.get("http://localhost:5000/api/vote", {
              headers: {
                'Authorization': `Bearer ${user.token}`, 
                'Content-Type': 'application/json'
              }
            });
            
            if (voteRes.data && voteRes.data.teamId) {
              setVotedFor(voteRes.data.teamId);
            }
          } catch (voteErr) {
            console.log("No existing vote found or error fetching vote:", voteErr.message);
          }
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    socket.on("voteUpdate", ({ teamId, votes }) => {
      setTeams((currentTeams) =>
        currentTeams.map((team) =>
          team._id === teamId ? { ...team, votes } : team
        )
      );
    });

    return () => socket.off("voteUpdate");
  }, [user]);

  const handleVote = async (newTeamId) => {
    if (!user) {
      alert("Please sign in to vote");
      return;
    }

    if (newTeamId === votedFor) return;

    const previousVoteId = votedFor;
    
    setVotedFor(newTeamId);
    setTeams((currentTeams) =>
      currentTeams.map((team) => {
        if (team._id === previousVoteId) {
          return { ...team, votes: team.votes - 1 };
        }
        if (team._id === newTeamId) {
          return { ...team, votes: team.votes + 1 };
        }
        return team;
      })
    );

    try {
      await axios.post(
        `http://localhost:5000/api/teams/${newTeamId}/vote`,
        {
          previousVote: previousVoteId,
        },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`, 
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (err) {
      console.error("Error updating vote:", err);
      
      setVotedFor(previousVoteId);
      setTeams((currentTeams) =>
        currentTeams.map((team) => {
          if (team._id === previousVoteId) {
            return { ...team, votes: team.votes + 1 };
          }
          if (team._id === newTeamId) {
            return { ...team, votes: team.votes - 1 };
          }
          return team;
        })
      );
      
      alert("Failed to update vote. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vote for Your Favorite Team</h1>
          {!user && (
            <p className="text-gray-600">Please sign in to cast your vote</p>
          )}
          {user && votedFor && (
            <p className="text-teal-600">You can change your vote at any time</p>
          )}
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team._id}
              team={team}
              onVote={handleVote}
              isLoggedIn={!!user}
              votedTeamId={votedFor} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;