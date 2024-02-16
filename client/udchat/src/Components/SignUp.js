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
      <form onSubmit={handleSubmit} className="formContainer">
        <div>
          <label className="signUpText">Sign Up</label>
        </div>
        <div className="inputContainer">
          <label>First Name:</label>
          <input type="text" className="firstName" placeholder="First Name" />
        </div>
        <div className="inputContainer">
          <label>Last Name:</label>
          <input type="text" className="lastName" placeholder="Last Name" />
        </div>
        <div className="inputContainer">
          <label>DOB:</label>
          <input type="date" className="dob" placeholder="DOB" />
        </div>
        <div className="inputContainer">
          <label>Create Username:</label>
          <input type="text" className="createUsername" placeholder="Create Username" />
        </div>
        <div className="inputContainer">
          <label>Create Password:</label>
          <input type="password" className="createPassword" placeholder="Create Password" />
        </div>
        <div className="inputContainer">
          <label>Confirm Password:</label>
          <input type="password" className="confirmPassword" placeholder="Confirm Password" />
        </div>
        <div className="inputContainer">
          <label>Email:</label>
          <input type="email" className="email" onChange={handleEmailChange} value={email} placeholder="Email" />
        </div>
        <div className="inputContainer">
          <label>Phone Number:</label>
          <input type="tel" className="phoneNumber" placeholder="Phone Number" />
        </div>
        <div className="inputContainer">
          <label>Address:</label>
          <input type="text" className="address" placeholder="Address" />
        </div>
        <div className="inputContainer">
          <label>Notes:</label>
          <textarea className="notes" placeholder="Notes"></textarea>
        </div>
        <div>
          <button type="submit" className="cartButton">Sign Up</button>
        </div>
      </form>
      
    

    </Layout>
  );
};

export default Signup;