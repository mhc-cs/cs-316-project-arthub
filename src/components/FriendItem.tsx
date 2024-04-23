import styles from '../styles/FriendItem.module.css';

type FriendItemProps = {
    name: string;
    profilePicUrl: string;
};

const FriendItem = ({ name, profilePicUrl }: FriendItemProps) => {
    return (
        <div className={styles.friendItem}>
            <img src={profilePicUrl} alt={name} className={styles.profilePic} />
            <span className={styles.friendName}>{name}</span>
        </div>
    );
};

export default FriendItem;
