// cronJob.js
const cron = require('node-cron');
const { createCommit } = require('./controllers/githubController');

// Schedule the task every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily GitHub commit task...');
  try {
    await createCommit(); // No req, res needed for cron job
    console.log('Daily commit completed successfully.');
  } catch (error) {
    console.error('Failed to complete daily commit task:', error.message);
  }
});