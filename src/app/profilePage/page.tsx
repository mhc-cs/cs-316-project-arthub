'use client'

import React, { useState } from 'react';
import styles from './page.module.css';

import UserPortfolio from '../../components/UserPortfolio';
import UserFeed from '../../components/UserFeed';
import SearchBar from '../../components/SearchBar';
import UserProfile from '../../components/UserProfile';

// import { signIn } from 'next-auth/react';

import UserProfileUpdate from '../../components/UserProfileUpdate';


import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

export default function ProfilePage() {

  const [activeView, setActiveView] = useState('Portfolio'); // Start with Portfolio



  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.container}>

      <div className={styles.topBar}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>


        <Link href="/networkPage">
          <button className={styles.topBarButton}>
            <i className={`fas fa-user-friends ${styles.icon}`}></i> My Network
          </button>
        </Link>

        <Link href="/messagesPage">
          <button className={styles.topBarButton}>
            <i className={`fa-solid fa-message ${styles.icon}`}></i> Messages
          </button>
        </Link>

        <Link href="/notificationsPage">
          <button className={styles.topBarButton}>
            <i className={`fa-solid fa-bell ${styles.icon}`}></i> Notifications
          </button>
        </Link>

        <Link href="/logOutPage">
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-sign-out ${styles.icon}`}></i> LogOut
        </button>
        </Link>

      </div>

      <div className={styles.layoutContainer}>
        <aside className={styles.sidebar}>
          {/* Toggle between UserProfile and UserProfileUpdate based on isEditing */}
          {isEditing ? <UserProfileUpdate /> : <UserProfile />}
          <button onClick={() => setIsEditing(!isEditing)} className={styles.editProfileButton}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </aside>

        <div className={styles.mainContent}>

          {activeView === 'Portfolio' ? <UserPortfolio /> : < UserFeed />}
          <div className={styles.buttonsContainer}>
            <button
              className={`${styles.button} ${activeView === 'Portfolio' ? styles.buttonHighlighted : ''}`}
              onClick={() => setActiveView('Portfolio')}>
              Portfolio
            </button>
            <button
              className={`${styles.button} ${activeView === 'Feed' ? styles.buttonHighlighted : ''}`}
              onClick={() => setActiveView('Feed')}>
              Feed
            </button>
          </div>



        </div>
      </div>
    </div>
  );
}
