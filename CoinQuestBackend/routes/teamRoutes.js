const express = require("express");
const Team = require("../models/Team");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).send("Error fetching teams");
  }
});

module.exports = router;
