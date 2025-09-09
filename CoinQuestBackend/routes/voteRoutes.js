
const express = require("express");
const mongoose = require("mongoose");
const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Team = require("../models/Team");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("votedFor");
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    res.json({ teamId: user.votedFor });
  } catch (error) {
    console.error("Error fetching user's vote:", error);
    res.status(500).json({ message: "Server error fetching vote." });
  }
});


router.post("/:teamId", auth, async (req, res) => {
  if (req.user.role !== 'voter') {
    return res.status(403).json({ message: "Access Denied: Only users with the 'voter' role can cast a vote." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { teamId } = req.params;
    const votingUser = await User.findById(req.user._id).session(session);
    
    if (!votingUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: "User not found." });
    }

    const votedTeam = await Team.findById(teamId).session(session);

    if (!votedTeam) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Team not found." });
    }
    
    const previousVoteId = votingUser.votedFor ? votingUser.votedFor.toString() : null;
    let oldTeamNewVotes = null;
    let newTeamNewVotes = votedTeam.votes;

    if (previousVoteId && previousVoteId !== teamId) {
      const oldTeam = await Team.findByIdAndUpdate(previousVoteId, { $inc: { votes: -1 } }, { session, new: true });
      if (oldTeam) {
        oldTeamNewVotes = oldTeam.votes;
      }
    }

    if (!previousVoteId || previousVoteId !== teamId) {
      const newTeam = await Team.findByIdAndUpdate(teamId, { $inc: { votes: 1 } }, { session, new: true });
      if (newTeam) {
          newTeamNewVotes = newTeam.votes;
      }
      votingUser.votedFor = teamId;
      await votingUser.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    const io = req.app.get("io");
    if (previousVoteId && previousVoteId !== teamId && oldTeamNewVotes !== null) {
      io.emit("voteUpdate", { teamId: previousVoteId, votes: oldTeamNewVotes });
    }
    io.emit("voteUpdate", { teamId: teamId, votes: newTeamNewVotes });

    res.status(200).json({ message: "Vote submitted successfully." });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Vote processing error:", error);
    res.status(500).json({ message: "Server error processing vote." });
  }
});

module.exports = router;