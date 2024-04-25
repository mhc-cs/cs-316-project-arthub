'use client'
import Image from 'next/image';
import FullLogoWhite from '../design/FullLogoWhite.png';
import { auth } from "@/firebase/firebaseConfig";
import styles from './page.module.css';
import { GoogleAuthProvider,  signInWithPopup } from 'firebase/auth';

export default function LogOut() {
       
  const signInWithGoogle = (isSignUp: boolean): void => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          if (isSignUp) {
            window.location.href = '/loginPage';  // Redirect new users to the login page for additional steps
          } else {
            window.location.href = '/homePage';  // Redirect existing users to the home page
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (

      <div className={styles.container}>

        <div className={styles.loginContainer}>
        <div className="box"></div>
        <Image src={FullLogoWhite} alt="Decorative icon" className={styles.BGPicture}/>

          <button onClick={() => signInWithGoogle(false)} className={styles.topBarButton}>
            BACK TO LOGIN
          </button>
        </div>

      </div>

    );
}