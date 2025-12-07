/**
 * Firebase Client Configuration
 * 
 * Initializes Firebase app and provides authentication services
 * for phone number authentication with OTP verification
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBBLHQ-fG9kv22ATGsk4AHhz2_12RKXeJA",
  authDomain: "autismart-fe54c.firebaseapp.com",
  projectId: "autismart-fe54c",
  storageBucket: "autismart-fe54c.firebasestorage.app",
  messagingSenderId: "245495881320",
  appId: "1:245495881320:web:94d825512b5a72ea5ba5dd",
  measurementId: "G-QQBNGMH1LM"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export auth instance for use in components
export { auth };
export default app;
