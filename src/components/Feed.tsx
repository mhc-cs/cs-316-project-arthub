'use client'

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase/firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { query, onSnapshot } from "firebase/firestore";
import { getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from '../styles/Feed.module.css';

type Post = {
  id: string;
  userName: string;
  userProfilePic: string;
  mediaContent: string;
  description: string;
  likes?: string[]; // Array of user IDs who liked the post
  comments?: { userId: string; userName: string; comment: string; timestamp: string }[]; // Array of comments
};
type FileWithPreview = {
  file: File; // Explicit File object
  preview: string; // URL for previewing the image
  mediaContent?: string; // URL from storage
};

const Feed = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [filePreviews, setFilePreviews] = useState<FileWithPreview[]>([]);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {

    const q = query(collection(db, "posts")); // Define a query against the collection.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userName: doc.data().userName,
          userProfilePic: doc.data().userProfilePic,
          mediaContent: doc.data().mediaContent,
          description: doc.data().description,
          timestamp: doc.data().timestamp?.toDate().toString(),
          likes: data.likes || [],
          comments: data.comments || [],
        }
      });
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
      // Fetch user data to get profile picture URL
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        console.error("No user data available");
        return;
      }
      const userData = userDocSnap.data();
      const userProfilePic = userData.profilePictureUrl || 'DEFAULT_IMAGE_URL'; // Fallback to a default image if none is found
      const userName = `${userData.firstName} ${userData.lastName}`; // Construct full name
      // Add an entry to Firestore to get the postId
      const newPostRef = collection(db, 'posts');
      const docRef = await addDoc(newPostRef, {
        userId: user.uid,
        userName: userName,
        userProfilePic: userProfilePic,
        description: postText,
        mediaContent: '', // Placeholder for URL
        hashtags: postText.match(/#\w+/g) || [],
        timestamp: new Date(),
        likes: [],
        comments: []
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
        userName: userName,
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

  const toggleLike = async (postId: string) => {
    if (!user) return;
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const likes = postSnap.data().likes || [];
      if (likes.includes(user.uid)) {
        // User already liked this post, so remove their like
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid)
        });
      } else {
        // Add a new like from this user
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid)
        });
      }
    }
  };
  const addComment = async (postId: string, commentText: string) => {
    if (!user || !commentText.trim()) return;
    try {
      // Directly fetch user data before adding the comment
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.error("No user data available");
        return;
      }

      const userData = userDocSnap.data();
      const newComment = {
        userName: `${userData.firstName} ${userData.lastName}`,
        comment: commentText,
        timestamp: new Date().toISOString()
      };

      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
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
              <button className={styles.addButton}>
                <i className={`fa-solid fa-image ${styles.icon}`}></i></button>
              
          }
        </div>
        <button className={styles.postButton} onClick={handlePost}>
        <i className={`far fa-plus-circle ${styles.icon}`}></i> Post</button>
      </div>


      {posts.map((post) => (
        <div key={post.id} className={styles.postItem}>
          <div className={styles.postHeader}>
            <img src={post.userProfilePic} alt="User" className={styles.profilePic} />
            <div className={styles.userName}> {post.userName}</div>
          </div>
          <div className={styles.postDescription}>{post.description}</div>
          <img src={post.mediaContent} alt="Post Content" className={styles.postImage} />

          <div className={styles.interactions}>
            <button className={styles.likeButton} onClick={() => toggleLike(post.id)}>
              <i className={`fa-solid fa-heart ${styles.icon2}`}></i> Like ({post.likes?.length || 0})
            </button>

            <div className={styles.commentsContainer}>

              {post.comments?.map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <div className={styles.commentContent}>
                    <span className={styles.commentUser}>{comment.userName}:</span>
                    <span className={styles.commentText}>{comment.comment}</span>
                  </div>
                </div>
              ))}

              <form onSubmit={(e) => {
                e.preventDefault();
                addComment(post.id, commentText);
                setCommentText('');
              }} className={styles.commentForm}>

                <input type="text" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} className={styles.commentInput} />
                <button type="submit" className={styles.commentButton}> <i className={`fa-solid fa-comment ${styles.icon}`}></i>
                  </button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Feed;
