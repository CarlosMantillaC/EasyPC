const {setGlobalOptions} = require("firebase-functions");
const {onCall} = require("firebase-functions/v2/https");
const {getFirestore} = require("firebase-admin/firestore");

// Inicializar Firebase Admin
const admin = require("firebase-admin");
admin.initializeApp();

// Configuración global
setGlobalOptions({ maxInstances: 10 });

// Obtener progreso del usuario
exports.getUserProgress = onCall(async (request) => {
  const { userId } = request.data;
  
  if (!userId) {
    throw new Error("Se requiere userId");
  }

  try {
    const db = getFirestore();
    const docRef = db.collection('userProgress').doc(userId);
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      // Crear progreso inicial si no existe
      const initialProgress = {
        userId,
        currentLevel: 1,
        completedLevels: [],
        unlockedLevels: [1],
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        totalScore: 0
      };
      
      await docRef.set(initialProgress);
      return initialProgress;
    }
  } catch (error) {
    console.error("Error getting user progress:", error);
    throw new Error("Error al obtener progreso del usuario");
  }
});

// Actualizar progreso al completar un nivel
exports.updateProgress = onCall(async (request) => {
  const { userId, levelCompleted, score = 0 } = request.data;
  
  if (!userId || !levelCompleted) {
    throw new Error("Se requieren userId y levelCompleted");
  }

  try {
    const db = getFirestore();
    const docRef = db.collection('userProgress').doc(userId);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      throw new Error("Usuario no encontrado");
    }
    
    const currentData = docSnap.data();
    const completedLevels = [...currentData.completedLevels, levelCompleted];
    const nextLevel = levelCompleted + 1;
    const unlockedLevels = [...new Set([...currentData.unlockedLevels, nextLevel])];
    
    const updatedProgress = {
      ...currentData,
      currentLevel: nextLevel,
      completedLevels,
      unlockedLevels,
      totalScore: currentData.totalScore + score,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await docRef.update(updatedProgress);
    return updatedProgress;
  } catch (error) {
    console.error("Error updating progress:", error);
    throw new Error("Error al actualizar progreso");
  }
});
