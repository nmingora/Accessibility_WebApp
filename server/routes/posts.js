const express = require('express');
const router = express.Router();
const crypto = require('crypto');// for id generation bc i don't want packages

// Post Model
const Post = require('../models/Post');

// Generate a unique postID with 4 alphanumeric characters
function generatePostID() {
    return crypto.randomBytes(2).toString('hex');
  }




//____________________________________________________________________//
//                          a get general                              //
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



//____________________________________________________________________//

//                          post a new post                              //
// @route POST api/posts
// @desc Create a Post
router.post('/', async (req, res) => {
    try {
      const { postHeader, postParagraph } = req.body;
      const newPost = new Post({
        postID: generatePostID(), // Generate a unique postID
        userEmail: "publicUser@tempdefault.com", // Default user email
        postHeader: postHeader,
        postParagraph: postParagraph
      });
  
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  //____________________________________________________________________//


module.exports = router;
