import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AssemblyMascotBubble from "../AssemblyMascotBubble";
import MotherBoardCon2Ram from "../../../../assets/images/Components/MotherBoard/MotherBoardCon2Ram.png";
import DiscoSSD from "../../../../assets/images/Components/Disco/DiscoSSD.png";
import PuntaCableSata1 from "../../../../assets/images/Components/Cables/PuntaCableSata1.png";
import SataCable from "./SataCable";
import StorageIcon from "../../../ModulePieces/components/icons/StorageIcon";
import UserProfileButton from "../../../../shared/components/UserProfileButton";
import StarRating from "../../../../shared/components/StarRating";
import ProgressBar from "../../../../shared/components/ProgressBar";
import TrophyIcon from "../../../../shared/components/TrophyIcon";

// Coordenadas ajustadas: SSD más cerca de la MB
const SATA_CABLE_START = { x: 58, y: 55 };
const SATA_CABLE_END = { x: 73, y: 52 }; 

export default function Level3Storage({ onBack, onLevelComplete, user }) {
  const [step, setStep] = useState(1);
  const [isCarrying, setIsCarrying] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cableConnectedToSSD, setCableConnectedToSSD] = useState(false);

  const boardContainerRef = useRef(null);
  const slotRef = useRef(null);

  const instructions = {
    1: { mensaje: "Toma el SSD y colócalo en la bahía lateral derecha.", mood: "explorador" },
    2: { mensaje: "¡Bien! Conecta el cable SATA al puerto de la placa base.", mood: "pensando" },
    3: { mensaje: "Une el cable con el SSD para terminar el ensamble.", mood: "reparando" },
    4: { mensaje: "¡Increíble! SSD instalado y listo.", mood: "asombrado" }
  };

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => onLevelComplete(), 1500);
      return () => clearTimeout(timer);
    }
  }, [step, onLevelComplete]);

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const handlePickUpFromTray = (item, e) => {
    e.stopPropagation();
    if (!isCarrying) setIsCarrying(item);
  };

  const handleContainerClick = (e) => {
    if (!isCarrying) return;
    const slotRect = slotRef.current?.getBoundingClientRect();
    if (slotRect &&
      e.clientX >= slotRect.left && e.clientX <= slotRect.right &&
      e.clientY >= slotRect.top && e.clientY <= slotRect.bottom
    ) {
      setIsCarrying(null);
      setStep(prev => prev + 1);
    } else {
      setIsCarrying(null);
    }
  };

  const progressPercent = Math.round(((step - 1) / 3) * 100);

  return (
    <div 
      className={`min-h-screen bg-[#F8FAFC] font-sans select-none overflow-auto relative flex flex-col pb-10 ${isCarrying ? 'cursor-none' : ''}`}
      onClick={handleContainerClick}
    >
      <AnimatePresence>
        {isCarrying && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ position: 'fixed', left: mousePos.x, top: mousePos.y, translateX: '-50%', translateY: '-50%', zIndex: 9999, pointerEvents: 'none' }}
          >
            {isCarrying === 'ssd' ? (
              <img src={DiscoSSD} alt="" className="w-24 h-24 object-contain drop-shadow-xl" />
            ) : (
              <div className="flex items-center gap-1 bg-white/60 p-3 rounded-full border border-white shadow-xl">
                <img src={PuntaCableSata1} alt="" className="w-8 h-8 -rotate-45" />
                <div className="w-10 h-1.5 bg-rose-600 rounded-full"></div>
                <img src={PuntaCableSata1} alt="" className="w-8 h-8 rotate-45" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FONDO TÉCNICO GENERAL (Como Level2Ram) */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none"
           style={{ backgroundImage: `linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

      <div className="w-full max-w-[1440px] mx-auto py-5 relative z-10 flex flex-col flex-1 px-6">
        
        {/* CABECERA (Con shrink-0 para evitar que desaparezca) */}
        <header className="shrink-0 mb-6">
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-100 shadow-md hover:border-[#0D7FF2] transition-all active:scale-95 mr-2">
                <span className="text-xl">←</span>
              </button>
              <StorageIcon className="w-9 h-11" color="#0D7FF2" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight tracking-tight uppercase">Almacenamiento</h2>
                <p className="text-sm text-slate-600">Ensamble del Componente</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StarRating user={user} levelNumber={3} />
              <UserProfileButton user={user} size="medium" showBorder={false} fallbackType="icon" />
            </div>
          </div>
        </header>

        {/* PROGRESO (Con shrink-0) */}
        <section className="shrink-0 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrophyIcon width={16} height={16} color="#0D7FF2" />
              <p className="text-base font-semibold text-slate-900">Progreso</p>
            </div>
            <p className="text-base font-semibold text-blue-600 uppercase">
              {progressPercent}% Completado
            </p>
          </div>
          <ProgressBar progress={progressPercent} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 min-h-0">
          
          {/* COLUMNA IZQUIERDA (BANDEJA) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6 sticky top-4">
            <AssemblyMascotBubble mensaje={instructions[step].mensaje} mood={instructions[step].mood} />
            
            <div className="bg-white rounded-[32px] p-6 border-2 border-slate-100 shadow-lg flex flex-col items-center gap-6">
              <h3 className="text-slate-900 font-bold uppercase text-xs tracking-widest">Bandeja de Piezas</h3>
              <div className="grid grid-cols-1 gap-4 w-full">
                <div 
                  className={`h-24 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${step === 1 ? 'bg-blue-50 border-blue-200 cursor-pointer hover:border-blue-400' : 'bg-slate-50 border-slate-100 opacity-50'}`}
                  onClick={(e) => step === 1 && handlePickUpFromTray('ssd', e)}
                >
                  {step === 1 ? <img src={DiscoSSD} className="w-16 h-16 object-contain hover:scale-110 transition-transform" /> : 
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                </div>
                <div 
                  className={`h-24 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${step === 2 ? 'bg-blue-50 border-blue-200 cursor-pointer hover:border-blue-400' : 'bg-slate-50 border-slate-100 opacity-50'}`}
                  onClick={(e) => step === 2 && handlePickUpFromTray('cable', e)}
                >
                  {step <= 2 ? (
                    <div className="flex items-center gap-1 hover:scale-110 transition-transform">
                      <img src={PuntaCableSata1} className="w-6 h-6 -rotate-45" />
                      <div className="w-6 h-1 bg-rose-500 rounded-full"></div>
                      <img src={PuntaCableSata1} className="w-6 h-6 rotate-45" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ÁREA DE TRABAJO (Board + SSD) */}
          <div className="lg:col-span-8 xl:col-span-8 flex items-start justify-center relative z-[100]">
            <div 
              ref={boardContainerRef} 
              className="relative w-full max-w-[800px] aspect-[1.4/1] rounded-[48px] bg-white border-2 border-slate-50 shadow-[0_25px_60px_rgba(0,0,0,0.12)] flex items-center overflow-hidden"
            >
              {/* Cuadrícula interna técnica */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: `linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>

              {/* MOTHERBOARD */}
              <div className="relative w-[60%] h-[90%] ml-6 rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-50">
                <img src={MotherBoardCon2Ram} className="w-full h-full object-contain p-2" alt="MB" />
              </div>

              {/* SSD BAHÍA */}
              <div className="relative w-[30%] h-full flex items-center justify-center ml-auto mr-6">
                {step >= 2 ? (
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="relative"
                  >
                    <img src={DiscoSSD} className="w-32 h-32 object-contain drop-shadow-xl" />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] font-black px-3 py-1 rounded-full shadow-lg whitespace-nowrap uppercase tracking-widest">SSD STORAGE</div>
                  </motion.div>
                ) : (
                   <div className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center bg-slate-50/50">
                      <span className="text-slate-300 font-black text-[8px] uppercase tracking-widest text-center px-2">Bahía SSD</span>
                   </div>
                )}
              </div>

              {/* DROP ZONES */}
              {((step === 1 && isCarrying === 'ssd') || (step === 2 && isCarrying === 'cable')) && (
                <div 
                  ref={slotRef}
                  className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                  style={{
                    left: `${step === 1 ? SATA_CABLE_END.x : SATA_CABLE_START.x}%`,
                    top: `${step === 1 ? SATA_CABLE_END.y : SATA_CABLE_START.y}%`,
                  }}
                >
                  <div className="w-20 h-20 border-2 border-blue-400 border-dashed rounded-full animate-pulse bg-blue-400/5 shadow-[0_0_20px_rgba(59,130,246,0.2)]"></div>
                  <div className="absolute -top-8 bg-blue-500 text-white text-[8px] font-black px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap uppercase tracking-tighter">
                    {step === 1 ? 'Soltar aquí' : 'Conectar MB'}
                  </div>
                </div>
              )}

              {/* CABLE SATA */}
              {step >= 3 && (
                <SataCable 
                  startPoint={SATA_CABLE_START}
                  endPoint={SATA_CABLE_END}
                  isConnected={cableConnectedToSSD}
                  containerRef={boardContainerRef}
                  onConnect={() => { setCableConnectedToSSD(true); setStep(4); }}
                  startRotation={0}       
                  startCableRotation={0}  
                  startOffsetX={12}
                  startOffsetY={12}
                  startCurve={{ x: 30, y: 0 }}
                  endRotation={180}       
                  endCableRotation={180}  
                  endOffsetX={12}
                  endCurve={{ x: -30, y: 0 }}
                  strokeWidth={10}
                  rigidLength={25}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
