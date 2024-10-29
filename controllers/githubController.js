const axios = require('axios');

// Helper function to get the SHA of the existing file
const getFileSHA = async () => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/streak.txt`,
      {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
      }
    );
    return response.data.sha;
  } catch (error) {
    console.error("Error fetching file SHA:", error.response?.data || error.message);
    return null; // Return null if there's no existing file
  }
};

const createCommit = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const content = Buffer.from(`Commit on ${date}`).toString('base64');

    // Fetch the current SHA of the file if it exists
    const sha = await getFileSHA();

    // GitHub API request to create/update a file
    await axios.put(
      `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/streak.txt`,
      {
        message: `Daily commit for ${date}`,
        content,
        ...(sha && { sha }), // Include sha only if it's not null
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    // Respond with success message if the commit was successful
    if (res) {
      res.status(200).json({ message: 'File committed successfully!' });
    }
  } catch (error) {
    console.error("Error committing file:", error.response?.data || error.message);
    if (res) {
      res.status(500).json({ error: 'Failed to commit file.', details: error.response?.data });
    }
  }
};

module.exports = { createCommit };