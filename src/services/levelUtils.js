import { PIECES_LEVELS, MODULE_INFO, PROGRESS_MESSAGES } from './constants/levels';

/**
 * Determina el estado de un nivel según el progreso del usuario
 * @param {number} levelNumber - Número del nivel
 * @param {Object} userProgress - Progreso del usuario
 * @returns {Object} - Estado del nivel (variant, active, completed)
 */
export const getLevelStatus = (levelNumber, userProgress) => {
  if (!userProgress || !userProgress.completedLevels) {
    return { 
      variant: "locked", 
      active: false, 
      completed: false 
    };
  }
  
  const isCompleted = userProgress.completedLevels.includes(levelNumber);
  const isCurrent = userProgress.currentLevel === levelNumber;
  const isUnlocked = userProgress.unlockedLevels.includes(levelNumber);
  
  if (isCurrent) {
    return { 
      variant: "active", 
      active: true, 
      completed: false 
    };
  } else if (isCompleted) {
    return { 
      variant: "unlocked", 
      active: false, 
      completed: true 
    };
  } else if (isUnlocked) {
    return { 
      variant: "unlocked", 
      active: false, 
      completed: false 
    };
  } else {
    return { 
      variant: "locked", 
      active: false, 
      completed: false 
    };
  }
};

/**
 * Obtiene el subtítulo apropiado para un nivel según su estado
 * @param {number} levelNumber - Número del nivel
 * @param {Object} userProgress - Progreso del usuario
 * @returns {string} - Subtítulo del nivel
 */
export const getLevelSubtitle = (levelNumber, userProgress) => {
  const status = getLevelStatus(levelNumber, userProgress);
  const level = PIECES_LEVELS[levelNumber];
  
  if (status.completed) {
    return level.subtitle.completed;
  } else if (status.active) {
    return level.subtitle.active;
  } else {
    return level.subtitle.locked;
  }
};

/**
 * Calcula el porcentaje de progreso del módulo
 * @param {Object} userProgress - Progreso del usuario
 * @returns {number} - Porcentaje completado (0-100)
 */
export const getProgressPercentage = (userProgress) => {
  if (!userProgress) return 0;
  return (userProgress.completedLevels.length / MODULE_INFO.totalLevels) * 100;
};

/**
 * Obtiene el mensaje motivacional según el progreso
 * @param {Object} userProgress - Progreso del usuario
 * @returns {string} - Mensaje motivacional
 */
export const getProgressMessage = (userProgress) => {
  if (!userProgress) return PROGRESS_MESSAGES.default;
  
  const completedCount = userProgress.completedLevels.length;
  return PROGRESS_MESSAGES[completedCount] || PROGRESS_MESSAGES.default;
};

/**
 * Obtiene la configuración completa de un nivel
 * @param {number} levelNumber - Número del nivel
 * @returns {Object} - Configuración del nivel
 */
export const getLevelConfig = (levelNumber) => {
  return PIECES_LEVELS[levelNumber] || null;
};
