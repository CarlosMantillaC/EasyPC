import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Layout from "./shared/components/Layout";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("No autenticado");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setStatus(currentUser ? "Sesión activa" : "No autenticado");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      setStatus("Login con Google exitoso");
    } catch (error) {
      setStatus(`ERROR: ${error.code} - ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setStatus("Sesión cerrada");
    } catch (error) {
      setStatus(`ERROR: ${error.code} - ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Lexend'] bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0D7FF2] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium animate-pulse">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      {user ? (
        <HomePage user={user} />
      ) : (
        <LoginPage onLogin={handleGoogleLogin} status={status} />
      )}
    </Layout>
  );
}

export default App;
