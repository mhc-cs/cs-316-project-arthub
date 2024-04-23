
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"; // TODO: getapp
import { getAuth } from "firebase/auth";
// TODO: 2 line 
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"; // Import the missing useAuthState function




import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyCEryBC4VbxiZ2TNaEa0EVfzp9a-BoHKXI",
  authDomain: "arthub-6ebed.firebaseapp.com",
  projectId: "arthub-6ebed",
  storageBucket: "arthub-6ebed.appspot.com",
  messagingSenderId: "51859385118",
  appId: "1:51859385118:web:caae9a3ddb599ea7ec370f"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);


// Move the code using the useAuthState hook inside a React function component

function GetUser() {
  const user = useAuthState(auth);
  // Rest of the code...
}

const firestore = getFirestore(app);

export { auth, db, app, firestore, GetUser, firebaseConfig};
