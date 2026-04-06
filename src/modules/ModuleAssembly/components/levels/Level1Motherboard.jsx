import { useState, useRef, useEffect } from "react";
import AssemblyMascotBubble from "../AssemblyMascotBubble";
import MotherBoardSinNada from "../../../../assets/images/Components/MotherBoard/MotherBoardSinNada.png";
import MotherBoardSocketAbierto from "../../../../assets/images/Components/MotherBoard/MotherBoardSocketAbierto.png";
import MotherBoardConProcesadorSocketAbierto from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesadorSocketAbierto.png";
import MotherBoardConProcesador from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesador.png";
import Procesador1 from "../../../../assets/images/Components/Procesador/Procesador1.png";
import BrainIcon from "../../../ModulePieces/components/icons/BrainIcon";
import UserProfileButton from "../../../../shared/components/UserProfileButton";
import StarRating from "../../../../shared/components/StarRating";
import ProgressBar from "../../../../shared/components/ProgressBar";
import TrophyIcon from "../../../../shared/components/TrophyIcon";
import { PROGRESS_MESSAGES } from "../../../ModulePieces/services/piecesConstants";

/**
 * NIVEL 1: EL PROCESADOR (VERSIÓN RESTAURADA - ANCLADA A LA IZQUIERDA)
 */
