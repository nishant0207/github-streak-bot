// app.js
require('dotenv').config();
require('./cronJob');
const express = require('express');
const githubRoutes = require('./routes/githubRoutes');

const app = express();
app.use(express.json());

app.use('/api/github', githubRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));