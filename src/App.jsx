import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase";

function AppLogoIcon({ className = "w-5 h-5", color = "#0D7FF2" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 147 127"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 86.6667C14.4444 86.6667 9.72222 84.7222 5.83333 80.8334C1.94444 76.9445 0 72.2222 0 66.6667C0 61.1111 1.94444 56.3889 5.83333 52.5C9.72222 48.6111 14.4444 46.6667 20 46.6667V33.3334C20 29.6667 21.3056 26.5278 23.9167 23.9167C26.5278 21.3056 29.6667 20 33.3333 20H53.3333C53.3333 14.4445 55.2778 9.72224 59.1667 5.83335C63.0556 1.94446 67.7778 1.52588e-05 73.3333 1.52588e-05C78.8889 1.52588e-05 83.6111 1.94446 87.5 5.83335C91.3889 9.72224 93.3333 14.4445 93.3333 20H113.333C117 20 120.139 21.3056 122.75 23.9167C125.361 26.5278 126.667 29.6667 126.667 33.3334V46.6667C132.222 46.6667 136.944 48.6111 140.833 52.5C144.722 56.3889 146.667 61.1111 146.667 66.6667C146.667 72.2222 144.722 76.9445 140.833 80.8334C136.944 84.7222 132.222 86.6667 126.667 86.6667V113.333C126.667 117 125.361 120.139 122.75 122.75C120.139 125.361 117 126.667 113.333 126.667H33.3333C29.6667 126.667 26.5278 125.361 23.9167 122.75C21.3056 120.139 20 117 20 113.333V86.6667ZM53.3333 73.3334C53.3333 73.3334 54.0278 73.3334 55.4167 73.3334C56.8056 73.3334 58.4722 72.3611 60.4167 70.4167C62.3611 68.4722 63.3333 66.1111 63.3333 63.3334C63.3333 60.5556 62.3611 58.1945 60.4167 56.25C58.4722 54.3056 56.1111 53.3334 53.3333 53.3334C50.5556 53.3334 48.1944 54.3056 46.25 56.25C44.3056 58.1945 43.3333 60.5556 43.3333 63.3334C43.3333 66.1111 44.3056 68.4722 46.25 70.4167C48.1944 72.3611 50.5556 73.3334 53.3333 73.3334ZM93.3333 73.3334C93.3333 73.3334 94.0278 73.3334 95.4167 73.3334C96.8056 73.3334 98.4722 72.3611 100.417 70.4167C102.361 68.4722 103.333 66.1111 103.333 63.3334C103.333 60.5556 102.361 58.1945 100.417 56.25C98.4722 54.3056 96.1111 53.3334 93.3333 53.3334C90.5556 53.3334 88.1945 54.3056 86.25 56.25C84.3056 58.1945 83.3333 60.5556 83.3333 63.3334C83.3333 66.1111 84.3056 68.4722 86.25 70.4167C88.1945 72.3611 90.5556 73.3334 93.3333 73.3334ZM46.6667 100H100V86.6667H46.6667V100ZM33.3333 113.333H113.333V33.3334H33.3333V113.333Z"
        fill={color}
      />
    </svg>
  );
}

function LearningCard({
  title,
  description,
  borderColor,
  softColor,
  buttonColor,
  buttonLabel,
  locked = false,
}) {
  return (
    <article
      className="relative w-full max-w-75 h-116 rounded-[48px] border-4 bg-white p-8 flex flex-col items-center"
      style={{ borderColor }}
    >
      <div
        className="w-48 h-48 rounded-full flex items-center justify-center"
        style={{ backgroundColor: softColor }}
      >
        <AppLogoIcon className="w-20 h-20" color={borderColor} />
      </div>

      <h3 className="mt-6 text-4xl leading-9 font-extrabold text-slate-900 text-center">{title}</h3>
      <p className="mt-2 text-base leading-6 font-medium text-slate-500 text-center max-w-55">
        {description}
      </p>

      <button
        className="mt-8 h-13 px-8 rounded-full text-lg font-bold"
        style={{ backgroundColor: buttonColor, color: buttonColor === "#FFD93D" ? "#0F172A" : "#FFFFFF" }}
      >
        {buttonLabel}
      </button>

      {locked ? (
        <div className="absolute inset-1 rounded-[44px] bg-slate-900/80 flex flex-col items-center justify-center px-6">
          <div className="w-15 h-18 flex items-center justify-center text-white text-5xl">🔒</div>
          <p className="mt-4 text-white text-lg leading-5.5 font-bold text-center max-w-57">
            Completa la sección de Piezas para desbloquear este nivel
          </p>
        </div>
      ) : null}
    </article>
  );
}

