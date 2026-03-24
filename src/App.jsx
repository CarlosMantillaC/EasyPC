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
import { PiecesModulePage } from "./modules/ModulePieces";
import Layout from "./shared/components/Layout";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("No autenticado");
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Estado de autenticación cambiado:", currentUser);
      console.log("Photo URL:", currentUser?.photoURL);
      console.log("Display Name:", currentUser?.displayName);
      
      // FORZAR RECARGA DE USUARIO SI NO HAY FOTO
      if (currentUser && !currentUser.photoURL) {
        console.log("USUARIO SIN FOTO - INTENTANDO RECARGAR DATOS");
        currentUser.reload().then(() => {
          console.log("Usuario recargado:", currentUser);
          console.log("Photo URL después de recargar:", currentUser.photoURL);
        }).catch(error => {
          console.error("Error recargando usuario:", error);
        });
      }
      
      setUser(currentUser);
      setStatus(currentUser ? "Sesión activa" : "No autenticado");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    
    // Forzar la obtención de la foto de perfil con alta calidad
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({
      'prompt': 'select_account',
      'access_type': 'offline'
    });

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
      console.log("Photo URL disponible:", result.user?.photoURL);
      console.log("Photo URL completo:", result.user?.photoURL);
      
      // Verificar que tenemos la URL de la foto
      if (result.user?.photoURL) {
        // Asegurarnos de que la URL tenga el tamaño correcto
        const photoUrl = result.user.photoURL.includes('sz=') 
          ? result.user.photoURL 
          : `${result.user.photoURL}?sz=200`;
        console.log("URL de foto procesada:", photoUrl);
      }
      
      setStatus("Login con Google exitoso");
    } catch (error) {
      console.error("Error en login con Google:", error);
      setStatus(`ERROR: ${error.code} - ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setStatus("Sesión cerrada");
      setCurrentView("home");
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
    <Layout
      user={user}
      onLogout={handleLogout}
      showHeader={user ? currentView !== "pieces" : false}
    >
      {user ? (
        currentView === "pieces" ? (
          <PiecesModulePage user={user} onBack={() => setCurrentView("home")} />
        ) : (
          <HomePage user={user} onOpenPieces={() => setCurrentView("pieces")} />
        )
      ) : (
        <LoginPage onLogin={handleGoogleLogin} status={status} />
      )}
    </Layout>
  );
}

export default App;
