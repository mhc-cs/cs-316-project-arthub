//import Image from 'next/image';
"use client"
import styles from '@/page.module.css';
import Feed from '@/components/Feed';
import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';

import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
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
          <header className={styles.header}>
          </header>

          <section className={styles.content}>
            <ArtistFeed />
          </section>

        </div>
      </div>
    </div>
  );
}
