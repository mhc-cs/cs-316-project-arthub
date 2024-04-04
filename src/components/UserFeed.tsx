'use client'

import React, { useState, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import styles from '../styles/UserFeed.module.css';

// Extend the FileWithPath type to include the preview URL
type FileWithPreview = FileWithPath & {
    preview: string;
  };

const UserFeed = () => {
    // Initialize the posts array with some dummy data
    const [posts, setPosts] = useState([
        {
            id: 1,
            userName: 'Jane Doe',
            userProfilePic: 'https://placehold.co/50x50',
            mediaContent: 'https://placehold.co/600x400',
            description: 'A new collaboration with @JohnDoe!',
        },
        {
            id: 2,
            userName: 'Jane Doe',
            userProfilePic: 'https://placehold.co/50x50',
            mediaContent: 'https://placehold.co/600x400',
            description: 'This is what I did in my free time.',
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
                <div className={styles.previewContainer}>
                    {filePreviews.map((file, index) => (
                        <img key={index} src={file.preview} style={{ width: 50, height: 50 }} alt="Preview" />
                    ))}
                </div>
                <input type="text" placeholder="Write a post" className={styles.postInput} />
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the images here ...</p> :
                            <button className={styles.addButton}>Add media</button>
                    }
                </div>
                <button className={styles.postButton}>Post</button>
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


export default UserFeed;
