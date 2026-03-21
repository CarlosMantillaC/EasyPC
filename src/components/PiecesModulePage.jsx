import ComponentsIcon from "./ComponentsIcon";
import LockIcon from "./LockIcon";
import BrainIcon from "./BrainIcon";
import MemoryIcon from "./MemoryIcon";
import HeartIcon from "./HeartIcon";
import StorageIcon from "./StorageIcon";

function UserIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="#0D7FF2"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="4" stroke="#0D7FF2" strokeWidth="1.6" />
    </svg>
  );
}

function LevelCard({
  title,
  subtitle,
  variant,
  icon,
  active = false,
  completed = false,
}) {
  const isLocked = variant === "locked";
  const CardIcon = icon ?? ComponentsIcon;

  if (active) {
    return (
      <article
      className={`relative bg-white border-4 border-[#0D7FF2] rounded-[48px] p-4.25 pb-10 shadow-[0_0_0_4px_rgba(13,127,242,0.2),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] transition-all duration-500 shadow-sm group cursor-pointer hover:-translate-y-4 hover:shadow-2xl active:scale-95`}
    >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D7FF2] text-white text-[10px] font-bold tracking-[1px] uppercase rounded-full px-4 py-1 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
          Actual
        </span>

        <div
          className={`h-56 rounded-4xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-[#0D7FF2]/10`}
        >
          <CardIcon className="w-18 h-21.5" color="#0D7FF2" />
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="text-[18px] leading-7 font-bold text-slate-900">{title}</h3>
          <p className="text-sm leading-5 text-[#0D7FF2] uppercase tracking-[0.7px] font-semibold">{subtitle}</p>
        </div>

      </article>
    );
  }

  return (
    <article
      className={`relative rounded-[48px] p-4 pb-10 transition-all duration-500 shadow-sm group ${
        isLocked
          ? "bg-white/80 border border-[#E2E8F0] opacity-75 cursor-not-allowed"
          : "bg-white border-2 border-[#0D7FF2] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] cursor-pointer hover:-translate-y-4 hover:shadow-2xl active:scale-95"
      }`}
    >
      <div
        className={`h-56 rounded-4xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
          isLocked ? "bg-[#E2E8F0]" : "bg-[#0D7FF2]/10"
        }`}
      >
        {isLocked ? (
          <CardIcon className="w-18 h-21.5" color="#94A3B8" />
        ) : (
          <CardIcon className="w-18 h-21.5" color="#0D7FF2" />
        )}

        {isLocked ? (
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
            <LockIcon className="w-9 h-11" color="#475569" />
          </div>
        ) : null}

        {completed ? (
          <div className="absolute top-2 right-2 w-5.5 h-7 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs font-bold">
            ✓
          </div>
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className={`text-[18px] leading-7 font-bold ${isLocked ? "text-slate-500" : "text-slate-900"}`}>{title}</h3>
        <p
          className={`text-sm leading-5 ${
            isLocked ? "text-slate-400 font-normal" : completed ? "text-[#0D7FF2] uppercase tracking-[0.7px] font-semibold" : "text-slate-600 font-medium"
          }`}
        >
          {subtitle}
        </p>
      </div>

    </article>
  );
}

export default function PiecesModulePage({ user, onBack }) {
  return (
    <div className="min-h-300 bg-[#F5F7F8] flex flex-col">
      <div className="w-full min-h-300 overflow-y-auto flex justify-center px-6 lg:px-1 xl:px-4 py-5">
        <div className="w-full max-w-360 min-h-288">
          <header className="pb-6">
            <div className="h-18.25 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ComponentsIcon className="w-9 h-11" color="#0D7FF2" />
                <h2 className="text-2xl leading-7.5 tracking-[-0.6px] font-bold text-slate-900">Piezas</h2>
              </div>

              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-[#0D7FF2]/10 flex items-center justify-center" type="button" aria-label="Perfil">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Perfil" className="w-8 h-8 rounded-full" />
                  ) : (
                    <UserIcon />
                  )}
                </button>
              </div>
            </div>
          </header>

          <section className="pb-6">
            <div className="bg-white border border-[#F1F5F9] rounded-[48px] px-4 pt-3.75 pb-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <h1 className="text-[30px] leading-9.5 font-bold text-slate-900">Niveles: Conoce las Piezas</h1>
              <p className="text-base leading-6 font-normal text-slate-500">Explora los componentes de tu computadora y conviértete en un experto!</p>
            </div>
          </section>

          <section className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <LevelCard
                title="Nivel 1: El Cerebro"
                subtitle="¡Juega ahora!"
                variant="active"
                active
                icon={BrainIcon}
              />

              <LevelCard
                title="Nivel 2: La Memoria"
                subtitle="Bloqueado"
                variant="locked"
                icon={MemoryIcon}
              />

              <LevelCard 
                title="Nivel 3: El Corazón" 
                subtitle="Bloqueado" 
                variant="locked" 
                icon={HeartIcon}
              />
              <LevelCard 
                title="Nivel 4: El Almacén" 
                subtitle="Bloqueado" 
                variant="locked" 
                icon={StorageIcon}
              />
            </div>
          </section>

          <section className="pb-8">
            <div className="bg-white border border-[#F1F5F9] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ComponentsIcon className="w-6 h-7" color="#0D7FF2" />
                  <span className="text-base leading-6 font-semibold text-slate-900">Progreso del módulo</span>
                </div>
                <span className="text-sm leading-5 font-bold text-[#0D7FF2]">25%</span>
              </div>

              <div className="mt-4 h-4 rounded-full bg-[#F1F5F9] overflow-hidden">
                <div className="h-full w-1/4 bg-[#0D7FF2]" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm leading-5 font-medium text-slate-500">1 de 4 niveles completados</span>
                <span className="text-xs leading-4 font-normal text-slate-400">¡Sigue así, vas por buen camino!</span>
              </div>
            </div>
          </section>

          <section className="h-20 flex items-start justify-center py-3">
            <button
              type="button"
              onClick={onBack}
              className="h-14 min-w-60 max-w-120 rounded-full bg-[#0D7FF2] text-white px-8 flex items-center justify-center gap-3 cursor-pointer hover:bg-[#0D7FF2]/90 hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold text-lg"
            >
              <span className="text-[22px]">←</span>
              <span>Volver al Menú Principal</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
