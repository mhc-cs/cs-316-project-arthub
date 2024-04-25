import { auth } from "@/firebase/firebaseConfig";
import { signOut, User } from "firebase/auth";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import  "./app.css";
import NavBar from '../../components/NavBar';





interface ChatProps {
  user: User;
}

export default function Page(props: ChatProps) {
  return (
    <div>
      <div>
        <NavBar/>
      </div>
    <div style={{ height: "100vh" }}>
      <PrettyChatWindow
        projectId={"a50b188a-cb5f-4ff8-960d-60c8a6cf7ffe"}
        username={props.user.email || ""}
        secret={props.user.uid}
        style={{ height: "100%" }}

      />

   </div>   
    </div>
  );
}