import React from 'react';
import { useState } from "react";
import Layout from './Layout';


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
      <div>
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
    </Layout>
  )
}

export default Signup;