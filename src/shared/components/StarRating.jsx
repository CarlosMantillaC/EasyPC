import { useState, useEffect } from 'react';
import { StarIcon } from '../../components/StarIcon';
import { getUserProgress, updateStars as updateUserStars } from '../services';

export default function StarRating({ user, levelNumber = 1 }) {
  const [state, setState] = useState({ stars: 0, levelCompletions: 0 });

  // Cargar datos desde Firestore al montar
  useEffect(() => {
    const loadUserStars = async () => {
      if (!user) return;
      
      try {
        const userProgress = await getUserProgress(user.uid);
        const userStars = userProgress?.totalScore || 0;
        const levelCompletions = userProgress?.completedLevels?.filter(level => level === levelNumber)?.length || 0;
        
        setState({
          stars: userStars,
          levelCompletions: levelCompletions
        });
      } catch (error) {
        console.error('Error cargando estrellas desde Firestore:', error);
        // Fallback a localStorage si hay error
        const savedStars = localStorage.getItem(`user_${user?.uid}_stars`) || '0';
        const savedCompletions = localStorage.getItem(`user_${user?.uid}_level_${levelNumber}_completions`) || '0';
        
        setState({
          stars: parseInt(savedStars),
          levelCompletions: parseInt(savedCompletions)
        });
      }
    };

    loadUserStars();
  }, [user, levelNumber]);

  // Función para actualizar estrellas cuando se completa el nivel
  const updateStars = async () => {
    if (!user) return;
    
    // Obtener el valor actualizado desde Firestore para asegurar consistencia
    try {
      const userProgress = await getUserProgress(user.uid);
      const currentStars = userProgress?.totalScore || 0;
      
      // Siempre añadir exactamente 10 estrellas por cada nivel completado
      const newStars = currentStars + 10;
      const newCompletions = state.levelCompletions + 1;
      
      console.log('Actualizando estrellas:', {
        currentStars: currentStars,
        newStars: newStars,
        levelCompletions: newCompletions
      });
      
      // Guardar en Firestore usando la función específica para estrellas
      await updateUserStars(user.uid, newStars);
      
      setState({
        stars: newStars,
        levelCompletions: newCompletions
      });
      
      console.log('Estrellas guardadas en Firestore:', newStars);
    } catch (error) {
      console.error('Error guardando estrellas en Firestore:', error);
      // Fallback a localStorage si hay error
      const fallbackStars = state.stars + 10;
      localStorage.setItem(`user_${user?.uid}_stars`, fallbackStars.toString());
      localStorage.setItem(`user_${user?.uid}_level_${levelNumber}_completions`, (state.levelCompletions + 1).toString());
    }
  };

  // Exponer función global para que otros componentes puedan llamarla
  useEffect(() => {
    window.updateLevelStars = updateStars;
    return () => {
      delete window.updateLevelStars;
    };
  }, [state.stars, state.levelCompletions]);

  // Renderizar 5 estrellas (máximo 50 puntos = 5 estrellas)
  const maxStars = 5;
  const filledStars = Math.min(Math.floor(state.stars / 10), maxStars);

  return (
    <div className="flex items-center gap-2">
      <StarIcon
        className="w-4 h-4"
        filled={state.stars > 0}
      />
      <span className="text-sm font-bold text-[#0D7FF2] bg-[rgba(13,127,242,0.1)] px-2 py-1 rounded-full">
        {state.stars}
      </span>
    </div>
  );
}
