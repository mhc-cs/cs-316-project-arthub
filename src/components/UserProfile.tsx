'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/UserProfile.module.css';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import { UserData } from '../types/UserData'

export default function UserProfile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    }
  }, [user]);

  // Example Link to User's Connections Page - adjust as needed
  const connectionsLink = `/connections/${user?.uid}`;
  const hashtagsLink = `/hashtags/${user?.uid}`;

    return (
      <div className={styles.profileContainer}>
        {/* Conditionally render data if userData is not null */}
        {userData && (
          <>
            {/* <div className={styles.BGContainer}>
              <img src={userData.profileBGPictureUrl} alt="BG Profile" className={styles.profileBGPic}/>
              <div className={styles.profilePicContainer}>
                <img src={userData.profilePictureUrl} alt="User Profile" className={styles.profilePic}/>
              </div>
            </div> */}

            <img src={userData.profileBGPictureUrl} alt="BG Profile" className={styles.profileBGPic}/>

            <div className={styles.profileDetails}>

              <img src={userData.profilePictureUrl} alt="User Profile" className={styles.profilePic}/>

              <h2 className={styles.userName}>
                {user && (
                  <Link href={`/profilePage`}>
                    {userData.firstName} {userData.lastName}
                  </Link>
                )}
              </h2>
              {userData.pronouns && <p className={styles.userPronouns}>{userData.pronouns}</p>}
              {userData.creativeNiche && <p className={styles.userCreativeNiche}>{userData.creativeNiche}</p>}
              {userData.artistStatement && <p className={styles.userArtistStatement}>{userData.artistStatement}</p>}
            </div>
            <div className={styles.userStats}>
              <button className={styles.userButton}>
                <Link href={connectionsLink}>Connections</Link>
              </button>
              
              <button className={styles.userButton}>
                <Link href={hashtagsLink}>Hashtags</Link>
              </button>
            </div>
          </>
        )}
      </div>
    );
}
