
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const VotingPage = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user, logout } = useAuth();
    const isVoter = user && user.role === 'voter';

    useEffect(() => {
        const socket = io('http://localhost:5000'); 

        socket.on('connect', () => {
            console.log('Connected to WebSocket server!');
        });

        socket.on('voteUpdate', (updatedVote) => {
            console.log('Received vote update:', updatedVote);
            setTeams(prevTeams => 
                prevTeams.map(team => 
                    team._id === updatedVote.teamId ? { ...team, votes: updatedVote.votes } : team
                )
            );
        });
        
        const fetchTeamsAndUserVote = async () => {
            setIsLoading(true);
            try {
                const [teamsResponse, voteResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/teams'),
                    axios.get('http://localhost:5000/api/vote')
                ]);
                
                setTeams(teamsResponse.data);
                if (voteResponse.data.teamId) {
                    setSelectedTeamId(voteResponse.data.teamId);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load voting data.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamsAndUserVote();

        return () => {
            socket.disconnect();
        };
    }, []);
    
    const handleVoteSubmit = async () => {
        if (!selectedTeamId) {
            setError("Please select a team before submitting.");
            return;
        }
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`http://localhost:5000/api/vote/${selectedTeamId}`);
            setSuccessMessage(response.data.message || "Vote submitted successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while submitting your vote.");
            console.error(err);
        }
    };

    if (isLoading) return <div className="text-center p-8">Loading teams...</div>;
    
    const buttonText = () => {
        if (!isVoter) return "Only Voters Can Submit";
        if (!selectedTeamId) return "Select a Team to Vote";
        return "Submit Final Vote";
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Vote for a Team</h1>
                    <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
                </div>
                
                {!isVoter && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                      <p className="font-bold">Participant View</p>
                      <p>You are logged in as a participant. You can see the votes in real-time, but you cannot cast a vote.</p>
                    </div>
                )}
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-center text-green-500 mb-4">{successMessage}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <TeamCard
                            key={team._id}
                            team={team}
                            isSelected={selectedTeamId === team._id}
                            onSelect={() => isVoter && setSelectedTeamId(team._id)}
                        />
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleVoteSubmit}
                        disabled={!selectedTeamId || !isVoter}
                        className="w-full max-w-md py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                        {buttonText()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VotingPage;