'use client'

import React, { useState } from 'react';

import styles from '../styles/UserPortfolio.module.css';

const UserPortfolio = () => {
    // Initialize the posts array with some dummy data
    const [posts, setPosts] = useState([
        {
            id: 1,
            userName: 'Jane Doe',
            userProfilePic: 'https://placehold.co/50x50',
            mediaContent: 'https://placehold.co/600x400',
            description: 'An addition to my portfolio.',
        },
        {
            id: 2,
            userName: 'Jane Doe',
            userProfilePic: 'https://placehold.co/50x50',
            mediaContent: 'https://placehold.co/600x400',
            description: 'This is my best work so far!',
        },
    ]);

return (
    <div className={styles.feedContainer}>

        <div className={styles.postingSection}>
            <input type="text" placeholder="Write a post" className={styles.postInput} />
        </div>

        {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
                <div className={styles.postHeader}>
                    <img src={post.userProfilePic} alt="User" className={styles.profilePic} />
                    <div className={styles.userName}>{post.userName}</div>
                </div>
                <div className={styles.postDescription}>{post.description}</div>
                <img src={post.mediaContent} alt="Post Content" className={styles.postImage} />
            </div>
        ))}
    </div>
);
};


export default UserPortfolio;
