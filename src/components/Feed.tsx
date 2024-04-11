'use client'

import React, { useState, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase/firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';



import styles from '../styles/Feed.module.css';

type Post = {
  id: string; // Ensure this matches the type Firestore uses for document IDs
  userName: string;
  userProfilePic: string;
  mediaContent: string;
  description: string;
};
// Extend the FileWithPath type to include the preview URL
type FileWithPreview = FileWithPath & {
  preview: string;
  mediaContent?: string;
};

const Feed = () => {
  // Initialize the posts array with some dummy data
  const [posts, setPosts] = useState([
    {
      id: '1',
      userName: 'Artist One',
      userProfilePic: 'https://placehold.co/50x50',
      mediaContent: 'https://placehold.co/600x400',
      description: 'This is my latest artwork!',
    },
    {
      id: '2',
      userName: 'Artist Two',
      userProfilePic: 'https://placehold.co/50x50',
      mediaContent: 'https://placehold.co/600x400',
      description: 'Inspired by the beauty of nature.',
    },
  ]);

  // State to hold the preview URLs of the selected images
  const [filePreviews, setFilePreviews] = useState<FileWithPreview[]>([]);

  // // Function to handle file drop
  // const onDrop = (acceptedFiles: FileWithPath[]) => {
  //   // Create a preview URL for each file
  //   const previews: FileWithPreview[] = acceptedFiles.map(file => ({
  //     ...file,
  //     preview: URL.createObjectURL(file)
  //   }));

  //   // Update state to include the new previews
  //   setFilePreviews(previews);

  // };
  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0]; // Assuming you only handle one file for simplicity
    const storage = getStorage();
    const storageReference = storageRef(storage, `uploads/${file.name}`);
    uploadBytes(storageReference, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const previewWithMediaContent: FileWithPreview = {
          ...file,
          preview: URL.createObjectURL(file),
          mediaContent: downloadURL, // The actual URL obtained from Firebase Storage
        };
        setFilePreviews([previewWithMediaContent]); // This example only updates the first item for simplicity
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*' as any, // Using 'any' to bypass the type checking
  });

  // Clean up the previews URLs to avoid memory leaks
  useEffect(() => {
    return () => filePreviews.forEach(file => URL.revokeObjectURL(file.preview));
  }, [filePreviews]);

  const [user] = useAuthState(auth); // Get the current user
  const [postText, setPostText] = useState(''); // State for the post text

  const handlePost = async () => {
    if (!postText.trim()) return; // Simple validation
  
    const hashtags = postText.match(/#\w+/g) || []; // Extract hashtags from postText
    // Check if user is null or undefined before proceeding
    if (!user) {
      console.error("User is not logged in.");
      return; // Exit the function if there is no user logged in
    }
    const mediaContentUrl = filePreviews[0]?.mediaContent || 'DEFAULT_IMAGE_URL_OR_EMPTY_STRING';
  
    try {
     
      // The original line for adding a document to Firestore, capturing the reference
      const docRef = await addDoc(collection(db, 'posts'), {
        userId: user.uid,
        description: postText,
        mediaContent: mediaContentUrl, 
        hashtags,
        timestamp: new Date(), // Store the time the post was made
      });
  
      // Assuming you want to immediately reflect this post in your UI:
      const newPost = {
        id: docRef.id,
        userName: user.displayName || 'Anonymous', // Adjust 
        userProfilePic: '', // Adjust
        mediaContent: mediaContentUrl, // Adjust 
        description: postText,
      };
  
      // Update the local state to include the new post
      setPosts(currentPosts => [...currentPosts, newPost]);
  
      setPostText(''); // Clear the input after posting
      // Reset other states as necessary, e.g., clear selected images
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (

    <div className={styles.feedContainer}>
      <div className={styles.postingSection}>
        <div className={styles.previewContainer}>
          {filePreviews.map((file, index) => (
            <img key={index} src={file.preview} style={{ width: 50, height: 50 }} alt="Preview" />
          ))}
        </div>
        <input
        type="text"
        placeholder="Write a post"
        className={styles.postInput}
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
         />
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the images here ...</p> :
              <button className={styles.addButton}>Add media</button>
          }
        </div>
        <button className={styles.postButton} onClick={handlePost}>Post</button>
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
      ))
      }
    </div >
  );
};


export default Feed;
