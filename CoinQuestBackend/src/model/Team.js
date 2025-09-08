const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  

  votes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Team", teamSchema);
