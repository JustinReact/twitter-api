const { Client } = require("twitter-api-sdk");
const express = require("express");
const router = express.Router();
const vars = require("../../env_variables");

const client = new Client(vars.BEARER_TOKEN);

// @route   GET api/tweets
// @desc    Get list of tweets that belong to a user
// @access  Private

router.post("/", async (req, res) => {
  const { user } = req.body;
  try {
    const response = await client.tweets.tweetsRecentSearch({
      query: `from:${user}`,
      sort_order: "recency",
      "tweet.fields": ["text"],
      expansions: ["author_id"],
      "user.fields": ["name", "username"],
    });

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: "Server error. Please try again or refresh the page." }],
    });
  }
});

module.exports = router;
