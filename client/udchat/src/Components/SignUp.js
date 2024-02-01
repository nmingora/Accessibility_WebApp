import React from 'react';
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup();


  // Custom hook -> Delete this is we don't need to use it (Nico added since we had errors)
  const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const signup = async (email, password) => {
      setIsLoading(true)
      try {
        // Add signup logic here
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }

    return {signup, error, isLoading}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup;