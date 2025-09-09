const express = require("express");
const mongoose = require("mongoose");
const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Team = require("../models/Team");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("votedFor");
    res.json({ teamId: user.votedFor });
  } catch (error) {
    console.error("Error fetching user's vote:", error);
    res.status(500).json({ message: "Server error fetching vote." });
  }
});

router.post("/:teamId", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { teamId } = req.params;
    const { user } = req;

    const [votedTeam, votingUser] = await Promise.all([
      Team.findById(teamId).session(session),
      User.findById(user.id).session(session),
    ]);

    if (!votedTeam) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Team not found." });
    }
    
    const previousVoteId = votingUser.votedFor ? votingUser.votedFor.toString() : null;

    if (previousVoteId && previousVoteId !== teamId) {
      await Team.findByIdAndUpdate(previousVoteId, { $inc: { votes: -1 } }, { session });
      const io = req.app.get("io");
      io.emit("voteUpdate", { teamId: previousVoteId, votes: votedTeam.votes - 1 });
    }

    if (!previousVoteId || previousVoteId !== teamId) {
      await Team.findByIdAndUpdate(teamId, { $inc: { votes: 1 } }, { session });
      
      votingUser.votedFor = teamId;
      await votingUser.save({ session });
      const io = req.app.get("io");
      io.emit("voteUpdate", { teamId, votes: votedTeam.votes + 1 });
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Vote submitted successfully." });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Vote processing error:", error);
    res.status(500).json({ message: "Server error processing vote." });
  }
});

module.exports = router;
