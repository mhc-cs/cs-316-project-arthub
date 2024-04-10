"use client";

import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { updateOnlineStatus } from "@/utils/db";
import { set } from "firebase/database";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const clear = async () => {
    try {
      setCurrentUser(null);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    if (currentUser) {
      setIsLoading(false);
      return;
    }
    console.log("aa");
    const userDoc = await getDoc(doc(db, "users", user.uid));
    setCurrentUser(userDoc.data());
    setIsLoading(false);
    updateOnlineStatus(user.uid, true); // Call updateOnlineStatus function
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const docRef = doc(db, "users", result.user.uid);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setCurrentUser(docSnap.data());
          router.push("/");
        } else {
          setDoc(doc(db, "users", result.user.uid), {
            email: result.user.email,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            uid: result.user.uid,
            role: "user",
            createdAt: new Date(),
            isVerified: result.user.emailVerified,
            isActive: false,
            hideMe: false,
            isOnline: false,
          }).then(() => {
            setIsLoading(false)
            router.push("/");
          }
          );
        }
      });
    });
  };

  const logout = () => {
    signOut(auth)
    router.push("/login");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      authStateChanged(user);
    });
    return unsubscribe;
  }, []); 

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        logout,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;// import {createContext, useState} from "react";
// import 

// const AuthContext = createContext();
// export const AuthProvider = ({children}) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const value = {
//         currentUser,
//         login() {
//             setCurrentUser({name: "bob"});
//         },
//         logout() {
//             setCurrentUser(null);
//         }
//     };
//     }
//     const login = () => setUser({id: 1, username: "bob"});
//     const logout = () => setUser(null);
//     return (
//         <AuthContext.Provider value={{user, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     );
// }