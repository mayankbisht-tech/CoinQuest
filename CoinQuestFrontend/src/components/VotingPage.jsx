// CoinQuestFrontend/src/components/VotingPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const VotingPage = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { logout } = useAuth(); // Get logout function from context

    useEffect(() => {
        const fetchTeamsAndUserVote = async () => {
            setIsLoading(true);
            setError('');
            try {
                // Fetch all teams in parallel with the user's current vote
                const [teamsResponse, voteResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/teams'),
                    axios.get('http://localhost:5000/api/vote')
                ]);
                
                setTeams(teamsResponse.data);

                if (voteResponse.data.teamId) {
                    setSelectedTeamId(voteResponse.data.teamId);
                }
            } catch (err) {
                setError('Failed to load voting data. Please refresh the page.');
                console.error("Fetch Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamsAndUserVote();
    }, []);
    
    // Function to handle the final vote submission
    const handleVoteSubmit = async () => {
        if (!selectedTeamId) {
            setError("Please select a team before submitting.");
            return;
        }
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`http://localhost:5000/api/vote/${selectedTeamId}`);
            setSuccessMessage(response.data.message || "Your vote has been cast successfully!");
            
            // Refresh teams data to show new vote counts
            const teamsResponse = await axios.get('http://localhost:5000/api/teams');
            setTeams(teamsResponse.data);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while submitting your vote.");
            console.error("Vote Submit Error:", err);
        }
    };

    if (isLoading) return <div className="text-center p-8 text-xl">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Vote for a Team</h1>
                    <button 
                        onClick={logout} 
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
                
                {error && <p className="text-center text-red-600 font-semibold mb-4 p-3 bg-red-100 rounded-lg">{error}</p>}
                {successMessage && <p className="text-center text-green-600 font-semibold mb-4 p-3 bg-green-100 rounded-lg">{successMessage}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <TeamCard
                            key={team._id}
                            team={team}
                            isSelected={selectedTeamId === team._id}
                            onSelect={() => setSelectedTeamId(team._id)}
                        />
                    ))}
                </div>

                <div className="mt-8 flex flex-col items-center">
                    <button
                        onClick={handleVoteSubmit}
                        disabled={!selectedTeamId}
                        className="w-full max-w-md py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                        {selectedTeamId ? 'Submit Final Vote' : 'Select a Team to Vote'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VotingPage;