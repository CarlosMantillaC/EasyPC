import { useState, useEffect } from "react";
import AssemblyIcon from "../../../components/AssemblyIcon";
import CpuIcon from "../../../components/CpuIcon";
import MemoryIcon from "../../ModulePieces/components/icons/MemoryIcon";
import StorageIcon from "../../ModulePieces/components/icons/StorageIcon";
import ComponentsIcon from "../../../components/ComponentsIcon";
import UserProfileButton from "../../../shared/components/UserProfileButton";
import ProgressBar from "../../../shared/components/ProgressBar";
import LockIcon from "../../../components/LockIcon";
import { getUserProgress, updateProgress } from "../../../shared/services";
import { getLevelStatus, getLevelSubtitle, getProgressPercentage, getLevelConfig, MODULE_INFO } from "../services";

// Importar todos los niveles
import Level1Motherboard from "./levels/Level1Motherboard";
import Level2Ram from "./levels/Level2Ram";
import Level3Storage from "./levels/Level3Storage";
import Level4Full from "./levels/Level4Full";
import Level5Chasis from "./levels/Level5Chasis";

function LevelCard({
  title,
  subtitle,
  variant,
  icon: CardIcon,
  active = false,
  completed = false,
  onClick,
}) {
  const isLocked = variant === "locked";

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

export default function AssemblyModulePage({ user, onBack }) {
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(null);

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
        console.error("Error cargando progreso en Armando:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserProgress();
  }, [user]);

  const handleLevelComplete = async (levelNumber) => {
    if (!user) return;
    try {
      const updatedProgress = await updateProgress(user.uid, `assembly_level_${levelNumber}`);
      setUserProgress(updatedProgress);
      setCurrentLevel(null);
    } catch (error) {
      console.error("Error actualizando progreso:", error);
    }
  };

  const handleLevelClick = (levelNumber) => {
    const levelStatus = getLevelStatus(levelNumber, userProgress);
    if (levelStatus.active || levelStatus.completed) {
      setCurrentLevel(levelNumber);
    }
  };

  const renderLevel = () => {
    const props = { onBack: () => setCurrentLevel(null), onLevelComplete: () => handleLevelComplete(currentLevel) };
    switch(currentLevel) {
      case 1: return <Level1Motherboard {...props} />;
      case 2: return <Level2Ram {...props} />;
      case 3: return <Level3Storage {...props} />;
      case 4: return <Level4Full {...props} />;
      case 5: return <Level5Chasis {...props} />;
      default: return null;
    }
  };

  if (currentLevel) return renderLevel();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg font-medium text-slate-600">Cargando progreso...</div>
      </div>
    );
  }

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "CpuIcon": return CpuIcon;
      case "MemoryIcon": return MemoryIcon;
      case "StorageIcon": return StorageIcon;
      default: return ComponentsIcon;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full min-h-screen overflow-y-auto flex justify-center px-6 lg:px-1 xl:px-4 py-5">
        <div className="w-full max-w-360 min-h-288">
          <header className="pb-6">
            <div className="h-18.25 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AssemblyIcon className="w-9 h-11" color="#0D7FF2" />
                <h2 className="text-2xl leading-7.5 tracking-[-0.6px] font-bold text-slate-900">Armando</h2>
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
              <p className="text-base leading-6 font-semibold text-slate-900 mb-4">Progreso</p>
              <ProgressBar progress={userProgress ? getProgressPercentage(userProgress) : 0} />
            </div>

            <div className="bg-white border-2 border-[#E2E8F0] rounded-3xl px-4 pt-3.75 pb-4 shadow-md">
              <h1 className="text-[30px] leading-9.5 font-bold text-slate-900">{MODULE_INFO.name}</h1>
              <p className="text-base leading-6 font-normal text-slate-500">{MODULE_INFO.description}</p>
            </div>
          </section>

          <section className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: MODULE_INFO.totalLevels }, (_, index) => {
                const levelNumber = index + 1;
                const levelConfig = getLevelConfig(levelNumber);
                const levelStatus = getLevelStatus(levelNumber, userProgress);
                const IconComponent = getIconComponent(levelConfig.icon);

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
