// app.js
require('dotenv').config();
const express = require('express');
const githubRoutes = require('./routes/githubRoutes');
require('./cronJob');

const app = express();
app.use(express.json());

app.use('/api/github', githubRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));