export default function Level1Motherboard({ onBack, onLevelComplete, user }) {
  const [step, setStep] = useState(1); 
  const [isCarrying, setIsCarrying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const socketRef = useRef(null);

  const instructions = {
    1: { mensaje: "Haz clic en la palanca para abrir el socket del procesador.", mood: "hablando" },
    2: { mensaje: isCarrying ? "¡Excelente! Suéltalo en el área resaltada." : "Recoge el CPU de la bandeja lateral.", mood: "asombrado" },
    3: { mensaje: "Baja la palanca para asegurar el procesador en su lugar.", mood: "reparando" },
    4: { mensaje: "¡Increíble! El cerebro del PC ha sido instalado correctamente.", mood: "bienhecho" }
  };

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => onLevelComplete(), 1200);
      return () => clearTimeout(timer);
    }
  }, [step, onLevelComplete]);

  useEffect(() => {
    const handleMove = (e) => {
      if (isCarrying) setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isCarrying]);

  const handlePickUp = (e) => {
    if (step === 2 && !isCarrying) {
      e.stopPropagation();
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsCarrying(true);
    }
  };

  const handleContainerClick = (e) => {
    if (!isCarrying) return;
    const socketRect = socketRef.current.getBoundingClientRect();
    if (
      e.clientX >= socketRect.left && e.clientX <= socketRect.right &&
      e.clientY >= socketRect.top && e.clientY <= socketRect.bottom
    ) {
      setIsCarrying(false);
      setStep(3);
    } else {
      setIsCarrying(false);
    }
  };

  const handleSocketAction = () => {
    if (step === 1) setStep(2);
    else if (step === 3) setStep(4);
  };

  const getSocketPosition = () => {
    switch (step) {
      case 1: return { top: '38%', left: '57%', width: '50px', height: '50px' };
      case 2: return { top: '24%', left: '43%', width: '100px', height: '100px' };
      case 3: return { top: '1%', left: '57%', width: '50px', height: '50px' };
      default: return { top: '25%', left: '43%', width: '97px', height: '97px' };
    }
  };

  const getSocketMessagePosition = () => {
    switch (step) {
      case 1: return '-top-12 left-1/2 -translate-x-1/2';
      case 2: return '-top-12 left-1/2 -translate-x-1/2';
      case 3: return 'top-1 -right-32 -translate-y-1';
      default: return '-top-12 left-1/2 -translate-x-1/2';
    }
  };

  const progressPercent = Math.round(((step - 1) / 3) * 100);

  return (
    <div 
      onClick={handleContainerClick}
      className={`min-h-screen bg-white font-sans select-none overflow-auto relative flex flex-col pb-10 ${isCarrying ? 'cursor-none' : ''}`}
    >
      {/* PIEZA VOLADORA */}
      {isCarrying && (
        <div
          style={{ position: 'fixed', left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)', zIndex: 9999, pointerEvents: 'none' }}
          className="w-40 h-40 flex items-center justify-center"
        >
          <img src={Procesador1} alt="" className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] scale-110" />
        </div>
      )}

      {/* FONDO TÉCNICO GENERAL */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
      
      <div className="w-full max-w-[1440px] mx-auto py-5 relative z-10 flex flex-col flex-1 px-6">
        
        {/* CABECERA */}
        <header className="shrink-0 mb-6">
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-100 shadow-md hover:border-[#0D7FF2] transition-all active:scale-95 mr-2">
                <span className="text-xl">←</span>
              </button>
              <BrainIcon className="w-9 h-11" color="#0D7FF2" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900">El Procesador</h2>
                <p className="text-sm text-slate-600">Ensamble del Componente</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StarRating user={user} levelNumber={1} />
              <UserProfileButton user={user} size="medium" showBorder={false} fallbackType="icon" />
            </div>
          </div>
        </header>

        {/* PROGRESO */}
        <section className="shrink-0 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrophyIcon width={16} height={16} color="#0D7FF2" />
              <p className="text-base font-semibold text-slate-900">Progreso</p>
            </div>
            <p className="text-base font-semibold text-blue-600 uppercase">
              {progressPercent === 0 ? PROGRESS_MESSAGES.start : progressPercent === 100 ? PROGRESS_MESSAGES.complete : PROGRESS_MESSAGES.default}
            </p>
          </div>
          <ProgressBar progress={progressPercent} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
          
          {/* COLUMNA IZQUIERDA (ISAAC + BANDEJA) - MÁS ANCHA (5) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 sticky top-4">
            <AssemblyMascotBubble mensaje={instructions[step].mensaje} mood={instructions[step].mood} />

            <div className="bg-white rounded-[32px] p-6 border-2 border-slate-100 shadow-lg flex flex-col items-center">
              <h3 className="text-slate-900 font-bold uppercase text-xs tracking-widest mb-6">Bandeja de Piezas</h3>
              
              <div className="flex flex-col items-center justify-center w-full min-h-[200px] bg-slate-50/50 rounded-[24px] border border-dashed border-slate-200">
                {step < 3 ? (
                  <div onClick={handlePickUp} className={`relative w-40 h-40 flex items-center justify-center transition-all ${isCarrying ? 'opacity-0 scale-50' : 'bg-white rounded-[32px] border-2 border-slate-100 cursor-pointer hover:border-[#0D7FF2] hover:scale-105 active:scale-95 shadow-sm'}`}>
                    <img src={Procesador1} alt="Procesador" className="w-24 h-24 object-contain" />
                    {step === 2 && !isCarrying && (
                      <div className="absolute -top-2 -right-2 bg-[#0D7FF2] text-white px-3 py-1 rounded-xl shadow-lg animate-bounce text-[10px] font-black uppercase">Recoger</div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-40 h-40 flex items-center justify-center animate-in fade-in zoom-in duration-700">
                    {/* Silueta transparente del procesador */}
                    <img src={Procesador1} alt="" className="w-24 h-24 object-contain opacity-10 grayscale" />
                    
                    {/* Icono de instalado (Limpio y Vibrante) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shadow-[0_15px_30px_-5px_rgba(34,197,94,0.4)] animate-in zoom-in duration-500 delay-200 relative">
                        {/* Brillo Superior */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/20 rounded-full blur-[2px]"></div>
                        
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-green-600 font-black text-[10px] uppercase tracking-[4px] drop-shadow-sm">Instalado</p>
                        <div className="w-6 h-0.5 bg-green-500/30 rounded-full mt-1.5 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA (BOARD ANCLADA A LA IZQUIERDA Y TAMAÑO FIJO) - SE AJUSTA A (7) */}
          <div className="lg:col-span-7 xl:col-span-8 flex items-start justify-start relative transition-all lg:translate-x-10 z-[100]">
            <div className="relative inline-block" style={{ width: '540px', minWidth: 'px' }}>
              
              {/* FONDO AJUSTADO */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-[48px]" 
                   style={{ backgroundImage: `linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>

              <div className="relative w-full rounded-[48px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] bg-slate-50/50">
                {/* Capas apiladas para evitar destellos del fondo */}
                <img src={MotherBoardSinNada} alt="" className="w-full h-auto object-contain z-0" />

                <img src={MotherBoardSocketAbierto} alt=""
                     className={`w-full h-auto object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-10 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`} />

                <img src={MotherBoardConProcesadorSocketAbierto} alt=""
                     className={`w-full h-auto object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-20 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`} />

                <img src={MotherBoardConProcesador} alt=""
                     className={`w-full h-auto object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-30 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`} />

                {/* ÁREA DE ACCIÓN (SOCKET) - Pegada a la imagen */}
                <div
                  ref={socketRef}
                  onClick={handleSocketAction}
                  style={getSocketPosition()}
                  className={`absolute flex items-center justify-center rounded-full z-50 pointer-events-auto
                    ${(step === 1 || step === 3) && !isCarrying ? 'bg-green-500/15 border-4 border-green-500 border-dashed cursor-pointer shadow-xl animate-pulse hover:bg-green-500/25' : ''}
                    ${(step === 2 && isCarrying) ? 'bg-green-500/15 border-4 border-green-500 border-dashed scale-110 shadow-[0_0_40px_rgba(34,197,94,0.35)] animate-pulse' : ''}`}
                >
                  {(step === 1 || step === 3) && !isCarrying && (
                    <div className={`absolute ${getSocketMessagePosition()} animate-bounce pointer-events-none`} style={{ zIndex: 10000 }}>
                      <div className="relative bg-green-500 text-white px-3 py-1.5 rounded-xl shadow-xl border-2 border-green-500">
                        <span className="font-black text-[9px] uppercase tracking-widest whitespace-nowrap italic">
                          {step === 1 ? '¡ABRIR SOCKET!' : '¡ASEGURAR CPU!'}
                        </span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
                      </div>
                    </div>
                  )}
                  {step === 2 && isCarrying && (
                    <div className={`absolute ${getSocketMessagePosition()} animate-bounce pointer-events-none`} style={{ zIndex: 10000 }}>
                      <div className="relative bg-green-500 text-white px-3 py-1.5 rounded-xl shadow-xl border-2 border-green-500">
                        <span className="font-black text-[9px] uppercase tracking-widest whitespace-nowrap italic">¡INSERTAR AQUÍ!</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
