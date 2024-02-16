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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [createUsername, setCreateUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleCreateUsernameChange = (e) => {
    setCreateUsername(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

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
      const response = await fetch('/api/uptown/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          dob,
          createUsername,
          password,
          email,
          phoneNumber,
          address,
          notes
        })
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
      setFirstName('');
      setLastName('');
      setDob('');
      setCreateUsername('');
      setPhoneNumber('');
      setAddress('');
      setNotes('');
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
      {/* Display confirmation message if sign up was successful */}
      {signupSuccess && <div className="confirmationMessage">{confirmationMessage}</div>}

      {/* Display error message if password and confirm password do not match */}
      {passwordMatchError && <div className="error">Passwords do not match</div>}

      <form onSubmit={handleSubmit} className="formContainer">
        <div>
          <label className="signUpText">Sign Up</label>
        </div>
        <div className="inputContainer">
          <label>First Name:</label>
          <input type="text" className="firstName" value={firstName} onChange={handleFirstNameChange} placeholder="First Name" />
        </div>
        <div className="inputContainer">
          <label>Last Name:</label>
          <input type="text" className="lastName" value={lastName} onChange={handleLastNameChange} placeholder="Last Name" />
        </div>
        <div className="inputContainer">
          <label>DOB:</label>
          <input type="date" className="dob" value={dob} onChange={handleDobChange} placeholder="DOB" />
        </div>
        <div className="inputContainer">
          <label>Create Username:</label>
          <input type="text" className="createUsername" value={createUsername} onChange={handleCreateUsernameChange} placeholder="Create Username" />
        </div>
        <div className="inputContainer">
          <label>Create Password:</label>
          <input type="password" className="createPassword" value={password} onChange={handlePasswordChange} placeholder="Create Password" />
        </div>
        <div className="inputContainer">
          <label>Confirm Password:</label>
          <input type="password" className="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" />
        </div>
        <div className="inputContainer">
          <label>Email:</label>
          <input type="email" className="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        </div>
        <div className="inputContainer">
          <label>Phone Number:</label>
          <input type="tel" className="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" />
        </div>
        <div className="inputContainer">
          <label>Address:</label>
          <input type="text" className="address" value={address} onChange={handleAddressChange} placeholder="Address" />
        </div>
        <div className="inputContainer">
          <label>Notes:</label>
          <textarea className="notes" value={notes} onChange={handleNotesChange} placeholder="Notes"></textarea>
        </div>
        <div>
          <button type="submit" className="cartButton">Sign Up</button>
        </div>
      </form>
    </Layout>
  );
};

export default Signup;