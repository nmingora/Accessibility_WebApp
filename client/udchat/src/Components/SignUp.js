import React from 'react';
import { useState } from "react";
import Layout from './Layout';


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
      <div>
        <div style={{ position: 'absolute', width: '524px', height: '63px', left: '106px', top: '137px', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: '400', fontSize: '48px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#426B1F' }}>
          Sign Up
        </div>

        <div style={{ position: 'absolute', width: '125px', height: '37px', left: '75px', top: '243px', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: '400', fontSize: '24px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#000000' }}>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ position: 'absolute', width: '125px', height: '43px', left: '40px', top: '316px', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: '400', fontSize: '24px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#000000' }}>
          Create Password:
          <input type="password" value={password} onChange={handlePasswordChange} style={{ marginLeft: '10px' }} />
        </div>

        {/* Student button */}
        <button style={{ position: 'absolute', width: '94px', height: '30px', right: '1700px', top: '484px', background: '#C5BE1E', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', outline: 'none', cursor: 'pointer' }}>
          Student
        </button>

        {/* Parent button */}
        <button style={{ position: 'absolute', width: '94px', height: '30px', right: '1600px', top: '484px', background: '#0500FD', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', outline: 'none', cursor: 'pointer' }}>
          Parent
        </button>

        {/* Admin button */}
        <button style={{ position: 'absolute', width: '94px', height: '30px', right: '1500px', top: '484px', background: '#FA00FF', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', outline: 'none', cursor: 'pointer' }}>
          Admin
        </button>

        {/* Sign Up button */}
        <button style={{ position: 'absolute', width: '130px', height: '47px', right: '1400px', top: '572px', background: '#426B1F', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', outline: 'none', cursor: 'pointer' }}>
          Sign Up
        </button>

        <div style={{ position: 'absolute', width: '125px', height: '37px', left: '41px', top: '395px', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: '400', fontSize: '24px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#000000' }}>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} style={{ marginLeft: '10px' }} />
        </div>

        {/* Password match error message */}
        {passwordMatchError && (
          <div style={{ position: 'absolute', left: '40px', top: '440px', color: 'red' }}>
            Passwords do not match
          </div>
        )}

        {/* Confirmation message */}
        {confirmationMessage && (
          <div style={{ position: 'absolute', left: '40px', top: '440px', color: 'green' }}>
            Your sign up has been sent and is now pending! Please await for Admin approval.
          </div>
        )}

        {/* Sign up button */}
        <button onClick={handleSubmit} style={{ position: 'absolute', width: '130px', height: '47px', left: '40px', top: '450px', background: '#426B1F', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', outline: 'none', cursor: 'pointer' }}>
          Sign Up
        </button>

      </div>
    </Layout>
  );
};

export default Signup;