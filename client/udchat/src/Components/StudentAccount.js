// import React from 'react';
// import { useState } from "react";
// import Layout from './Layout';
// import "./StudentAccount.css";

// const Signup = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [signupSuccess, setSignupSuccess] = useState(false);
//   const [confirmationMessage, setConfirmationMessage] = useState('');

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   }

//   const validatePasswords = () => {
//     const validPasswords = password === confirmPassword;
//     return validPasswords;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(validatePasswords()){
//       const applicationData = [password];
//       try{
//         const response = await fetch("http://localhost:3005/api/uptown/setup-child-account",
//         {
//           method:"Put",
//           headers:{'content-Type':'application/json'},
//           body: JSON.stringify(applicationData)
//         }
//         );
        
//         const message = await response.json().message;
//         setConfirmationMessage(message);

//       }catch(err){
//         console.log("Error: ",err)
//       }
//     }
//   };

//   return (
//     <Layout>
//       {/* Display confirmation message if sign up was successful */}
//       {confirmationMessage && <div className="confirmationMessage">{confirmationMessage}</div>}

//       {/* Display error message if password and confirm password do not match */}
//       {confirmPassword && <div className="error">Passwords do not match</div>}

//       <form onSubmit={handleSubmit} className="formContainer">
//         <div>
//           <label className="signUpText">Sign Up</label>
//         </div>
//         <div className="inputContainer">
//           <label>Create Password:</label>
//           <input type="password" className="createPassword" value={password} onChange={handlePasswordChange} placeholder="Create Password" />
//         </div>
//         <div className="inputContainer">
//           <label>Confirm Password:</label>
//           <input type="password" className="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" />
//         </div>
//         <div className="inputContainer">
//           <label>Email:</label>
//           <input type="email" className="email" value={email} onChange={handleEmailChange} placeholder="Email" />
//         </div>
//           <button type="submit" className="cartButton">Sign Up</button>
//         </div>
//       </form>
//     </Layout>
//   );
// };

// export default Signup;