// app.js
const axios = require('axios');
const express = require('express');
const githubRoutes = require('./routes/githubRoutes');
require('./cronJob');  // Load cron job setup

const app = express();
app.use(express.json());

app.use('/api/github', githubRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Self-ping every 14 minutes to keep the server awake
const SELF_URL = `https://github-streak-bot.onrender.com/health`;

setInterval(async () => {
  try {
    console.log('Self-pinging to prevent server from sleeping...');
    await axios.get(SELF_URL);
  } catch (error) {
    console.error('Error in self-ping:', error.message);
  }
}, 14 * 60 * 1000); // 14 minutes


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
  });