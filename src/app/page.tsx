'use client'

import React from 'react';
import styles from './page.module.css';
import signInWithGoogle from './interactiveButton';

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const FirstScreen = () => {

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there ✨</h1>
          <p className="py-6">Create Collaborate Connect</p>
          <button onClick={signInWithGoogle} className="btn btn-primary">LOGIN WITH GOOGLE</button>
        </div>
      </div>
    </div>
    // <div className={styles.container}>
    //   <button onClick={signInWithGoogle} className={styles.topBarButton}>
    //     Sign in with Google
    //   </button>
    // </div>
  );
};

export default FirstScreen;
