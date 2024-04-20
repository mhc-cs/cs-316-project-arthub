import { auth } from "@/firebase/firebaseConfig";
import { signOut, User } from "firebase/auth";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import style from "./page.module.css";
interface ChatProps {
  user: User;
}

export default function Page(props: ChatProps) {
  return (
    <div style={{ height: "100vh"}}>
      <button className="btn"  onClick={() => signOut(auth)}>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      Sign Out
    </button>
      {/* <button className="btn btn-active btn-ghost"  onClick={() => signOut(auth)}>Sign Out </button> */}

      <PrettyChatWindow
        projectId={"a50b188a-cb5f-4ff8-960d-60c8a6cf7ffe"}
        username={props.user.email || ""}
        secret={props.user.uid}
        style={{ height: "100%" }}
      />
    </div>
  );
}