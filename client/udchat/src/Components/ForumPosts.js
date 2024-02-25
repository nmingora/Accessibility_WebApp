import React, { useState, useEffect } from 'react';
import './ForumPosts.css'; // Make sure the path is correct

const ForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postHeader, setPostHeader] = useState('');
  const [postParagraph, setPostParagraph] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5004/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Could not fetch posts: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5004/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postHeader, postParagraph }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPostHeader('');
      setPostParagraph('');
      fetchPosts(); // Refresh posts list
    } catch (error) {
      console.error("Could not create post: ", error);
    }
  };

  return (
    <div className="container">
      <div className="postsList">
        <h2>Community Forum</h2>
        <ul>
          {posts.map(post => (
            <li key={post.postID} className="post">
              <h2>{post.postHeader}</h2>
              <p>{post.postParagraph}</p>
              <small>Posted by: {post.userEmail}</small>
            </li>
          ))}
        </ul>
      </div>
      <form className="createPostForm" onSubmit={handleSubmit}>
        <h2>Create New Post</h2>
        <div className="formField">
          <input
            type="text"
            placeholder="Post Header"
            value={postHeader}
            onChange={(e) => setPostHeader(e.target.value)}
            required
          />
        </div>
        <div className="formField">
          <textarea
            placeholder="Post Paragraph"
            value={postParagraph}
            onChange={(e) => setPostParagraph(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submitButton">Submit</button>
      </form>
    </div>
  );
};

export default ForumPosts;
