import React, { useState, useEffect } from "react";
import AssemblyIcon from "../../../components/AssemblyIcon";
import CpuIcon from "../../../components/CpuIcon";
import MemoryIcon from "../../ModulePieces/components/icons/MemoryIcon";
import StorageIcon from "../../ModulePieces/components/icons/StorageIcon";
import ComponentsIcon from "../../../components/ComponentsIcon";
import UserProfileButton from "../../../shared/components/UserProfileButton";
import ProgressBar from "../../../shared/components/ProgressBar";
import LockIcon from "../../../components/LockIcon";
import { getUserProgress, updateProgress } from "../../../shared/services";
import { getLevelStatus, getLevelSubtitle, getLevelConfig, MODULE_INFO } from "../services";

// Importar niveles
import Level1Motherboard from "./levels/Level1Motherboard";
import Level2Ram from "./levels/Level2Ram";
import Level3Storage from "./levels/Level3Storage";
import Level4Full from "./levels/Level4Power";
import Level5Chasis from "./levels/Level5Chasis";

import SuccessModal from "./SuccessModal";
import Mhablando from "../../../assets/images/Mascota/Mhablando.png";
import Mdurmiendo from "../../../assets/images/Mascota/Mdurmiendo.png";
import MbienHecho from "../../../assets/images/Mascota/MbienHecho.png";
import Mreparando from "../../../assets/images/Mascota/Mreparando.png";

// Herramientas decorativas
import Destornillador from "../../../assets/images/KitMaterials/Destornillador.png";
import PastaTermica from "../../../assets/images/KitMaterials/PastaTermica.png";
import Cepillo from "../../../assets/images/KitMaterials/Cepillo.png";
import LimpiaContacto from "../../../assets/images/KitMaterials/LimpiaContacto.png";


/**
 * COMPONENTE DE TARJETA ESTILO CARPETA TÉCNICA (LIMPIO / SISTEMA ORIGINAL)
 */
