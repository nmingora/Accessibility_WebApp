import React from 'react';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jsonwebtoken';

const withAdminProtection = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    // Check if user is authenticated and has admin role
    var accessToken = localStorage.getItem('token');
    var decoded_token = jwt_decode(accessToken);

    if (!decoded_token.isAdmin) {
      // Redirect to login page or show access denied message
      return <Redirect to="/Login" />;
    }

    // Render the wrapped component if user is admin
    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAdminProtection;
