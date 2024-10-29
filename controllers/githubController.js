// controllers/githubController.js
const axios = require('axios');

const createCommit = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const content = Buffer.from(`Commit on ${date}`).toString('base64');

    // GitHub API request to create/update a file
    await axios.put(
      `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/streak.txt`,
      {
        message: `Daily commit for ${date}`,
        content,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (res) {
      res.status(200).json({ message: 'File committed successfully!' });
    }
  } catch (error) {
    console.error(error.message);
    if (res) {
      res.status(500).json({ error: 'Failed to commit file.' });
    }
  }
};

module.exports = { createCommit };