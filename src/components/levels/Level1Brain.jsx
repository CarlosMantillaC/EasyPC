import { useState } from 'react';
import { ChevronLeftIcon } from '../Icons';
import UserProfileButton from '../../shared/components/UserProfileButton';
import StarRating from '../../shared/components/StarRating';
import ProgressBar from '../../shared/components/ProgressBar';
import ComponentsIcon from "../ComponentsIcon.jsx";
import BrainIcon from "../BrainIcon.jsx";

export default function Level1Brain({ onBack, onLevelComplete, user }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [progress, setProgress] = useState(30);
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);

  const processorImages = [
    '/src/assets/images/Components/Procesador/Procesador1.png',
    '/src/assets/images/Components/Procesador/Procesador2.png',
    '/src/assets/images/Components/Procesador/Procesador3.png',
    '/src/assets/images/Components/Procesador/Procesador4.png',
    '/src/assets/images/Components/Procesador/Procesador5.png'
  ];

  const helpTexts = [
    "🧩 Forma: cuadrado\n✨ Parte inferior: pines metálicos\n🧠 Función: cerebro de la computadora",
    "🧩 Forma: pieza cuadrada\n✨ Parte inferior: puntos metálicos\n🧠 Función: cerebro de la computadora",
    "🧩 Forma: cuadrado y plano\n✨ Parte inferior: conectores metálicos\n🧠 Función: cerebro de la computadora",
    "🧩 Forma: chip cuadrado\n✨ Parte inferior: pines brillantes\n🧠 Función: cerebro de la computadora",
    "🧩 Forma: pequeño y cuadrado\n✨ Parte inferior: puntos dorados\n🧠 Función: cerebro de la computadora"
  ];

  const options = [
    { id: 'processor', image: processorImages[currentRound - 1], correct: true },
    { id: 'ram', image: '/src/assets/images/Components/Ram/Ram1.png', correct: false },
    { id: 'power', image: '/src/assets/images/Components/Disco/DiscoDuro1.png', correct: false }
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
    
    if (option.correct) {
      // Correct answer - update score and progress
      const newScore = score + 10;
      const newProgress = Math.min(100, progress + 14);
      setScore(newScore);
      setProgress(newProgress);
      
      setTimeout(() => {
        if (currentRound < 5) {
          // Move to next round
          setCurrentRound(currentRound + 1);
          setSelectedOption(null);
        } else {
          // Complete level after 5 rounds
          setProgress(100);
          
          // Actualizar estrellas usando la función global
          if (window.updateLevelStars) {
            window.updateLevelStars();
          }
          
          onLevelComplete(1);
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-300 bg-[#F5F7F8] flex flex-col">
      <div className="w-full min-h-300 overflow-y-auto flex justify-center px-6 lg:px-1 xl:px-4 py-5">
        <div className="w-full max-w-360 min-h-288">
          <header className="pb-6">
            <div className="h-18.25 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BrainIcon className="w-9 h-11" color="#0D7FF2" />
                <h2 className="text-2xl leading-7.5 tracking-[-0.6px] font-bold text-slate-900">El Cerebro</h2>
              </div>
              <div className="flex items-center gap-4">
                <StarRating user={user} levelNumber={1} />
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
            {/* Progress Bar */}
            <div className="px-4 mt-4 mb-8">
              <p className="text-base leading-6 font-semibold text-slate-900 mb-4">Progreso</p>
              <ProgressBar progress={progress} />
            </div>

            <div className="bg-white border border-[#F1F5F9] rounded-[48px] px-4 pt-3.75 pb-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <h1 className="text-[30px] leading-9.5 font-bold text-slate-900">¿Cuál es el Procesador?</h1>
              <p className="text-base leading-6 font-normal text-slate-500">Haz clic en la pieza correcta.</p>

            </div>
          </section>

          <section className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {options.map((option) => (
                <div key={option.id} className="space-y-2">
                  <button
                    onClick={() => handleOptionClick(option)}
                    className={`
                      relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 
                      hover:-translate-y-2 active:scale-95 border-2 w-full
                      ${selectedOption === option.id 
                        ? option.correct 
                          ? 'border-green-500 ring-4 ring-green-200' 
                          : 'border-red-500 ring-4 ring-red-200'
                        : 'border-transparent'
                      }
                    `}
                  >
                    <div className="w-60 h-60 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <img 
                        src={option.image} 
                        alt="Componente de computadora"
                        className="w-48 h-48 object-contain"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/192x192/f8fafc/0d7ff2?text=Componente`;
                        }}
                      />
                    </div>
                    
                    {/* Success/Error Indicator */}
                    {selectedOption === option.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center">
                        {option.correct ? (
                          <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="pb-8">
            <div className="bg-white border border-[#F1F5F9] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] px-6 py-5">
              <div className="mb-4">
                <h3 className="text-base leading-6 font-semibold text-slate-900">¿Necesitas ayuda?</h3>
              </div>

              <div className="bg-blue-50 rounded-2xl">
                <p className="text-base text-[#475569] leading-6 whitespace-pre-line">
                  {helpTexts[currentRound - 1]}
                </p>
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
