'use client'

import React, { useEffect } from 'react';
import styles from './page.module.css';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import {auth, app } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

// Initialize Firebase
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

  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row">
      <img src="logo.jpg" className="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 className="text-5xl font-bold " >Hi Artist ✨ !</h1>
        <p className="py-6" >Create Collaborate Connect</p>
        <button onClick={() => signInWithGoogle(true)} className="btn btn-outline btn-warning"> SIGN UP WITH GOOGLE</button>
        <button onClick={() => signInWithGoogle(false)} style={{ marginLeft: '10px' }} className="btn btn-outline btn-warning"> LOGIN WITH GOOGLE</button>
      </div>
    </div>
  </div>
  );
};

export default FirstScreen;






