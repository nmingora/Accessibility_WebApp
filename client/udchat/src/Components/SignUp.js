import React from 'react';
import { useState, useEffect } from "react";
import Layout from './Layout';
import "./SignUp.css";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;  // Importing from the src directory

const Signup = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [file, setFile] = useState(null);

  const [fName, setFirstName] = useState('');
  const [lName, setLastName] = useState('');
  const [DOB, setDob] = useState('');
  const [username, setCreateUsername] = useState('');
  const [contact, setPhoneNumber] = useState('');
  const [addr, setAddress] = useState('');
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

  const validateInputs = () => {
    const validPasswords = pass === confirmPassword;
    const validEmail = email.includes("@") && (email.includes(".com") || email.includes(".ca"));
    // const validPhoneNumber = /^[0-9]{10}&/.test(phoneNumber);

    console.log(validEmail, validPasswords);

    return validPasswords && validEmail;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      const formData = new FormData();
      formData.append('fName', fName);
      formData.append('lName', lName);
      formData.append('username', username);
      formData.append('pass', pass);
      formData.append('email', email);
      formData.append('contact', contact);
      formData.append('DOB', DOB);
      formData.append('addr', addr);
      formData.append('notes', notes);
      formData.append('form', file);

      try {
        const response = await fetch(`${BASE_URL}/api/uptown/SignUp`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          console.error("Server returned an error:", response.status, response.statusText);
        } else {
          setSignupSuccess(true);
          const result = await response.json();
          setConfirmationMessage("Sign up successful! Please await confirmation from.");
          console.log("Signup successful", result);
          alert("Sign up successful! Please await confirmation from.");

          // Reset form fields
          setFirstName('');
          setLastName('');
          setCreateUsername('');
          setPassword('');
          setConfirmPassword('');
          setEmail('');
          setPhoneNumber('');
          setDob('');
          setAddress('');
          setNotes('');
          setFile(null);
        }
      } catch (err) {
        console.error("Error:", err);
        setSignupSuccess(false);
        setConfirmationMessage("An error occurred during sign up.");
      }
    }
  };


  return (
    <Layout>
      {/* Display confirmation message if sign up was successful */}
      {signupSuccess && <div className="confirmationMessage">Sign up successful! Please await confirmation from.</div>}

      {/* Display error message if password and confirm password do not match */}
      {confirmPassword && !pass && <div className="error">Passwords do not match</div>}

      <form onSubmit={handleSubmit} className="formContainer">
        <div>
          <label className="signUpText">Sign Up</label>
        </div>
        <div className="inputContainer">
          <label>First Name:</label>
          <input type="text" className="firstName" value={fName} onChange={handleFirstNameChange} placeholder="First Name" />
        </div>
        <div className="inputContainer">
          <label>Last Name:</label>
          <input type="text" className="lastName" value={lName} onChange={handleLastNameChange} placeholder="Last Name" />
        </div>
        <div className="inputContainer">
          <label>DOB:</label>
          <input type="date" className="dob" value={DOB} onChange={handleDobChange} placeholder="DOB" />
        </div>
        <div className="inputContainer">
          <label>Create Username:</label>
          <input type="text" className="createUsername" value={username} onChange={handleCreateUsernameChange} placeholder="Create Username" />
        </div>
        <div className="inputContainer">
          <label>Create Password:</label>
          <input type="password" className="createPassword" value={pass} onChange={handlePasswordChange} placeholder="Create Password" />
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
          <input type="tel" className="phoneNumber" value={contact} onChange={handlePhoneNumberChange} placeholder="Phone Number" />
        </div>
        <div className="inputContainer">
          <label>Address:</label>
          <input type="text" className="address" value={addr} onChange={handleAddressChange} placeholder="Address" />
        </div>
        <div className="inputContainer">
          <label>Notes:</label>
          <textarea className="notes" value={notes} onChange={handleNotesChange} placeholder="Notes"></textarea>
        </div>
        {/* File input for PDF upload */}
        <div className="inputContainer">
          <label>Upload File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div>
          <button type="submit" className="cartButton">Sign Up</button>
        </div>
      </form>
    </Layout>
  );
};

export default Signup;