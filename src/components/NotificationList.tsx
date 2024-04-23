import styles from '../styles/NotificationList.module.css';
import NotificationItem from './NotificationItem';

type Notification = {
    id: string;
    message: string;
    timestamp: string;
};

type NotificationListProps = {
    notifications: Notification[];
};

const NotificationList = ({ notifications }: NotificationListProps) => {
    return (
        <div className={styles.notificationList}>
            {notifications.map(notification => (
                <NotificationItem key={notification.id} message={notification.message} timestamp={notification.timestamp} />
            ))}
        </div>
    );
};

export default NotificationList;
