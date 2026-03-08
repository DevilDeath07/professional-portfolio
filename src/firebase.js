import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCSp7XeJcgTdU__6ERIZywnu1aq9QasJXQ",
  authDomain: "professional-portfolio-bca16.firebaseapp.com",
  projectId: "professional-portfolio-bca16",
  storageBucket: "professional-portfolio-bca16.firebasestorage.app",
  messagingSenderId: "898982842769",
  appId: "1:898982842769:web:36a45d7601fcfbc3234a30",
  measurementId: "G-EV7F9GC7M2",
  // Adding the standard Realtime Database URL format just in case it's needed
  databaseURL: "https://professional-portfolio-bca16-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
