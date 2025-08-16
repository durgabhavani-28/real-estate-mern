// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realtstates.firebaseapp.com",
  projectId: "mern-realtstates",
  storageBucket: "mern-realtstates.appspot.com",
  messagingSenderId: "932491403449",
  appId: "1:932491403449:web:8a799cf9889935f993fb68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);