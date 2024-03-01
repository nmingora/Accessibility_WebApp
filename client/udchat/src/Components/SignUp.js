import React from 'react';
import { useState } from "react";
import Layout from './Layout';
import "./SignUp.css";


const Signup = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

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
    const validEmail = email.includes("@")&&(email.includes(".com")||email.includes(".ca"));
   // const validPhoneNumber = /^[0-9]{10}&/.test(phoneNumber);

    console.log(validEmail, validPasswords);

    return validPasswords&&validEmail;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const applicationData = {
        fName,
        lName,
        username,
        pass,
        email,
        contact,
        DOB,
        addr,
        notes
      };
      try {
        const response = await fetch("http://localhost:3005/api/uptown/SignUp", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationData)
        });

        console.log(applicationData);
  
        if (!response.ok) {
          console.error("Server returned an error:", response.status, response.statusText);
          // if (data.message) {
          //   setSignupSuccess(true);
          //   setConfirmationMessage("Sign up successful! Please await confirmation from.");
          // } else {
          //   console.log("Response does not contain a message");
          // }
        } else {
          setSignupSuccess(true);
          setConfirmationMessage("Sign up successful! Please await confirmation from.");
          //const data = await response.json();
          console.log("h1")
          alert("Sign up successful! Please await confirmation from.");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };
  

  return (
    <Layout>
      {/* Display confirmation message if sign up was successful */}
      {signupSuccess && <div className="confirmationMessage">{alert("Sign up successful! Please await confirmation from.")}</div>}

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
        <div>
          <button type="submit" className="cartButton">Sign Up</button>
        </div>
      </form>
    </Layout>
  );
};

export default Signup;