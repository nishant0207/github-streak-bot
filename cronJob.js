// cronJob.js
const cron = require('node-cron');
const { createCommit } = require('./controllers/githubController');

// Schedule the task every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running daily GitHub commit task...');
  createCommit();
});