function LevelCard({
  title,
  subtitle,
  variant,
  icon: CardIcon,
  active = false,
  completed = false,
  onClick,
  levelNumber
}) {
  const isLocked = variant === "locked";

  if (isLocked) {
    return (
      <article className="relative bg-white/80 border-2 border-slate-200 rounded-[24px] p-4 opacity-60 cursor-not-allowed shadow-sm grayscale">
        <div className="h-48 rounded-[20px] flex items-center justify-center relative overflow-hidden bg-slate-50 border border-slate-100">
          <CardIcon className="w-16 h-16 opacity-20" color="#94A3B8" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            <LockIcon className="w-8 h-10" color="#475569" />
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-lg font-bold text-slate-400 uppercase tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{subtitle}</p>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={onClick}
      className={`relative rounded-[24px] p-4 transition-all duration-300 group cursor-pointer border-4 bg-white
        ${active 
          ? 'border-[#0D7FF2] shadow-2xl shadow-blue-100 -translate-y-3' 
          : 'border-slate-100 hover:border-[#0D7FF2]/40 hover:-translate-y-2 hover:shadow-xl active:scale-95'
        }
      `}
    >
      {/* Pestaña de carpeta (Folder Tab) */}
      <div className={`absolute -top-3 left-6 h-6 px-4 rounded-t-lg flex items-center justify-center text-[10px] font-black uppercase tracking-[1px] transition-colors
        ${active ? 'bg-[#0D7FF2] text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-[#0D7FF2]/20 group-hover:text-[#0D7FF2]'}
      `}>
        Misión 0{levelNumber}
      </div>

      {/* Check de Completado */}
      {completed && (
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-white">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Contenedor de Icono */}
      <div
        className={`h-48 rounded-[20px] flex items-center justify-center relative overflow-hidden transition-all duration-500
          ${active ? 'bg-blue-50' : completed ? 'bg-green-50' : 'bg-slate-50'}
        `}
      >
        {/* Fondo de cuadrícula suave */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#0D7FF2 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        <CardIcon 
          className={`w-20 h-20 transition-transform duration-500 group-hover:scale-110
            ${active ? 'drop-shadow-md' : 'opacity-90'}
          `} 
          color={active ? "#0D7FF2" : completed ? "#22C55E" : "#0D7FF2"} 
        />
      </div>

      {/* Textos del nivel */}
      <div className="mt-4 space-y-1 text-center md:text-left">
        <h3 className={`text-lg font-black tracking-tight leading-tight uppercase
          ${active ? 'text-slate-900' : 'text-slate-700'}
        `}>
          {title}
        </h3>
        <p className={`text-[11px] font-black uppercase tracking-[1px]
          ${completed ? 'text-green-500' : 'text-[#0D7FF2]'}
        `}>
          {subtitle === "¡Listo!" ? "¡LISTO PARA USAR!" : subtitle}
        </p>
      </div>

      {/* Detalles técnicos decorativos */}
      <div className="absolute bottom-2 right-4 text-[8px] font-bold text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        PC_SYS_0{levelNumber}
      </div>
    </article>
  );
}

export default function AssemblyModulePage({ user, onBack }) {
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedLevelNumber, setCompletedLevelNumber] = useState(null);

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
        setTimeout(() => setLoading(false), 2000);
      }
    };
    loadUserProgress();
  }, [user]);

  const handleLevelComplete = async (levelNumber) => {
    if (!user) return;
    try {
      const updatedProgress = await updateProgress(user.uid, `assembly_level_${levelNumber}`);
      setUserProgress(updatedProgress);
      setCompletedLevelNumber(levelNumber);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error actualizando progreso:", error);
    }
  };

  const handleNextLevel = () => {
    setShowSuccessModal(false);
    const nextLevel = completedLevelNumber + 1;
    if (nextLevel <= MODULE_INFO.totalLevels) {
      setCurrentLevel(nextLevel);
    } else {
      setCurrentLevel(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="flex flex-col items-center gap-10 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#0D7FF2]/10 blur-[80px] rounded-full animate-pulse"></div>
            <img src={Mdurmiendo} alt="Isaac" className="w-32 h-32 object-contain relative" />
          </div>
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Abriendo el Taller...</h2>
            <div className="flex justify-center gap-3">
               <div className="w-3 h-3 bg-[#0D7FF2] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
               <div className="w-3 h-3 bg-[#0D7FF2]/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-3 h-3 bg-[#0D7FF2]/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentLevel) {
    const props = { onBack: () => setCurrentLevel(null), onLevelComplete: () => handleLevelComplete(currentLevel) };
    const levels = [null, <Level1Motherboard {...props} />, <Level2Ram {...props} />, <Level3Storage {...props} />, <Level4Full {...props} />, <Level5Chasis {...props} />];
    
    return (
      <>
        {levels[currentLevel]}
        {showSuccessModal && (
          <SuccessModal
            levelName={getLevelConfig(completedLevelNumber).title}
            onRepeat={() => { setShowSuccessModal(false); const c = currentLevel; setCurrentLevel(null); setTimeout(() => setCurrentLevel(c), 10); }}
            onNext={handleNextLevel}
            onBackToMenu={() => { setShowSuccessModal(false); setCurrentLevel(null); }}
            isLastLevel={completedLevelNumber === MODULE_INFO.totalLevels}
          />
        )}
      </>
    );
  }

  const icons = { CpuIcon, MemoryIcon, StorageIcon, ComponentsIcon };
  const completedCount = userProgress?.completedLevels?.filter(l => typeof l === 'string' && l.startsWith('assembly_level_')).length || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 font-sans relative overflow-hidden">
      
      {/* TEXTURAS DE FONDO SUAVES */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      {/* HERRAMIENTAS DECORATIVAS (Sutiles en colores originales) */}
      <img src={Destornillador} alt="" className="absolute -top-10 -right-10 w-64 opacity-10 rotate-45 pointer-events-none grayscale hover:grayscale-0 transition-all duration-700" />
      <img src={PastaTermica} alt="" className="absolute top-1/2 -left-20 w-48 opacity-10 -rotate-12 pointer-events-none grayscale" />
      <img src={Cepillo} alt="" className="absolute -bottom-10 right-20 w-56 opacity-10 rotate-[120deg] pointer-events-none grayscale" />

      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col flex-1 relative z-10">
        
        {/* CABECERA LIMPIA */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center border-4 border-blue-50 shadow-xl transition-transform hover:rotate-6">
              <AssemblyIcon className="w-10 h-10" color="#0D7FF2" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1 uppercase italic">Taller de Ensamble</h2>
              <p className="text-[#0D7FF2] font-black uppercase text-[10px] tracking-[4px] flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                ESTADO: EN LÍNEA
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-white p-4 rounded-[24px] border-2 border-slate-100 shadow-lg">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tu Progreso Técnico</p>
              <div className="flex items-center gap-3">
                <ProgressBar progress={(completedCount/5)*100} className="w-32 h-2" />
                <span className="text-sm font-black text-[#0D7FF2]">{completedCount}/5</span>
              </div>
            </div>
            <UserProfileButton user={user} size="medium" fallbackType="icon" />
          </div>
        </header>

        {/* DIÁLOGO CON ISAAC */}
        <section className="mb-12 relative">
          <div className="bg-white border-4 border-blue-50 rounded-[48px] p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative shrink-0 transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 bg-[#0D7FF2]/10 blur-3xl rounded-full"></div>
              <img 
                src={completedCount === 5 ? MbienHecho : Mreparando} 
                alt="Isaac" 
                className="w-32 h-32 md:w-44 md:h-44 object-contain relative z-10 drop-shadow-xl" 
              />
            </div>
            
            <div className="flex-1 space-y-3 relative z-10 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">
                {completedCount === 0 ? "¡HOLA, TÉCNICO!" : completedCount === 5 ? "¡ERES UN EXPERTO!" : "¡EXCELENTE TRABAJO!"}
              </h1>
              <p className="text-lg md:text-xl font-bold text-slate-500 leading-relaxed max-w-2xl">
                {completedCount === 0 
                  ? "Hoy aprenderemos a construir una computadora paso a paso. Prepara tus herramientas y elige un proyecto." 
                  : completedCount === 5 
                  ? "Has completado todas las misiones técnicas. ¡Ahora puedes repetir cualquier nivel para perfeccionar tu técnica!" 
                  : "Estás haciendo un trabajo increíble en el banco de pruebas. Cada pieza nos acerca más al éxito."}
              </p>
            </div>
          </div>
        </section>

        {/* GRID DE PROYECTOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {Array.from({ length: 5 }, (_, index) => {
            const levelNumber = index + 1;
            const config = getLevelConfig(levelNumber);
            const status = getLevelStatus(levelNumber, userProgress);
            const Icon = icons[config.icon] || ComponentsIcon;

            return (
              <LevelCard
                key={levelNumber}
                levelNumber={levelNumber}
                title={config.title}
                subtitle={getLevelSubtitle(levelNumber, userProgress)}
                variant={status.variant}
                active={status.active}
                completed={status.completed}
                icon={Icon}
                onClick={() => setCurrentLevel(levelNumber)}
              />
            );
          })}
        </section>

        {/* BOTÓN DE SALIDA */}
        <footer className="mt-auto flex justify-center py-8">
            <button
              type="button"
              onClick={onBack}
              className="h-14 min-w-72 rounded-2xl bg-[#0D7FF2] text-white px-8 flex items-center justify-center gap-4 cursor-pointer hover:bg-[#0D7FF2]/90 hover:shadow-xl hover:scale-105 transition-all duration-300 font-black shadow-lg shadow-blue-200 uppercase tracking-[2px] text-sm"
            >
              <span className="text-2xl">←</span>
              <span>Volver al Menú Principal</span>
            </button>
        </footer>

      </div>
    </div>
  );
}
