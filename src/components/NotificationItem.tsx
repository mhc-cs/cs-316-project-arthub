import styles from '../styles/NotificationItem.module.css';

type NotificationItemProps = {
    message: string;
    timestamp: string;
};

const NotificationItem = ({ message, timestamp }: NotificationItemProps) => {
    return (
        <div className={styles.notificationItem}>
            <p className={styles.message}>{message}</p>
            <p className={styles.timestamp}>{timestamp}</p>
        </div>
    );
};

export default NotificationItem;
