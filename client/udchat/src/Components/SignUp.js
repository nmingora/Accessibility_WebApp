import React from 'react';
import { useState } from "react";
import Layout from './Layout';
import "./SignUp.css";


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic (e.g., send data to a server)
    console.log('Email:', email);
    console.log('Password:', password);

    setSignupSuccess(true);
  };

  

  return (
    <Layout>
    

    </Layout>
  );
};

export default Signup;