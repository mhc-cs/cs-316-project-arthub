'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/UserProfile.module.css';
import Link from 'next/link';
import router, { useRouter } from 'next/router';


export default function UserProfile() {
  // Initialize state with dummy user information
  const [user, setUser] = useState({
    userName: 'Jane Doe',
    userProfilePic: 'https://placehold.co/100x100',
    backgroundPic: 'https://placehold.co/500x300',
    userBio: 'Art enthusiast and creator. Exploring the world through the lens of art.',
    userLocation: 'New York, USA',
    userConnections: 150,
    userFollowedHashtags: 5,
    connectionsLink: '/connections/jane-doe',
    hashtagsLink: '/hashtags/jane-doe',
  });

  // const [isClient, setIsClient] = useState(false);
  // useEffect(() => {
  //   // Once the component mounts, we're definitely client-side
  //   setIsClient(true);
  // }, []);

  // const router = useRouter();
  // const [isRouterReady, setIsRouterReady] = useState(false);
  // useEffect(() => {
  //   // This check ensures that we only consider the router "ready" if we're on the client side
  //   // and the router's asPath property is defined, indicating it has been mounted
  //   if (router.asPath !== undefined) {
  //     setIsRouterReady(true);
  //   }
  // }, [router.asPath]);

  // const handleOnClick = () => {
  //   if (isRouterReady) {
  //     const userNameSlug = user.userName.toLowerCase().replace(/\s+/g, '-');
  //     router.push(`/profilePage/${userNameSlug}`);
  //   }
  // };
  //
  ///${user.userName.toLowerCase().replace(/\s+/g, '-')}`
//<Link href="../profilePage/jane-doe">
  return (
    <div className={styles.profileContainer}>
      <img src={user.backgroundPic} alt="Background" className={styles.backgroundPic} />
      <img src={user.userProfilePic} alt="User Profile" className={styles.profilePic} />


      <button className={styles.userButton}>
        <h2 className={styles.userName}>

        <Link href="/profilePage">
         {user.userName}
         </Link>
        </h2>
      </button>

      <p className={styles.userBio}>{user.userBio}</p>
      <p className={styles.userLocation}>{user.userLocation}</p>

      <div className={styles.userStats}>
        <button className={styles.userButton}>
          <Link href={user.connectionsLink} className={styles.userConnections}>
            Connections <span className={styles.statValue}>{user.userConnections}</span>
          </Link>
        </button>
        <button className={styles.userButton}>
          <Link href={user.hashtagsLink} className={styles.userFollowedHashtags}>
            Followed Hashtags <span className={styles.statValue}>{user.userFollowedHashtags}</span>
          </Link>
        </button>
      </div>
    </div>
  );
}
