// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_CDm1YMIc7RIYMRiDRCD588CKq8-pf2Y",
  authDomain: "avnish-portfolio-c14e6.firebaseapp.com",
  projectId: "avnish-portfolio-c14e6",
  storageBucket: "avnish-portfolio-c14e6.firebasestorage.app",
  messagingSenderId: "177848360320",
  appId: "1:177848360320:web:2bed36f4b2939070c47565",
  measurementId: "G-WSJZHCD9SB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);