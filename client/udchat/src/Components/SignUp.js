import React from 'react';
import { useState } from "react";
import Navbar from "./NavBar"

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

  const navOptions = {
    Home: '/',
    LogIn: '/Login',
    AdminPortal: '/Admin',
    ParentPortal: '/Parents'
  };

  return (
    <div>
      <Navbar options={navOptions}/>
      <h2>Sign Up</h2>
      {signupSuccess && <p>Signup successful! Please check your email for confirmation!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup;