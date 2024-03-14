'use client'

import React, { useState } from 'react';
import styles from './page.module.css';

import UserPortfolio from '../../components/UserPortfolio';
import UserFeed from '../../components/UserFeed';
import SearchBar from '../../components/SearchBar';
import UserProfile from '../../components/UserProfile';

import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ProfilePage() {

  const [activeView, setActiveView] = useState('Portfolio'); // Start with Portfolio


  return (
    <div className={styles.container}>

      <div className={styles.topBar}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <button className={styles.topBarButton}>
          <i className={`fas fa-user-friends ${styles.icon}`}></i> My Network
        </button>
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-message ${styles.icon}`}></i> Messages
        </button>
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-bell ${styles.icon}`}></i> Notifications
        </button>
      </div>

      <div className={styles.layoutContainer}>
        <aside className={styles.sidebar}>
          <UserProfile />
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
