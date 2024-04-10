// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"; // TODO: getapp
import { getAuth } from "firebase/auth";
// TODO: 2 line 
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEryBC4VbxiZ2TNaEa0EVfzp9a-BoHKXI",
  authDomain: "arthub-6ebed.firebaseapp.com",
  projectId: "arthub-6ebed",
  storageBucket: "arthub-6ebed.appspot.com",
  messagingSenderId: "51859385118",
  appId: "1:51859385118:web:caae9a3ddb599ea7ec370f"
};


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

//TODO: this paragraph 
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);