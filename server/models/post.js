const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postID: { type: String, required: true },
  userEmail: { type: String, required: true },
  postHeader: { type: String, required: true },
  postParagraph: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically set the date and time of post creation
  parentPostID: { type: String, default: null }, // Reference to the parent postID if it's a response
  postType: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Post', postSchema, 'publicPosts');
