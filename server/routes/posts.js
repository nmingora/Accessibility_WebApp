const express = require('express');
const router = express.Router();

// Post Model
const Post = require('../models/Post');

// @route GET api/posts
// @desc Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add routes for CREATE, UPDATE, DELETE...

module.exports = router;
