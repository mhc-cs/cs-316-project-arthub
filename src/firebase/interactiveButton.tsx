// import React, { useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
// import firebaseConfig from './firebaseConfig';
// import { doc, setDoc, getFirestore } from 'firebase/firestore';

// // Initialize Firebase outside of the component to avoid re-initializations on re-renders
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore();

// function App() {
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, create or update the user document
//         const userDocRef = doc(db, 'users', user.uid);
//         setDoc(userDocRef, {
//           uid: user.uid,
//           firstName: 'Default First Name',
//           lastName: 'Default Last Name',
//           profilePictureUrl: 'Default Profile Picture URL',
//         }, { merge: true }); // Use merge: true to avoid overwriting existing fields
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, []);

//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         console.log(result);
//         // Redirect the user or show them the homepage
//         window.location.href = '/homePage';
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h1>Welcome to the App</h1>
//       <button onClick={signInWithGoogle}>Sign in with Google</button>
//     </div>
//   );
// }

// export default App;
