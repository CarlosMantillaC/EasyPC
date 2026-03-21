import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Colección principal
const COLLECTION_NAME = 'userProgress';

/**
 * Obtiene el progreso del usuario desde Firestore
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Object>} - Datos del progreso del usuario
 */
export const getUserProgress = async (userId) => {
  if (!userId) {
    throw new Error('Se requiere userId para obtener el progreso');
  }

  try {
    const userProgressRef = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(userProgressRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Crear progreso inicial si no existe
      const initialProgress = createInitialProgress(userId);
      await setDoc(userProgressRef, initialProgress);
      return initialProgress;
    }
  } catch (error) {
    console.error('Error obteniendo progreso del usuario:', error);
    throw new Error('Error al obtener progreso del usuario');
  }
};

/**
 * Actualiza el progreso del usuario al completar un nivel
 * @param {string} userId - ID del usuario
 * @param {number} levelCompleted - Nivel completado
 * @param {number} score - Puntos obtenidos (opcional)
 * @returns {Promise<Object>} - Progreso actualizado
 */
export const updateProgress = async (userId, levelCompleted, score = 100) => {
  if (!userId || !levelCompleted) {
    throw new Error('Se requieren userId y levelCompleted');
  }

  try {
    const userProgressRef = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(userProgressRef);
    
    if (!docSnap.exists()) {
      throw new Error('Usuario no encontrado');
    }
    
    const currentData = docSnap.data();
    const updatedProgress = calculateUpdatedProgress(currentData, levelCompleted, score);
    
    await setDoc(userProgressRef, updatedProgress);
    return updatedProgress;
  } catch (error) {
    console.error('Error actualizando progreso:', error);
    throw new Error('Error al actualizar progreso');
  }
};

/**
 * Crea el progreso inicial para un usuario nuevo
 * @param {string} userId - ID del usuario
 * @returns {Object} - Progreso inicial
 */
const createInitialProgress = (userId) => ({
  userId,
  currentLevel: 1,
  completedLevels: [],
  unlockedLevels: [1],
  lastUpdated: new Date(),
  totalScore: 0
});

/**
 * Calcula el nuevo progreso al completar un nivel
 * @param {Object} currentProgress - Progreso actual
 * @param {number} levelCompleted - Nivel completado
 * @param {number} score - Puntos obtenidos
 * @returns {Object} - Progreso actualizado
 */
const calculateUpdatedProgress = (currentProgress, levelCompleted, score) => {
  const completedLevels = [...new Set([...currentProgress.completedLevels, levelCompleted])];
  const nextLevel = levelCompleted + 1;
  const unlockedLevels = [...new Set([...currentProgress.unlockedLevels, nextLevel])];
  
  return {
    ...currentProgress,
    currentLevel: nextLevel,
    completedLevels,
    unlockedLevels,
    totalScore: currentProgress.totalScore + score,
    lastUpdated: new Date()
  };
};
