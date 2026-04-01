import { useState, useRef, useEffect } from 'react';
import UserProfileButton from '../../../../shared/components/UserProfileButton';
import StarRating from '../../../../shared/components/StarRating';
import ProgressBar from '../../../../shared/components/ProgressBar';
import TrophyIcon from '../../../../shared/components/TrophyIcon';
import BrainIcon from "../icons/BrainIcon.jsx";
import MascotaDialogo from '../../../../components/MascotaDialogo';
import { PROGRESS_MESSAGES } from '../../services/piecesConstants';

const NON_PROCESSOR_CARDS = ['ram', 'power'];

const getRandomProcessorIndex = (excludedIndex = null) => {
  const availableIndexes = [0, 1, 2].filter((index) => index !== excludedIndex);
  const randomIndex = Math.floor(Math.random() * availableIndexes.length);
  return availableIndexes[randomIndex];
};

const buildOrderWithProcessorAt = (processorIndex) => {
  const cards = Math.random() < 0.5
    ? NON_PROCESSOR_CARDS
    : [...NON_PROCESSOR_CARDS].reverse();

  const nextOrder = [null, null, null];
  nextOrder[processorIndex] = 'processor';

  let cardPointer = 0;
  for (let i = 0; i < nextOrder.length; i += 1) {
    if (nextOrder[i] === null) {
      nextOrder[i] = cards[cardPointer];
      cardPointer += 1;
    }
  }

  return nextOrder;
};

