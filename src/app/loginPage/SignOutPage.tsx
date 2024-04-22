// 'use client'
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig'; // Adjust the path to your Firebase config
import '@/globals.css';

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log(result);
      // Redirect the user or show them the homepage
      window.location.href = '/homePage';
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error);
    });
};

const LoginScreen = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md" style={{ color: "#045c5a" }}>
          <h1 className="text-5xl font-bold">See you soon ✨</h1>
          <p className="py-6">Create Collaborate Connect</p>
          <button onClick={signInWithGoogle} className="btn btn-outline btn-warning">LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;