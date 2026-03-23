import { useState, useEffect } from 'react';
import { StarIcon } from '../../components/StarIcon';

export default function StarRating({ user, levelNumber = 1 }) {
  const [state, setState] = useState({ stars: 0, levelCompletions: 0 });

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const savedStars = localStorage.getItem(`user_${user?.uid}_stars`) || '0';
    const savedCompletions = localStorage.getItem(`user_${user?.uid}_level_${levelNumber}_completions`) || '0';
    
    setState({
      stars: parseInt(savedStars),
      levelCompletions: parseInt(savedCompletions)
    });
  }, [user, levelNumber]);

  // Función para actualizar estrellas cuando se completa el nivel
  const updateStars = () => {
    const newStars = state.stars + 10;
    const newCompletions = state.levelCompletions + 1;
    
    setState({
      stars: newStars,
      levelCompletions: newCompletions
    });
    
    // Guardar en localStorage
    localStorage.setItem(`user_${user?.uid}_stars`, newStars.toString());
    localStorage.setItem(`user_${user?.uid}_level_${levelNumber}_completions`, newCompletions.toString());
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
