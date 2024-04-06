const express = require('express');
const router = express.Router();
const crypto = require('crypto');// for id generation bc i don't want packages


// Post Model
const Post = require('../models/post.js');

// Generate a unique postID with 4 alphanumeric characters
function generatePostID() {
    return crypto.randomBytes(2).toString('hex');
  }


//____________________________________________________________________//
//                          a get general                              //
// @route GET api/posts
// @desc Get All Posts
// Order by most recent

// @route GET api/posts
// Fetch only top-level posts

// Fetch all posts, including top-level and responses
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skipIndex = (page - 1) * limit;
    
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex);

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
    const { postHeader, postParagraph, parentPostID, postType, userEmail } = req.body;

    // Use the provided userEmail directly, ensure validation/security checks as necessary
    const newPost = new Post({
      postID: generatePostID(),
      userEmail, // Use the provided userEmail
      postHeader,
      postParagraph,
      postType,
      parentPostID: parentPostID || null,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




  //____________________________________________________________________//

  // Delete a post by _id
// @route DELETE api/posts/:id
// @desc Delete a Post by _id


router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: 'Post not found' });
      console.log("Post not found'")
    }

    res.status(200).json({ message: 'Post deleted successfully' });
    console.log("sucess!'")
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("err 500'")
  }
});


















  //____________________________________________________________________//


module.exports = router;