export default function Level1Brain({ onBack, onLevelComplete, user }) {
  const initialProcessorIndexStorageKey = user?.uid
    ? `easypc_level1_last_initial_processor_index_${user.uid}`
    : 'easypc_level1_last_initial_processor_index_guest';

  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [isHelpExpanded, setIsHelpExpanded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const feedbackRef = useRef(null);
  const [cardOrder, setCardOrder] = useState(() => {
    let previousInitialProcessorIndex = null;

    if (typeof window !== 'undefined') {
      const savedIndex = window.localStorage.getItem(initialProcessorIndexStorageKey);
      const parsedIndex = Number(savedIndex);

      if (savedIndex !== null && Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex <= 2) {
        previousInitialProcessorIndex = parsedIndex;
      }
    }

    const initialProcessorIndex = getRandomProcessorIndex(previousInitialProcessorIndex);

    return buildOrderWithProcessorAt(initialProcessorIndex);
  });
  const initialProcessorIndexRef = useRef(cardOrder.indexOf('processor'));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        initialProcessorIndexStorageKey,
        String(initialProcessorIndexRef.current)
      );
    }
  }, [initialProcessorIndexStorageKey]);

  const getNextCardOrder = (previousOrder) => {
    const previousProcessorIndex = previousOrder.indexOf('processor');
    const nextProcessorIndex = getRandomProcessorIndex(previousProcessorIndex);
    return buildOrderWithProcessorAt(nextProcessorIndex);
  };

  // Auto-scroll to feedback when it appears
  useEffect(() => {
    if (feedbackMessage && feedbackRef.current) {
      const element = feedbackRef.current;
      const elementRect = element.getBoundingClientRect();
      const bottomPadding = 16;
      const overflowBottom = elementRect.bottom - window.innerHeight;

      // Solo bajar cuando el feedback se sale por abajo de la vista.
      // No centrar, y nunca subir automáticamente.
      if (overflowBottom > 0) {
        const startY = window.pageYOffset;
        const distance = overflowBottom + bottomPadding;
        const duration = 500;
        let startTime = null;

        const easeInOutCubic = (t) =>
          t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animateScroll = (timestamp) => {
          if (!startTime) startTime = timestamp;

          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          window.scrollTo(0, startY + distance * easedProgress);

          if (progress < 1) {
            window.requestAnimationFrame(animateScroll);
          }
        };

        window.requestAnimationFrame(animateScroll);
      }
    }
  }, [feedbackMessage]);

  const processorImages = [
    '/src/assets/images/Components/Procesador/Procesador1.png',
    '/src/assets/images/Components/Procesador/Procesador2.png',
    '/src/assets/images/Components/Procesador/Procesador3.png',
    '/src/assets/images/Components/Procesador/Procesador4.png',
    '/src/assets/images/Components/Procesador/Procesador5.png'
  ];

  const ramImages = [
    '/src/assets/images/Components/Ram/Ram1.png',
    '/src/assets/images/Components/Ram/Ram2.png',
    '/src/assets/images/Components/Ram/Ram3.png',
    '/src/assets/images/Components/Ram/Ram1.png',
    '/src/assets/images/Components/Ram/Ram2.png'
  ];

  const discoImages = [
    '/src/assets/images/Components/Disco/DiscoDuro1.png',
    '/src/assets/images/Components/Disco/DiscoDuro2.png',
    '/src/assets/images/Components/Disco/DiscoSSD.png',
    '/src/assets/images/Components/Disco/DiscoSSD2.png',
    '/src/assets/images/Components/Disco/Discos.png'
  ];

  const helpTexts = [
    "<strong>Forma:</strong> cuadrado\n<strong>Parte inferior:</strong> pines metálicos\n<strong>Función:</strong> cerebro de la computadora",
    "<strong>Forma:</strong> pieza cuadrada\n<strong>Parte inferior:</strong> puntos metálicos\n<strong>Función:</strong> cerebro de la computadora",
    "<strong>Forma:</strong> cuadrado y plano\n<strong>Parte inferior:</strong> conectores metálicos\n<strong>Función:</strong> cerebro de la computadora",
    "<strong>Forma:</strong> chip cuadrado\n<strong>Parte inferior:</strong> pines brillantes\n<strong>Función:</strong> cerebro de la computadora",
    "<strong>Forma:</strong> pequeño y cuadrado\n<strong>Parte inferior:</strong> puntos dorados\n<strong>Función:</strong> cerebro de la computadora"
  ];

  const correctMessages = [
    "¡Correcto!",
    "¡Muy bien!",
    "¡Lo lograste!",
    "¡Excelente!"
  ];

  const incorrectMessages = [
    "Intenta otra vez",
    "Casi, intenta de nuevo",
    "Sigue intentando",
    "No es ese, prueba otra opción"
  ];

  const options = cardOrder.map((cardType) => {
    let image;
    if (cardType === 'processor') {
      image = processorImages[currentRound - 1];
    } else if (cardType === 'ram') {
      image = ramImages[currentRound - 1];
    } else if (cardType === 'power') {
      image = discoImages[currentRound - 1];
    }
    
    return {
      id: cardType,
      image: image,
      correct: cardType === 'processor'
    };
  });

  const handleOptionClick = (option) => {
    if (isProcessing) return;
    
    setSelectedOption(option.id);
    setIsProcessing(true);
    
    if (option.correct) {
      const randomCorrectMessage = correctMessages[Math.floor(Math.random() * correctMessages.length)];
      setFeedbackMessage(randomCorrectMessage);
      
      const newScore = score + 10;
      const newProgress = Math.min(100, progress + 20);
      setScore(newScore);
      setProgress(newProgress);
      
      setTimeout(() => {
        if (currentRound < 5) {
          setCardOrder((previousOrder) => getNextCardOrder(previousOrder));
          setCurrentRound((previousRound) => previousRound + 1);
          setSelectedOption(null);
          setFeedbackMessage('');
          setIsProcessing(false);
        } else {
          setProgress(100);
          onLevelComplete(1);
        }
      }, 2500);
    } else {
      const randomIncorrectMessage = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
      setFeedbackMessage(randomIncorrectMessage);
      
      setTimeout(() => {
        setSelectedOption(null);
        setFeedbackMessage('');
        setIsProcessing(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-300 bg-white flex flex-col">
      <div className="w-full min-h-300 overflow-y-auto flex justify-center px-6 lg:px-1 xl:px-4 py-5">
        <div className="w-full max-w-360 min-h-288">
          <header>
            <div className="h-18.25 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BrainIcon className="w-9 h-11" color="#0D7FF2" />
                <div className="flex flex-col">
                  <h2 className="text-2xl leading-7.5 tracking-[-0.6px] font-bold text-slate-900">El Procesador</h2>
                  <p className="text-sm leading-5 text-slate-600">¡Es el cerebro del computador!</p>
                </div>
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

          <section>
            <div className="px-4 mt-16 mb-16">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrophyIcon width={16} height={16} color="#0D7FF2" />
                  <p className="text-base leading-6 font-semibold text-slate-900">Progreso</p>
                </div>
                <p className="text-base leading-6 font-semibold text-blue-600">
                  {(() => {
                    if (progress === 0) return PROGRESS_MESSAGES.start;
                    if (progress === 100) return PROGRESS_MESSAGES.complete;
                    return PROGRESS_MESSAGES.default;
                  })()}
                </p>
              </div>
              <ProgressBar progress={progress} />
            </div>

            <MascotaDialogo
              titulo="¿Cuál es el Procesador?"
              mensaje="Haz clic en la pieza correcta."
              mood="hablando"
              align="left"
            />
          </section>

          <section className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {options.map((option) => (
                <div key={option.id} className="space-y-2">
                  <button
                    onClick={() => handleOptionClick(option)}
                    disabled={isProcessing}
                    className={`
                      relative bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500 
                      hover:-translate-y-4 hover:shadow-xl active:scale-95 border-2 w-full
                      ${selectedOption === option.id 
                        ? option.correct 
                          ? 'border-green-500 ring-4 ring-green-200' 
                          : 'border-red-500 ring-4 ring-red-200'
                        : 'border-[#0D7FF2]'
                      }
                      ${isProcessing 
                        ? 'opacity-50 cursor-not-allowed hover:shadow-xl hover:translate-y-0 active:scale-100' 
                        : 'cursor-pointer'
                      }
                    `}
                  >
                    <div className="w-60 h-60 bg-white rounded-3xl flex items-center justify-center mb-4 mx-auto">
                      <img 
                        src={option.image} 
                        alt="Componente de computadora"
                        className="w-48 h-48 object-contain"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/192x192/f8fafc/0d7ff2?text=Componente`;
                        }}
                      />
                    </div>
                    
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

          {feedbackMessage && (
            <section ref={feedbackRef} className="pb-6">
              <MascotaDialogo
                titulo={feedbackMessage}
                mensaje={currentRound === 5 && selectedOption === 'processor' ? '+10 estrellas' : ''}
                mood={selectedOption === 'processor' ? 'asombrado' : 'pensando'}
                align="left"
              />
            </section>
          )}

          <section className="pb-8">
            <div className="bg-white border-2 border-[#E2E8F0] rounded-3xl shadow-md px-6 py-5">
              <button
                onClick={() => setIsHelpExpanded(!isHelpExpanded)}
                className="w-full flex items-center gap-2 mb-4 text-left cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
              >
                <h3 className="text-base leading-6 font-semibold text-slate-900">¿Necesitas ayuda? Toca aquí</h3>
                <svg 
                  className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isHelpExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isHelpExpanded && (
                <div className="bg-white rounded-3xl">
                  <p 
                    className="text-base text-[#475569] leading-6 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: helpTexts[currentRound - 1] }}
                  />
                </div>
              )}
            </div>
          </section>

          <section className="h-20 flex items-start justify-center py-3">
            <button
              type="button"
              onClick={onBack}
              className="h-14 min-w-60 max-w-120 rounded-3xl bg-[#0D7FF2] text-white px-8 flex items-center justify-center gap-3 cursor-pointer hover:bg-[#0D7FF2]/90 hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold text-lg"
            >
              <span className="text-[22px]">←</span>
              <span>Volver al Módulo Piezas</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
