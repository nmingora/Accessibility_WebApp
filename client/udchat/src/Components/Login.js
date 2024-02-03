import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import './Login.css'; // Assuming the CSS is in a file named Login.css

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error.message);
        }
    };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      setLoggedInUser(null); // Reset the logged-in user state
      // Optionally, handle any actions after logout, like redirecting
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If the user is logged in, show the logged-in message and logout button
  if (loggedInUser) {
    return (
        <div className="login-container">
            {user ? (
                <div>
                    <div>You are now logged in as {user.email}</div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="login-form">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                    />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleSignup}>Create Account</button>
                </div>
            )}
        </div>
    );
}

export default Login;

