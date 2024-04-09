import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseConfig from '../firebase/firebaseConfig'; // Adjust the path to your Firebase config

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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