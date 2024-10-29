// routes/githubRoutes.js
const express = require('express');
const { createCommit } = require('../controllers/githubController');
const router = express.Router();

router.post('/commit', createCommit);

module.exports = router;