// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEryBC4VbxiZ2TNaEa0EVfzp9a-BoHKXI",
  authDomain: "arthub-6ebed.firebaseapp.com",
  projectId: "arthub-6ebed",
  storageBucket: "arthub-6ebed.appspot.com",
  messagingSenderId: "51859385118",
  appId: "1:51859385118:web:caae9a3ddb599ea7ec370f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth }; // Export both Firestore and Authentication

export default firebaseConfig;