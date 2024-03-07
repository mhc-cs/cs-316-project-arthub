'use client'

import React, { useState } from 'react';
import styles from './UserProfile.module.css'; 
import Link from 'next/link';


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

  return (
    <div className={styles.profileContainer}>
      <img src={user.backgroundPic} alt="Background" className={styles.backgroundPic} />
      <img src={user.userProfilePic} alt="User Profile" className={styles.profilePic} />

      
      <button className={styles.userButton}>
      <h2 className={styles.userName}>
        <Link href={`/profile/${user.userName.toLowerCase().replace(/\s+/g, '-')}`}>
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
