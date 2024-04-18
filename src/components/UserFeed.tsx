'use client'

import React, { useState, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase/firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { query, onSnapshot } from "firebase/firestore";



import styles from '../styles/Feed.module.css';

type Post = {
  id: string;
  userName: string;
  userProfilePic: string;
  mediaContent: string;
  description: string;
};
type FileWithPreview = {
  file: File; // Explicit File object
  preview: string; // URL for previewing the image
  mediaContent?: string; // URL from storage
};


const UserFeed = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [filePreviews, setFilePreviews] = useState<FileWithPreview[]>([]);
  const [postText, setPostText] = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(db, "posts")); // Define a query against the collection.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        userName: doc.data().userName,
        userProfilePic: doc.data().userProfilePic,
        mediaContent: doc.data().mediaContent,
        description: doc.data().description,
        timestamp: doc.data().timestamp?.toDate().toString() // Handle date conversion if necessary
      }));
      setPosts(postsArray); // Set posts in state
    });
  
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const uploadImage = (file: File, userId: string, postId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, `posts/${userId}/${postId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    const filePreviewData: FileWithPreview[] = acceptedFiles.map(file => ({
      file: file,
      preview: URL.createObjectURL(file),  // Adds the 'preview' property
    }));

    setFilePreviews(filePreviewData);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/png': ['.png'],
    }
  });

  const handlePost = async () => {
    if (!postText.trim() || !user) return;

    try {
      // First, add an entry to Firestore to get the postId
      const newPostRef = collection(db, 'posts');
      const docRef = await addDoc(newPostRef, {
        userId: user.uid,
        description: postText,
        mediaContent: '', // Placeholder for URL
        hashtags: postText.match(/#\w+/g) || [],
        timestamp: new Date(),
      });

      // Upload the image and update the post with the image URL
      const imageFile = filePreviews[0].file; // Directly accessing the File object
      let imageUrl = 'DEFAULT_IMAGE_URL_OR_EMPTY_STRING';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, user.uid, docRef.id);
        await updateDoc(docRef, { mediaContent: imageUrl }); // Update the document with the image URL
      }

      // Update local state and UI after successful post creation
      setPosts([...posts, {
        id: docRef.id,
        userName: user.displayName || 'Anonymous',
        userProfilePic: '',
        mediaContent: imageUrl,
        description: postText,
      }]);

      setPostText(''); // Clear the input after posting
      setFilePreviews([]); // Clear the file previews after posting
    } catch (error) {
      console.error("Error adding document or uploading image: ", error);
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
            <div className={styles.userName}> {post.userName}</div>
          </div>
          <div className={styles.postDescription}>{post.description}</div>
          <img src={post.mediaContent} alt="Post Content" className={styles.postImage} />
        </div>
      ))
      }
    </div >
  );
};


export default UserFeed;
