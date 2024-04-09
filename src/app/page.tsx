'use client'

import React from 'react';
import styles from './page.module.css';
import signInWithGoogle from './interactiveButton';

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const FirstScreen = () => {

  return (
    <div className={styles.container}>
      <button onClick={signInWithGoogle} className={styles.topBarButton}>
        Sign in with Google
      </button>
    </div>
  );
};

export default FirstScreen;
