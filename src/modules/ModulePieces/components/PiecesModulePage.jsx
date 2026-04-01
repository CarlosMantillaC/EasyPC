import ComponentsIcon from "./icons/ComponentsIcon";
import LockIcon from "../../../components/LockIcon";
import BrainIcon from "./icons/BrainIcon";
import MemoryIcon from "./icons/MemoryIcon";
import HeartIcon from "./icons/HeartIcon";
import StorageIcon from "./icons/StorageIcon";
import TrophyIcon from "../../../shared/components/TrophyIcon";
import { getUserProgress, updateProgress } from "../../../shared/services";
import { getLevelStatus, getLevelSubtitle, getProgressPercentage, getLevelConfig, MODULE_INFO, PROGRESS_MESSAGES } from "../services";
import { useState, useEffect } from "react";
import UserProfileButton from "../../../shared/components/UserProfileButton";
import ProgressBar from "../../../shared/components/ProgressBar";
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
        className={`relative bg-white border-4 border-[#0D7FF2] rounded-3xl p-4.25 pb-10 shadow-lg transition-all duration-500 group cursor-pointer hover:-translate-y-4 hover:shadow-xl active:scale-95`}
      >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D7FF2] text-white text-[10px] font-bold tracking-[1px] uppercase rounded-full px-4 py-1 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
          Actual
        </span>

        <div
          className={`h-56 rounded-3xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110 bg-[#0D7FF2]/10`}
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
      className={`relative rounded-3xl p-4 pb-10 transition-all duration-500 shadow-sm group ${
        isLocked
          ? "bg-white/80 border-2 border-[#CBD5E1] opacity-75 cursor-not-allowed"
          : "bg-white border-2 border-[#0D7FF2] shadow-md cursor-pointer hover:-translate-y-4 hover:shadow-lg active:scale-95"
      }`}
    >
      <div
        className={`h-56 rounded-3xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110 ${
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
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center">
            <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
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
        // Fallback básico para permitir jugar nivel 1 si falla Firestore
        setUserProgress({
          userId: user.uid,
          currentLevel: 1,
          completedLevels: [],
          unlockedLevels: [1],
          totalScore: 0
        });
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
      // Actualizar estado local incluso si falla Firebase
      setUserProgress(prev => {
        if (!prev) return prev;
        const newCompleted = [...new Set([...prev.completedLevels, levelNumber])];
        return {
          ...prev,
          completedLevels: newCompleted,
          currentLevel: Math.max(prev.currentLevel, levelNumber + 1),
          unlockedLevels: [...new Set([...prev.unlockedLevels, levelNumber + 1])]
        };
      });
      setCurrentLevel(null);
    }
  };

  // Función para manejar el clic en una tarjeta de nivel
  const handleLevelClick = (levelNumber) => {
    const levelStatus = getLevelStatus(levelNumber, userProgress);
    console.log(`Intentando iniciar nivel ${levelNumber}. Estado actual:`, levelStatus);
    console.log("Progreso del usuario:", userProgress);
    
    // Permitir jugar si está activo, completado o simplemente desbloqueado
    if (levelStatus.active || levelStatus.completed || levelStatus.variant === "unlocked") {
      console.log(`Iniciando nivel ${levelNumber}...`);
      setCurrentLevel(levelNumber);
    } else {
      console.log(`El nivel ${levelNumber} está bloqueado y no puede iniciarse.`);
    }
  };

  // Renderizado dinámico de niveles
  const renderLevel = () => {
    switch (currentLevel) {
      case 1:
        return (
          <Level1Brain 
            user={user}
            onBack={() => setCurrentLevel(null)}
            onLevelComplete={handleLevelComplete}
          />
        );
      // Aquí se pueden añadir más niveles conforme se desarrollen
      default:
        return null;
    }
  };

  // Si hay un nivel activo, mostrar el componente del nivel
  if (currentLevel !== null) {
    const levelContent = renderLevel();
    if (levelContent) return levelContent;
    // Si el nivel no tiene componente todavía, volvemos a la lista
    setCurrentLevel(null);
  }

  if (loading) {
    return (
      <div className="min-h-300 bg-white flex items-center justify-center">
        <div className="text-lg font-medium text-slate-600">Cargando progreso...</div>
      </div>
    );
  }
  return (
    <div className="min-h-300 bg-white flex flex-col">
      <div className="w-full min-h-300 overflow-y-auto flex justify-center px-6 lg:px-1 xl:px-4 py-5">
        <div className="w-full max-w-360 min-h-288">
          <header className="pb-6">
            <div className="px-4 py-3.5 flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <ComponentsIcon className="w-9 h-11" color="#0D7FF2" />
                <div className="flex flex-col">
                  <h2 className="text-2xl leading-7.5 tracking-[-0.6px] font-bold text-slate-900">Componentes</h2>
                  <p className="text-sm leading-5 text-slate-600">¡Descubre las partes del computador!</p>
                </div>
                
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
            <div className="px-4 mt-4 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrophyIcon width={16} height={16} color="#0D7FF2" />
                  <p className="text-base leading-6 font-semibold text-slate-900">Progreso</p>
                </div>
                {userProgress && (
                  <p className="text-base leading-6 font-semibold text-blue-600">
                    {(() => {
                      const progressPercentage = getProgressPercentage(userProgress);
                      if (progressPercentage === 0) return PROGRESS_MESSAGES.start;
                      if (progressPercentage === 100) return PROGRESS_MESSAGES.complete;
                      return PROGRESS_MESSAGES.default;
                    })()}
                  </p>
                )}
              </div>
              <ProgressBar progress={userProgress ? getProgressPercentage(userProgress) : 0} />
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
                  </div>
                );
              })}
            </div>
          </section>

          <section className="h-20 flex items-start justify-center py-18">
            <button
              type="button"
              onClick={onBack}
              className="h-14 min-w-60 max-w-120 rounded-3xl bg-[#0D7FF2] text-white px-8 flex items-center justify-center gap-3 cursor-pointer hover:bg-[#0D7FF2]/90 hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold text-lg"
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
