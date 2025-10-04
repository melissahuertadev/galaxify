import { useState } from 'react'
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from "firebase/auth";
import './App.css'

function App() {
  const [user, setUser] = useState<import("firebase/auth").User | null>(null)
  
  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  }

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  }

  return (
    <div style={{padding: "2rem"}}>
      <h1>Galixify</h1>
      {user ? (
        <div>
          <p>Bienvenidx, {user.displayName}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={login}>Iniciar sesión con Google</button>
      )}
    </div>
  );
}

export default App
