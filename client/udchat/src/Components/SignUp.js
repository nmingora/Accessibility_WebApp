import React from 'react';
import { useState } from "react";
import Layout from './Layout';
import "./SignUp.css";


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send sign-up data to the backend server
      const response = await fetch('/api/SignUp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      console.log('User signed up successfully');
      setSignupSuccess(true);
      setPasswordMatchError(false);
      setConfirmationMessage('Sign up successful!'); // Set confirmation message

      // Clear email, password, and confirmation password fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error signing up user:', error);
    }

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    } 
  };

  return (
    <Layout>
    

    </Layout>
  );
};

export default Signup;