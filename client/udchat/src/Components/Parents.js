import React from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';



const Parents = () => {
//navigate!!!
    const navigate = useNavigate();
    const goForumPosts = () => {
      navigate("/ForumPosts");
    }

  return (
    <Layout>
      <div>
        <h2>This is the parent page, please log in to access its contents</h2>
        <button type="button" onClick={goForumPosts}>PARENT FORUM!</button>
      </div>
    </Layout>
  );
};

export default Parents;