import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import SearchBar from './SearchBar';


const navBar = () => {
    return (
   
    
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
    );
    }   
    
export default navBar;