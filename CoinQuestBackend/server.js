
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.set('io', io);

app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/vote', voteRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

io.on('connection', (socket) => {
  console.log('A user connected via WebSocket:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});