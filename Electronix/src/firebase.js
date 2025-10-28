// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD67VPooCYP4eOURITrYTImGyL4yM4dXtk",
  authDomain: "electronix-auth.firebaseapp.com",
  projectId: "electronix-auth",
  storageBucket: "electronix-auth.firebasestorage.app",
  messagingSenderId: "72693867331",
  appId: "1:72693867331:web:758333049ab161050e85f6",
  measurementId: "G-PCJ5ZV16SV",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
