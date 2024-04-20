'use client'
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from '../../firebase/firebaseConfig'; 
import { UserData } from '../../types/UserData'  
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const LoginPage: React.FC = () => {
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
  const [user, loading, error] = useAuthState(auth);
  const [profileCreated, setProfileCreated] = useState(false);

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

  useEffect(() => {
    if (profileCreated) {
      window.location.href = '/homePage'; // Redirect to the homepage
    }
  }, [profileCreated]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setFormData({
      ...formData,
      dateOfBirth: date
    });
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
    if (age < 18) {
      alert("You must be at least 18 years old to sign up.");
      return;
    }

    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
          await updateDoc(userDocRef, {
              ...formData  
          });
          setProfileCreated(true);
      } catch (error) {
          console.error("Error updating profile:", error);
          alert('Failed to update profile.');
      }
  } else {
      alert('No user logged in.');
  }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label className={styles.formLabel}>First Name:</label>
        <input type="text" name="firstName" className={styles.formInput} value={formData.firstName} onChange={handleChange} />

        <label className={styles.formLabel}>Last Name:</label>
        <input type="text" name="lastName" className={styles.formInput} value={formData.lastName} onChange={handleChange} />

        <label className={styles.formLabel}>Date of Birth:</label>
        <input type="date" name="dateOfBirth" className={styles.formInput} onChange={handleDateChange} />

        <label className={styles.formLabel}>Profile Photo (URL):</label>
        <input type="file" id="profilePicture" name="profilePicture" className={styles.fileInput} onChange={handleImageChange} />

        <label className={styles.formLabel}>Gender:</label>
        <select name="gender" className={styles.formSelect} onChange={handleChange} value={formData.gender}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className={styles.formLabel}>Pronouns:</label>
        <input type="text" name="pronouns" className={styles.formInput} value={formData.pronouns} onChange={handleChange} />

        <label className={styles.formLabel}>Artist Statement:</label>
        <textarea name="artistStatement" className={styles.formTextarea} value={formData.artistStatement} onChange={handleChange} />

        <label className={styles.formLabel}>Creative Niche:</label>
        <input type="text" name="creativeNiche" className={styles.formInput} value={formData.creativeNiche} onChange={handleChange} />

        <label className={styles.formLabel}>City:</label>
        <input type="text" name="city" className={styles.formInput} value={formData.city} onChange={handleChange} />

        <button type="submit" className={styles.formButton}>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;