function LoginPage({ onLogin, status }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Lexend'] flex flex-col">
      <header className="h-20 px-6 md:px-20 xl:px-40 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0D7FF2] flex items-center justify-center">
            <AppLogoIcon className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold tracking-[-0.5px]">Easy PC</h2>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-120 flex flex-col items-center">
          <div className="relative w-80 h-80 rounded-full border-8 border-[#0D7FF20D] bg-white shadow-[0_20px_25px_-5px_rgba(13,127,242,0.10),0_8px_10px_-6px_rgba(13,127,242,0.10)] flex items-center justify-center">
            <AppLogoIcon className="w-36.75 h-31.75" />
            <span className="absolute right-10 top-10 text-yellow-400 text-xl">✦</span>
            <span className="absolute left-8 bottom-24 text-blue-300 text-sm">✧</span>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <span className="w-3 h-3 rounded-full bg-pink-300" />
              <span className="w-3 h-3 rounded-full bg-pink-300" />
            </div>
          </div>

          <h1 className="mt-10 text-4xl leading-10 font-bold text-center text-slate-900">
            ¡Hola! Vamos a aprender
          </h1>
          <p className="mt-4 text-lg leading-7 text-center text-slate-600">
            Pulsa el botón azul para comenzar tu aventura
          </p>

          <button
            className="mt-10 w-full max-w-96 h-16 rounded-full bg-[#0D7FF2] text-white font-bold text-xl tracking-[0.5px] shadow-[0_10px_15px_-3px_rgba(13,127,242,0.30),0_4px_6px_-4px_rgba(13,127,242,0.30)] hover:bg-[#0b70d6] transition flex items-center justify-center gap-4"
            onClick={onLogin}
          >
            <span className="w-9 h-9 rounded-full bg-white text-[#4285F4] flex items-center justify-center font-bold">
              G
            </span>
            Entrar con Google
          </button>

          <div className="mt-12 rounded-full bg-[#0D7FF21A] px-6 py-2 flex items-center gap-2">
            <span className="text-[#0D7FF2] text-base font-medium">Toca el botón para jugar</span>
          </div>

          <p className="mt-6 text-sm text-center text-slate-500">Estado: {status}</p>
        </div>
      </main>

      <footer className="h-21 px-4 flex items-center justify-center opacity-50">
        <div className="flex items-center gap-2 text-xs text-black">
          <AppLogoIcon className="w-3 h-3" color="#000000" />
          <span>De ingenieros para ingenieros</span>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#ffffff] p-6 md:p-10 lg:p-15 font-['Lexend']">
      <div className="w-full min-h-[calc(100vh-120px)] bg-white border border-white/10 rounded-sm flex flex-col">
        <header className="h-24 px-6 md:px-16 xl:px-40 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0D7FF21A] flex items-center justify-center">
              <AppLogoIcon className="w-4 h-4" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-[-0.6px] text-slate-900">Easy PC</h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-full bg-slate-100 text-slate-600">⚙️</button>
            <button
              className="w-12 h-12 rounded-full bg-slate-100 text-slate-600"
              onClick={onLogout}
              title="Cerrar sesión"
            >
              ⎋
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 pt-10 pb-20">
          <section className="mb-16">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#0D7FF233] p-1">
                <img
                  src={user?.photoURL || "https://api.dicebear.com/9.x/adventurer/svg?seed=Explorer"}
                  alt="Avatar"
                  className="w-full h-full rounded-full bg-slate-200"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-[30px] leading-9 font-black tracking-[-0.75px] text-slate-900">
                  ¡Hola, Explorador!
                </h1>
                <p className="text-lg leading-7 font-medium text-slate-500">¿Qué quieres aprender hoy?</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            <LearningCard
              title="Limpieza"
              description="¡Deja tu PC brillante y como nueva!"
              borderColor="#FFD93D"
              softColor="rgba(255, 217, 61, 0.2)"
              buttonColor="#FFD93D"
              buttonLabel="Empezar"
              locked
            />

            <LearningCard
              title="Piezas"
              description="Conoce los secretos dentro de tu equipo."
              borderColor="#6BCB77"
              softColor="rgba(107, 203, 119, 0.2)"
              buttonColor="#6BCB77"
              buttonLabel="Explorar"
            />

            <LearningCard
              title="Arma tu PC"
              description="¡Conviértete en un experto constructor!"
              borderColor="#FF6B6B"
              softColor="rgba(255, 107, 107, 0.2)"
              buttonColor="#FF6B6B"
              buttonLabel="¡A construir!"
              locked
            />
          </section>

          <section className="mt-16 w-full max-w-2xl mx-auto rounded-[48px] border-2 border-slate-100 bg-slate-50 p-6 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-[#0D7FF2] flex items-center justify-center text-white">🏆</div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-base font-bold">
                <span className="text-slate-700">Tu progreso</span>
                <span className="text-[#0D7FF2]">60%</span>
              </div>
              <div className="mt-2 h-4 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-[60%] rounded-full bg-[#0D7FF2]" />
              </div>
            </div>
          </section>
        </main>

        <footer className="py-8 text-center text-base font-medium text-slate-400">
          Hecho con ❤️ para pequeños ingenieros
        </footer>
      </div>
    </div>
  );
}

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
    return <p className="p-6 text-center font-['Lexend']">Cargando sesión...</p>;
  }

  return user ? (
    <HomePage user={user} onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleGoogleLogin} status={status} />
  );
}

export default App;
