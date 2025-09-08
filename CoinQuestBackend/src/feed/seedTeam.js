const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Team = require("../model/Team"); 

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const teams = [
  { name: "Quantum Phoenix", description: "Innovating with quantum computing",  },
  { name: "Cyber Sentinels", description: "Next-gen cybersecurity with AI",  },
  { name: "Bio-Synth Crafters", description: "Engineering biological systems",  }
];

const seedDB = async () => {
  await Team.deleteMany({});
  await Team.insertMany(teams);
  console.log("Teams seeded");
  mongoose.connection.close();
};

seedDB();
