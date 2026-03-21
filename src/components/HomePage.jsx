import AppLogoIcon from "./AppLogoIcon";
import LearningCard from "./LearningCard";

export default function HomePage({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#ffffff] p-6 md:p-10 lg:p-15 font-['Lexend']">
      <div className="w-full min-h-[calc(100vh-120px)] bg-white border border-white/10 rounded-sm flex flex-col">
        <header className="h-24 px-6 md:px-16 xl:px-40 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0D7FF21A] flex items-center justify-center">
              <img src="/Logo.svg" alt="Easy PC Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-[-0.6px] text-slate-900">EasyPC</h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">⚙️</button>
            <button
              className="px-4 h-12 rounded-full bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center gap-2 shadow-sm"
              onClick={onLogout}
              title="Cerrar sesión"
            >
              <span className="text-xl">⎋</span>
              <span className="hidden md:inline">Cerrar Sesión</span>
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
                  className="w-full h-full rounded-full bg-slate-200 shadow-sm"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-[30px] leading-9 font-black tracking-[-0.75px] text-slate-900">
                  ¡Hola, {user?.displayName?.split(' ')[0] || 'Explorador'}!
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

          <section className="mt-16 w-full max-w-2xl mx-auto rounded-[48px] border-2 border-slate-100 bg-slate-50 p-6 flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#0D7FF2] flex items-center justify-center text-white text-2xl shadow-lg">🏆</div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-base font-bold">
                <span className="text-slate-700">Tu progreso</span>
                <span className="text-[#0D7FF2]">60%</span>
              </div>
              <div className="mt-2 h-4 rounded-full bg-slate-200 overflow-hidden shadow-inner">
                <div className="h-full w-[60%] rounded-full bg-[#0D7FF2] transition-all duration-500" />
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
