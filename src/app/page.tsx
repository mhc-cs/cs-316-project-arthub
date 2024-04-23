'use client'

import React, { useEffect } from 'react';
import styles from './page.module.css';

//import GragientBG from './design/GradientBG'

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { firebaseConfig } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

const FirstScreen = () => {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User logged in:", user.uid); // Log user UID
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
          console.log("Creating new document for user");
          try {
            await setDoc(userDocRef, {
              uid: user.uid,
              firstName: 'First Name',
              lastName: 'Last Name',
              profilePictureUrl: 'https://placehold.co/100x100',
            }, { merge: true });
            console.log("Document created");
          } catch (error) {
            console.error("Error creating document:", error);
          }
        } else {
          console.log("Document already exists");
        }
      } else {
        console.log("No user logged in");
      }
    });
  
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const signInWithGoogle = (isSignUp: boolean): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        if (isSignUp) {
          window.location.href = '/loginPage';  // Redirect new users to the login page for additional steps
        } else {
          window.location.href = '/homePage';  // Redirect existing users to the home page
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (

    <div className={styles.container}>

    <div className={styles.loginContainer}>
    <div className="box"></div>
      <img src="https://i.pinimg.com/originals/b8/c5/b1/b8c5b1b6c6fa24e202ea0e8fe7ed988d.png" alt="Decorative icon" className={styles.icon}/>
      <button onClick={() => signInWithGoogle(true)} className={styles.topBarButton}>
        SIGN UP WITH GOOGLE
      </button>
      <button onClick={() => signInWithGoogle(false)} className={styles.topBarButton}>
        LOGIN WITH GOOGLE
      </button>
    </div>

  </div>

  

  );
};

export default FirstScreen;






