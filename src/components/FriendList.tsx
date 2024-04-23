import styles from '../styles/FriendList.module.css';
import FriendItem from './FriendItem';

type Friend = {
    id: string;
    name: string;
    profilePicUrl: string;
};

type FriendListProps = {
    friends: Friend[];
};

const FriendList = ({ friends }: FriendListProps) => {
    return (
        <div className={styles.friendList}>
            {friends.map(friend => (
                <FriendItem key={friend.id} name={friend.name} profilePicUrl={friend.profilePicUrl} />
            ))}
        </div>
    );
};

export default FriendList;
