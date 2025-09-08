const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const teamRoutes = require("./routes/teamRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/teams", teamRoutes);

app.set("io", io);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
