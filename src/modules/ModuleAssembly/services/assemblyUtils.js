/**
 * Utilidades específicas para el módulo de Armando (Ensamble)
 */

import { useState, useEffect } from "react";
import { ASSEMBLY_LEVELS, MODULE_INFO, PROGRESS_MESSAGES } from './assemblyConstants';

export function getLevelStatus(levelNumber, userProgress) {
  if (!userProgress || !userProgress.completedLevels) {
    return levelNumber === 1 
      ? { variant: "active", active: true, completed: false }
      : { variant: "locked", active: false, completed: false };
  }

  const completedLevels = userProgress.completedLevels || [];
  
  // Convertimos a string por seguridad
  const levelId = `assembly_level_${levelNumber}`;
  const isCompleted = completedLevels.includes(levelId);
  
  // Lógica de desbloqueo: el 1 siempre disponible, los demás si el anterior está listo
  if (isCompleted) return { variant: "completed", active: false, completed: true };
  
  const isPreviousCompleted = levelNumber === 1 || completedLevels.includes(`assembly_level_${levelNumber - 1}`);
  
  if (isPreviousCompleted) return { variant: "active", active: true, completed: false };
  
  return { variant: "locked", active: false, completed: false };
}

export function getLevelSubtitle(levelNumber, userProgress) {
  const status = getLevelStatus(levelNumber, userProgress);
  const config = ASSEMBLY_LEVELS[levelNumber];
  
  if (status.completed) return config.subtitle.completed;
  if (status.active) return config.subtitle.active;
  return config.subtitle.locked;
}

export function getProgressPercentage(userProgress) {
  if (!userProgress || !userProgress.completedLevels) return 0;
  
  // Filtramos asegurándonos de que sea un string antes de usar startsWith
  const assemblyLevels = userProgress.completedLevels.filter(l => 
    typeof l === 'string' && l.startsWith('assembly_level_')
  ).length;
  
  return Math.round((assemblyLevels / MODULE_INFO.totalLevels) * 100);
}

export function getProgressMessage(userProgress) {
  const completedCount = userProgress?.completedLevels?.filter(l => 
    typeof l === 'string' && l.startsWith('assembly_level_')
  ).length || 0;
  
  return PROGRESS_MESSAGES[completedCount] || PROGRESS_MESSAGES.default;
}

export function getLevelConfig(levelNumber) {
  return ASSEMBLY_LEVELS[levelNumber];
}

/**
 * HOOK PARA EL MANEJO DE LA LÓGICA DE CADA NIVEL (REFACTORIZADO)
 */
export function useAssemblyLevel({ stepsCount, onLevelComplete }) {
  const [step, setStep] = useState(1);
  const [isCarrying, setIsCarrying] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (isMobileView) {
        const availableWidth = window.innerWidth - 40;
        const newScale = Math.min(1, availableWidth / 800);
        setScale(newScale);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (step > stepsCount) {
      const timer = setTimeout(() => onLevelComplete(), 1500);
      return () => clearTimeout(timer);
    }
  }, [step, stepsCount, onLevelComplete]);

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const progressPercent = Math.round(((step - 1) / stepsCount) * 100);

  return {
    step,
    setStep,
    isCarrying,
    setIsCarrying,
    mousePos,
    isMobile,
    scale,
    progressPercent
  };
}
