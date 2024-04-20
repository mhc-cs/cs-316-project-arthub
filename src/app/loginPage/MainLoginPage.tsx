import { auth } from "@/firebase/firebaseConfig";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

export default function AuthPage() {
  const onClick = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  return (



  <div className="hero min-h-screen" style={{backgroundImage: './public/logo.jpg'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
    <h1 className="text-5xl font-bold">Hello there ✨</h1>
          <p className="py-6">Create Collaborate Connect</p>
          <button onClick={onClick} className="btn btn-outline btn-warning">SIGN UP</button>

          <button onClick={onClick} className="btn btn-outline btn-warning" style={{ marginLeft: '10px' }}>LOGIN</button>
    </div>
  </div>
</div>

  );
}