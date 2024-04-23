import styles from './page.module.css';
import NotificationList from '../../components/NotificationList';
import SearchBar from '../../components/SearchBar';
import UserProfile from '../../components/UserProfile';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

const notificationsPage = () => {
    const notifications = [
        { id: '1', message: 'John Doe liked your post.', timestamp: '10 mins ago' },
        { id: '2', message: 'Jane Smith commented on your photo.', timestamp: '1 hour ago' },
        // More dummy notifications here
    ];

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
            </div>
            <div className={styles.layoutContainer}>
                <aside className={styles.sidebar}>
                    <UserProfile />
                </aside>
                <div className={styles.mainContent}>
                    <section className={styles.content}>
                        <NotificationList notifications={notifications} />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default notificationsPage;
