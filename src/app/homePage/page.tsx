import styles from './page.module.css';

import Feed from '../../components/Feed';
import SearchBar from '../../components/SearchBar';
import UserProfile from '../../components/UserProfile';

import Image from 'next/image';
import LogoWhite from '../design/LogoWhite.png';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Link from 'next/link';

export default function homePage() {

  return (
    <div className={styles.container}>
    
      <div className={styles.topBar}>
      <Link href="/homePage">
        <Image src={LogoWhite} alt="Decorative icon" className={styles.logo}/>
      </Link>

      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>

      <Link href="/networkPage">
        <button className={styles.topBarButton}>
          <i className={`fas fa-user-friends ${styles.icon}`}></i> Network</button>
      </Link>

        <Link href="/messagesPage">
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-message ${styles.icon}`}></i> Messages</button>
        </Link>

        <Link href="/notificationsPage">
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-bell ${styles.icon}`}></i> Notifications</button>
        </Link>

        <Link href="/logoutPage">
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-sign-out ${styles.icon}`}></i> Logout</button>
        </Link>

  

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