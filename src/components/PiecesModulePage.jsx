import ComponentsIcon from "./ComponentsIcon";
import LockIcon from "./LockIcon";
import BrainIcon from "./BrainIcon";
import MemoryIcon from "./MemoryIcon";
import HeartIcon from "./HeartIcon";
import StorageIcon from "./StorageIcon";
import { getUserProgress, updateProgress } from "../services/firestoreService";
import { getLevelStatus, getLevelSubtitle, getProgressPercentage, getProgressMessage, getLevelConfig } from "../services/levelUtils";
import { MODULE_INFO } from "../services/constants/levels";
import { useState, useEffect } from "react";
import UserProfileButton from "../shared/components/UserProfileButton";
import Level1Brain from "./levels/Level1Brain";

function LevelCard({
  title,
  subtitle,
  variant,
  icon,
  active = false,
  completed = false,
  onClick,
}) {
  const isLocked = variant === "locked";
  const CardIcon = icon ?? ComponentsIcon;

  if (active) {
    return (
      <article
        onClick={onClick}
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
      onClick={onClick}
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
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(null);

  // Cargar progreso del usuario usando el servicio limpio
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const progress = await getUserProgress(user.uid);
        setUserProgress(progress);
      } catch (error) {
        console.error("Error cargando progreso:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProgress();
  }, [user]);

  // Función para actualizar progreso usando el servicio
  const handleLevelComplete = async (levelNumber) => {
    if (!user) return;
    
    try {
      const updatedProgress = await updateProgress(user.uid, levelNumber);
      setUserProgress(updatedProgress);
      setCurrentLevel(null); // Volver a la vista de niveles después de completar
    } catch (error) {
      console.error("Error actualizando progreso:", error);
    }
  };

  // Función para manejar el clic en una tarjeta de nivel
  const handleLevelClick = (levelNumber) => {
    const levelStatus = getLevelStatus(levelNumber, userProgress);
    if (levelStatus.active || levelStatus.completed) {
      setCurrentLevel(levelNumber);
    }
  };

  // Si hay un nivel activo, mostrar el componente del nivel
  if (currentLevel === 1) {
    return (
      <Level1Brain 
        user={user}
        onBack={() => setCurrentLevel(null)}
        onLevelComplete={handleLevelComplete}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-300 bg-[#F5F7F8] flex items-center justify-center">
        <div className="text-lg font-medium text-slate-600">Cargando progreso...</div>
      </div>
    );
  }
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
                <UserProfileButton 
                  user={user}
                  size="medium"
                  showBorder={false}
                  fallbackType="icon"
                />
              </div>
            </div>
          </header>

          <section className="pb-6">
            <div className="bg-white border border-[#F1F5F9] rounded-[48px] px-4 pt-3.75 pb-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <h1 className="text-[30px] leading-9.5 font-bold text-slate-900">{MODULE_INFO.name}</h1>
              <p className="text-base leading-6 font-normal text-slate-500">{MODULE_INFO.description}</p>
            </div>
          </section>

          <section className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: MODULE_INFO.totalLevels }, (_, index) => {
                const levelNumber = index + 1;
                const levelConfig = getLevelConfig(levelNumber);
                const levelStatus = getLevelStatus(levelNumber, userProgress);
                const IconComponent = levelConfig.icon === "BrainIcon" ? BrainIcon : 
                                   levelConfig.icon === "MemoryIcon" ? MemoryIcon :
                                   levelConfig.icon === "HeartIcon" ? HeartIcon : StorageIcon;

                return (
                  <div key={levelNumber} className="space-y-2">
                    <LevelCard
                      title={levelConfig.title}
                      subtitle={getLevelSubtitle(levelNumber, userProgress)}
                      variant={levelStatus.variant}
                      active={levelStatus.active}
                      completed={levelStatus.completed}
                      icon={IconComponent}
                      onClick={() => handleLevelClick(levelNumber)}
                    />
                    {levelStatus.active && (
                      <button
                        onClick={() => handleLevelClick(levelNumber)}
                        className="w-full mt-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        🧪 Completar Nivel {levelNumber} (Prueba)
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="pb-8">
            <div className="bg-white border border-[#F1F5F9] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ComponentsIcon className="w-6 h-7" color="#0D7FF2" />
                  <span className="text-base leading-6 font-semibold text-slate-900">Progreso del módulo</span>
                </div>
                {userProgress && (
                  <div className="text-right">
                    <span className="text-sm leading-5 font-medium text-slate-500">
                      {userProgress.completedLevels.length} de {MODULE_INFO.totalLevels} niveles completados
                    </span>
                    <p className="text-xs leading-4 font-normal text-slate-400">
                      {getProgressMessage(userProgress)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 h-4 rounded-full bg-[#F1F5F9] overflow-hidden">
                {userProgress && (
                  <div 
                    className="h-full bg-[#0D7FF2] transition-all duration-500" 
                    style={{ width: `${getProgressPercentage(userProgress)}%` }}
                  />
                )}
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
