"use client"
import { useState } from "react";

import AuthPage from "../loginPage/MainLoginPage";
import ChatPage from "./ChatsPage";
import Loading from "../loginPage/Loading";
import { auth } from "@/firebase/firebaseConfig";
import { User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>();
  auth.onAuthStateChanged((user) => setUser(user));

  if (user === undefined) {
    return <Loading />;
  } else if (user === null) {
    return <AuthPage />;
  } else {
    return <ChatPage user={user} />;
  }
}