'use client'

import React, { useState, useEffect } from 'react';

import styles from '../styles/Feed.module.css';

const Feed = () => {
  // Initialize the posts array with some dummy data
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: 'Artist One',
      userProfilePic: 'https://placehold.co/50x50',
      mediaContent: 'https://placehold.co/600x400',
      description: 'This is my latest artwork!',
    },
    {
      id: 2,
      userName: 'Artist Two',
      userProfilePic: 'https://placehold.co/50x50',
      mediaContent: 'https://placehold.co/600x400',
      description: 'Inspired by the beauty of nature.',
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


export default Feed;
