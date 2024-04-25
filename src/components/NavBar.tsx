import styles from '../styles/NavBar.module.css';

import Image from 'next/image';
import Link from 'next/link';
import LogoWhite from '../app/design/LogoWhite.png';
import SearchBar from './SearchBar';

const navBar = () => {
    return (

    
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
  
    )
}

export default navBar;