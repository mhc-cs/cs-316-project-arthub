'use client'

import React, { useState, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import styles from '../styles/Feed.module.css';

// Extend the FileWithPath type to include the preview URL
type FileWithPreview = FileWithPath & {
  preview: string;
};

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

  // State to hold the preview URLs of the selected images
  const [filePreviews, setFilePreviews] = useState<FileWithPreview[]>([]);

  // Function to handle file drop
  const onDrop = (acceptedFiles: FileWithPath[]) => {
    // Create a preview URL for each file
  const previews: FileWithPreview[] = acceptedFiles.map(file => ({
    ...file,
    preview: URL.createObjectURL(file)
  }));

  // Update state to include the new previews
  setFilePreviews(previews);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*' as any, // Using 'any' to bypass the type checking
  });

  // Clean up the previews URLs to avoid memory leaks
  useEffect(() => {
    return () => filePreviews.forEach(file => URL.revokeObjectURL(file.preview));
  }, [filePreviews]);
  

  return (
    <div className={styles.feedContainer}>

      <div className={styles.postingSection}>
        <input type="text" placeholder="Write a post" className={styles.postInput} />
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the images here ...</p> :
              <button className={styles.addButton}>Add image</button>
          }
        </div>
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
