const express = require("express");
const Team = require("../model/Team");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (err) {
    res.status(500).send("Error fetching teams");
  }
});

router.post("/:id/vote", async (req, res) => {
  try {
    const { previousVote } = req.body;

    if (previousVote && previousVote !== req.params.id) {
      const prevTeam = await Team.findById(previousVote);
      if (prevTeam) {
        prevTeam.votes = Math.max(0, prevTeam.votes - 1); 
        await prevTeam.save();

        const io = req.app.get("io");
        io.emit("voteUpdate", { teamId: prevTeam._id, votes: prevTeam.votes });
      }
    }

    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).send("Team not found");

    team.votes += 1;
    await team.save();

    const io = req.app.get("io");
    io.emit("voteUpdate", { teamId: team._id, votes: team.votes });

    res.json(team);
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).send("Error processing vote");
  }
});

module.exports = router;
