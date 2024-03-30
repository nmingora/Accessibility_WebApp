import React from 'react';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jsonwebtoken';

const authenticateToken = async(accessToken) => {
  try{
    const response = await fetch(`${BASE_URL}/api/authenticate/admin`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if(response.ok){
      return true;
    }
    else{
      return false;
    }
  }catch(err){
    console.log(err);
  }
}

const withAdminProtection = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    // Check if user is authenticated and has admin role
    var accessToken = localStorage.getItem('accessToken');
    
    isAdmin = authenticateToken(accessToken);

    if (!isAdmin) {
      // Redirect to login page or show access denied message
      return <Redirect to="/Login" />;
    }

    // Render the wrapped component if user is admin
    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAdminProtection;

