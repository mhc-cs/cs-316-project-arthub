'use client'

import React from 'react';

import signInWithGoogle from '@/app/interactiveButton';

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
import '@/globals.css'

const LoginScreen = () => {

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">See you soon ✨</h1>
          <p className="py-6">Create Collaborate Connect</p>
          <button onClick={signInWithGoogle} className="btn btn-primary">LOGIN WITH GOOGLE</button>
        </div>
      </div>
    </div>

  );
};

export default LoginScreen;
