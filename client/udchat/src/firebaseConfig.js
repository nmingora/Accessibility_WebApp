// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD71hK3Jr5Oo8kuAK9_QG426irDTW4JBfY",
    authDomain: "uptown-e2e25.firebaseapp.com",
    projectId: "uptown-e2e25",
    storageBucket: "uptown-e2e25.appspot.com",
    messagingSenderId: "145253158167",
    appId: "1:145253158167:web:9e4c2bab66d1a2004a7b52",
    measurementId: "G-KXQQ66TWS5"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication function
export const auth = getAuth(app);
