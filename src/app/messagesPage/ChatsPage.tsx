import { auth } from "@/firebase/firebaseConfig";
import { signOut, User } from "firebase/auth";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import NavBar from '../../components/NavBar';
import Link from 'next/link';
import styles from '../../styles/NavBar.module.css';


import  "./app.css";
interface ChatProps {
  user: User;
}

export default function Page(props: ChatProps) {
  return (
<div>
  <div>
    <NavBar/>
    <Link href="/homePage">
        <button className={styles.topBarButton}>
          <i className={`fas fa-user-home ${styles.icon}`}></i> HomePage
        </button>
      </Link>
  </div>
     <div className="chat-container">
    <div style={{ height: "100vh" }}> 
      <PrettyChatWindow
        projectId={"a50b188a-cb5f-4ff8-960d-60c8a6cf7ffe"}
        username={props.user.displayName || ""}
        secret={props.user.uid}
        style={{ height: "100%" }}
      />
    </div>
  </div>
</div>
  );
}