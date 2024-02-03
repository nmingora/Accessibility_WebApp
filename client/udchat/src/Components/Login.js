import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import './Login.css'; // Assuming the CSS is in a file named Login.css
import Layout from './Layout';

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
            await signOut(auth);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    if (loading) return <div>Loading...</div>;

    return (

        <Layout>


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

            </Layout>
    );
}

export default Login;
