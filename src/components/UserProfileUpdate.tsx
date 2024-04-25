import React, { useState, useEffect } from 'react';
import styles from '../styles/UserProfileUpdate.module.css'; 

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from '../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

import { UserData } from '../types/UserData'

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

const UserProfileUpdate: React.FC = () => {
  const [user, loading, error] = useAuthState(auth); // useAuthState also provides loading and error states you can use
  const [formData, setFormData] = useState<UserData>({
    uid: auth.currentUser?.uid || '', // Ensuring UID is set, consider handling cases where it is not
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    profilePictureUrl: '',
    gender: '',
    pronouns: '',
    artistStatement: '',
    creativeNiche: '',
    city: '',
    work: '',
    education: ''
  });

  const [userData, setUserData] = useState<UserData | null>(null);

  // Use useEffect to monitor and log changes
  useEffect(() => {
    console.log(`Current profile picture URL: ${formData.profilePictureUrl}`);
    // Additional actions based on the change can also be placed here
  }, [formData.profilePictureUrl]); // Dependency array to trigger the effect when formData.profilePictureUrl changes

  // Fetch user data on component mount and user change
  useEffect(() => {
    if (user) { // Only attempt to fetch if `user` is not null
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
          setFormData(docSnap.data() as UserData); // Initialize form data with fetched user data
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 && user) {
        const file = event.target.files[0];
        const fileRef = storageRef(storage, `profilePictures/${user.uid}`);

        try {
            await uploadBytes(fileRef, file);
            const photoURL = await getDownloadURL(fileRef);
            setFormData(prevState => ({
                ...prevState,
                profilePictureUrl: photoURL  // Ensure the new URL is set in formData
            }));
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert('Failed to upload profile picture.');
        }
    } else if (!user) {
        alert('User is not logged in.');
    }
};

  // Handle form submission
  const handleSaveChanges = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user && user.uid) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userDocRef, {
                ...formData  
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Failed to update profile.');
        }
    } else {
        alert('No user logged in.');
    }
}; 

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>Error: {error.message}</p>; // Display error state

  return (
    <div className={styles.window}>
      <header className={styles.header}>
        <h1>Edit Profile</h1>
      </header>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSaveChanges}>

          <div className={styles.inputGroup}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" className={styles.textInput} value={formData.firstName} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" className={styles.textInput} value={formData.lastName} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="pronouns">Pronouns:</label>
            <input type="text" id="pronouns" name="pronouns" className={styles.textInput} value={formData.pronouns} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input type="file" id="profilePicture" name="profilePicture" className={styles.fileInput} onChange={handleImageChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="artistStatement">Artist Statement:</label>
            <input type="text" name="artistStatement" className={styles.textInput} value={formData.artistStatement} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="creativeNiche">Creative Niche:</label>
            <input type="text" name="creativeNiche" className={styles.textInput} value={formData.creativeNiche} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="city">City:</label>
            <input type="text" name="city" className={styles.textInput} value={formData.city} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="work">Work:</label>
            <input type="text" name="work" className={styles.textInput} value={formData.work} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="education">Education:</label>
            <input type="text" name="education" className={styles.textInput} value={formData.education} onChange={handleInputChange} />
          </div>

          <footer className={styles.footer}>
            <button type="submit" className={styles.button}>Save Changes</button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default UserProfileUpdate;