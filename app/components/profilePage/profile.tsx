// pages/profile.js or pages/profile.tsx
import styles from './profile.module.css';
import UserBox from './UserBox';

export default function Profile() {
  return (
    <div className={styles.container}>
    
      <div className={styles.topBar}>
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
        <UserBox />
      </aside>
    </div>
  </div>  
  );
}


