import { useState } from 'react'
import { loginWithGoogle } from './auth';
import Dashboard from './Dashboard';
import Login from './Login'
import './App.css'

type User = {
  uid: string;
  email: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = async () => {
    const loggedUser = await loginWithGoogle();
    setUser({
      uid: loggedUser.uid,
      email: loggedUser.email || "",
      role: loggedUser.role
    });
  }

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App
