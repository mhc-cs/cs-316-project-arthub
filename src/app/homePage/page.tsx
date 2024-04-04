import styles from './page.module.css';

import Feed from '../../components/Feed';
import SearchBar from '../../components/SearchBar';
import UserProfile from '../../components/UserProfile';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Link from 'next/link';

export default function homePage() {
  return (
    <div className={styles.container}>
    
      <div className={styles.topBar}>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
        <button className={styles.topBarButton}>
          <i className={`fas fa-user-friends ${styles.icon}`}></i> My Network
        </button>

        <Link href="/messagesPage">
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-message ${styles.icon}`}></i> Messages
        </button>
        </Link>

        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-bell ${styles.icon}`}></i> Notifications
        </button>
      </div>
  
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <UserProfile />
      </aside>
    <div className={styles.mainContent}>

      <section className={styles.content}>
        <Feed />
      </section>

      </div>
    </div>
  </div>  
  );
}