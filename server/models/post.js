const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postID: { type: String, required: true },
  userEmail: { type: String, required: true },
  postHeader: { type: String, required: true },
  postParagraph: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema, 'publicPosts');
