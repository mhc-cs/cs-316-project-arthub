import {  GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // Adjust the path to your Firebase config


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

export default signInWithGoogle