//FOR ADMIN!! The admin can delete posts!

import React, { useState, useEffect } from 'react';
import './ForumPosts.css'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'
const BASE_URL = process.env.REACT_APP_BACKEND_URL;  // Importing from the src directory


const ForumPostsAd = () => {
  const [posts, setPosts] = useState([]);
  const [postHeader, setPostHeader] = useState('');
  const [postParagraph, setPostParagraph] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(5); // State to keep track of how many posts to show
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // You can adjust this number if you want to show more/less posts per page
  const [respondingToPostID, setRespondingToPostID] = useState(null);

  const navigate = useNavigate();
    const toAdmin = () => {
      navigate("/Admin");
    }

    const handleResponse = (parentPostID) => {
        // Toggle responding state only if different postID is clicked
        // or turn off if the same postID is clicked again
        setRespondingToPostID(prev => prev === parentPostID ? null : parentPostID);
    };
      
    
    
    const findParentPostHeader = (parentPostID) => {
        const parentPost = posts.find(post => post.postID === parentPostID);
        return parentPost ? parentPost.postHeader : 'Original Post';
      };
      
    



  useEffect(() => {
    fetchPosts();
  }, [visiblePosts]);


  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/posts?page=${currentPage}&limit=${postsPerPage}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allPosts = await response.json();
      setPosts(allPosts); // Directly set all posts, including responses
    } catch (error) {
      console.error("Could not fetch posts: ", error);
    }
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Determine if the post is a response based on whether respondingToPostID is set
    const isResponse = respondingToPostID !== null;
  
    try {
      const response = await fetch(`${BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          postHeader,
          postParagraph,
          userEmail: "siteAdmin", // Set userEmail to "siteAdmin" for posts from this page
          parentPostID: isResponse ? respondingToPostID : undefined,
          postType: isResponse // This will be true for responses, false otherwise
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPostHeader('');
      setPostParagraph('');
      setRespondingToPostID(null); // Reset respondingToPostID after submitting
      fetchPosts(); // Refresh posts list
    } catch (error) {
      console.error("Could not create post: ", error);
    }
  };
  







  
  const deletePost = async (postId) => {
    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this post? Deleting a post is permanent.");
    if (!isConfirmed) {
      return; // Stop the function if the user clicks 'Cancel'
    }
  
    try {
      const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Successfully deleted post
      console.log("Post deleted successfully");
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Could not delete post: ", error);
    }
  };
  
  
  
  



  

  const showMorePosts = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5); // Show 5 more posts
  };


  const goToNextPage = () => {
    setCurrentPage(page => page + 1);
    fetchPosts(currentPage + 1);
  };
  
  const goToPrevPage = () => {
    setCurrentPage(page => page - 1);
    fetchPosts(currentPage - 1);
  };
  


  


  return (
    <Layout>
      <div className="forumPosts-container">
      <div className="forumPosts-postsList">
    
          <div>
          <h2 className="forumPosts-title">Community Forum</h2>
          <h2 className="forumPosts-title">Admin Terminal</h2>
          
          
          </div>
          <div>
              <p></p>
          <button type="button" onClick={toAdmin}>Back to Admin Page</button>
          <p></p>
          </div>



          
          
          
          
          <ul className="forumPosts-ul">
            {posts.map(post => {
              if (!post.postType) { // This is a top-level post
                return (

                  //this is for the PARENT POSTS!!!
                  <li key={post.postID} className="forumPosts-post">
                    {/* Post content */}
                    <h2 className="forumPosts-h2">{post.postHeader}</h2>
                    <small className="forumPosts-small">Posted by: {post.userEmail}</small>
                    <div></div>
                    <small className="forumPosts-small">Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Date unavailable"}</small>
                    <p>{post.postParagraph}</p>
                    <button className = "community-button"onClick={() => deletePost(post._id)}>Delete</button>


                    
                    
              
                
                    {!post.postType && (
                      <button className = "community-button"
                        style={{ backgroundColor: respondingToPostID === post.postID ? 'green' : 'blue' }} 
                        onClick={() => handleResponse(post.postID)}>
                        Respond
                      </button>
                    )}
              
                    {/* this is for the RESPONSE POSTS!!! */}
                    
                    {posts.filter(response => response.parentPostID === post.postID).map(response => (
                      <div key={response.postID} className="forumPosts-response">
                        
                        
                        <div></div>
                        
                        
                        <small>Response to: {post.postHeader}</small>
                        <div></div>
                        <h2 className="forumPosts-h2">{response.postHeader}</h2>
                        <small className="forumPosts-small">Posted by: {response.userEmail}</small>
                        <div></div>
                        <small className="forumPosts-small">Posted on: {response.createdAt ? new Date(post.createdAt).toLocaleString() : "Date unavailable"}</small>
                        
                        <p>{response.postParagraph}</p>
                        <button className = "community-button" onClick={() => deletePost(response._id)} >Delete</button>


          

                      
                      </div>
                    ))}
                  </li>
                );
              }
              // If it's a response post, don't render it here as it will be nested inside its parent post
              return null;
            })}
          </ul>
        


          
          <div className="pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={goToNextPage}>Next</button>
          </div>

        </div>
        <form className="createPostForm" onSubmit={handleSubmit}>
          <h2  className="ForumMaka">Create New Post</h2>
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

    </Layout>
  );
};

export default ForumPostsAd;
