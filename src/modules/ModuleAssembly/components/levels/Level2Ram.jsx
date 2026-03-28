import { useState, useRef, useEffect } from "react";
import MascotaDialogo from "../../../../components/MascotaDialogo";
import MotherBoardSinNada from "../../../../assets/images/Components/MotherBoard/MotherBoardSinNada.png";
import MotherBoardCon1Ram from "../../../../assets/images/Components/MotherBoard/MotherBoardCon1Ram.png";
import MotherBoardCon2Ram from "../../../../assets/images/Components/MotherBoard/MotherBoardCon2Ram.png";
import Ram1 from "../../../../assets/images/Components/Ram/Ram1.png";
import RamVertical from "../../../../assets/images/Components/Ram/RamVertical.png";

/**
 * NIVEL 2: MEMORIA RAM (FLUJO REALISTA CON IMÁGENES DINÁMICAS)
 */
export default function Level2Ram({ onBack, onLevelComplete }) {
  const [step, setStep] = useState(1); // 1: Poner RAM 1, 2: Poner RAM 2, 3: Éxito
  const [isCarrying, setIsCarrying] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const trayPieceRef = useRef(null);
  const slotRef = useRef(null);
  const containerRef = useRef(null);

  const instructions = {
    1: { titulo: "Primer Canal", mensaje: "¡Hola! Toma la primera memoria RAM de la bandeja para empezar la instalación.", mood: "hablando" },
    2: { titulo: "Dual Channel", mensaje: "¡Muy bien! Ahora toma la segunda memoria. Instalar dos módulos duplica la velocidad.", mood: "asombrado" },
    3: { titulo: "¡Memoria Lista!", mensaje: "¡Increíble! Has activado el Dual Channel. Tu PC ahora es mucho más potente.", mood: "bienhecho" }
  };

  // SEGUIMIENTO DEL MOUSE ULTRA-FLUIDO
  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (!isCarrying || !trayPieceRef.current) return;
      const trayContainer = trayPieceRef.current.parentElement;
      const trayRect = trayContainer.getBoundingClientRect();
      
      const centerX = trayRect.left + trayRect.width / 2;
      const centerY = trayRect.top + trayRect.height / 2;

      // Movimiento directo sin suavizados intermedios
      setPosition({ 
        x: e.clientX - centerX, 
        y: e.clientY - centerY 
      });
    };

    if (isCarrying) {
      window.addEventListener("pointermove", handleGlobalMove, { passive: true });
    }
    return () => window.removeEventListener("pointermove", handleGlobalMove);
  }, [isCarrying]);

  const handleContainerClick = (e) => {
    if (!isCarrying) return;

    const slotRect = slotRef.current.getBoundingClientRect();
    const isOverSlot = (
      e.clientX >= slotRect.left &&
      e.clientX <= slotRect.right &&
      e.clientY >= slotRect.top &&
      e.clientY <= slotRect.bottom
    );

    if (isOverSlot) {
      setStep(prev => prev + 1);
      setIsCarrying(false);
      setPosition({ x: 0, y: 0 });
    } else {
      setIsCarrying(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handlePieceClick = (e) => {
    if (step < 3 && !isCarrying) {
      e.stopPropagation();
      const trayContainer = trayPieceRef.current.parentElement;
      const trayRect = trayContainer.getBoundingClientRect();
      const centerX = trayRect.left + trayRect.width / 2;
      const centerY = trayRect.top + trayRect.height / 2;
      setPosition({ x: e.clientX - centerX, y: e.clientY - centerY });
      setIsCarrying(true);
    }
  };

  const current = instructions[step];
  const progress = Math.round(((step - 1) / 2) * 100);

  // DETERMINAR IMAGEN DE PLACA
  const getMotherboardImage = () => {
    if (step === 1) return MotherBoardSinNada;
    if (step === 2) return MotherBoardCon1Ram;
    return MotherBoardCon2Ram;
  };

  // DETERMINAR POSICIÓN DEL SLOT ACTIVO
  const getSlotPosition = () => {
    if (step === 1) return "top-[14%] left-[70%] w-[4%] h-[38%]";
    return "top-[14%] left-[73.5%] w-[4%] h-[38%]";
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className={`min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans select-none overflow-hidden ${isCarrying ? 'cursor-none' : ''}`}
    >
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 flex justify-between items-center bg-white p-5 rounded-[32px] shadow-sm border border-slate-100">
           <button onClick={onBack} className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-[#0D7FF2] transition-all shadow-lg group">
             <span className="transition-transform group-hover:-translate-x-1">←</span> SALIR AL TALLER
           </button>
           <div className="bg-[#0D7FF2]/10 px-6 py-2 rounded-2xl border border-[#0D7FF2]/20">
              <span className="text-[#0D7FF2] font-black text-xs uppercase tracking-[2px]">Nivel 2: Memoria RAM</span>
           </div>
        </header>

        <MascotaDialogo titulo={current.titulo} mensaje={current.mensaje} mood={current.mood} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-10">
          
          {/* BANDEJA DE PIEZAS */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-10 rounded-[48px] border-2 border-slate-100 flex flex-col items-center shadow-xl shadow-slate-200/50 flex-1 relative">
              <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[3px] mb-8 bg-slate-50 px-6 py-2 rounded-full">Bandeja de Memorias</h3>
              
              <div className="flex-1 flex flex-col items-center justify-center w-full gap-8">
                {/* REPRESENTACIÓN DE LAS 2 RAM EN LA BANDEJA */}
                <div className="flex flex-col gap-4 w-full">
                  {[1, 2].map((i) => (
                    <div 
                      key={i}
                      ref={step === i ? trayPieceRef : null}
                      onClick={step === i ? handlePieceClick : null}
                      style={step === i && isCarrying ? { 
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        zIndex: 100,
                        transition: 'none' // Movimiento instantáneo
                      } : {
                        transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                      }}
                      className={`relative w-full h-20 flex items-center justify-center rounded-[24px] border-2
                        ${step === i && isCarrying ? 'pointer-events-none border-transparent' : 'bg-slate-50 border-slate-100'}
                        ${step > i ? 'opacity-0 scale-90 pointer-events-none' : ''}
                        ${step < i ? 'opacity-40' : 'cursor-pointer hover:border-[#0D7FF2]/40 hover:bg-white'}
                        ${step === i && !isCarrying ? 'shadow-lg' : ''}`}
                    >
                      {/* Imagen cambia a Vertical al ser agarrada */}
                      <img 
                        src={step === i && isCarrying ? RamVertical : Ram1} 
                        alt={`RAM ${i}`} 
                        className={`w-full h-full object-contain pointer-events-none transition-transform 
                          ${step === i && isCarrying 
                            ? 'scale-y-[4.5] scale-x-[3.3] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]' 
                            : 'p-4'}`} 
                      />
                      
                      {step === i && !isCarrying && (
                        <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#0D7FF2] rounded-lg shadow-xl animate-bounce border-2 border-white">
                           <span className="text-white font-black text-[8px] uppercase">RECOGER</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* DIAGNÓSTICO TÉCNICO */}
                <div className="w-full bg-slate-50 p-6 rounded-[32px] border-2 border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hardware Status</span>
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${step === 3 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-[#0D7FF2]'}`}>
                      {step === 3 ? 'DUAL CHANNEL OK' : `PENDIENTE ${3-step}/2`}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step > 1 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                    <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step > 2 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[48px] text-white shadow-2xl">
               <h4 className="font-black text-[10px] uppercase tracking-[2px] mb-3 text-[#0D7FF2]">Dato de Isaac:</h4>
               <p className="font-bold text-sm leading-relaxed opacity-80">
                 ¡El Dual Channel permite que el procesador acceda a los datos el doble de rápido!
               </p>
            </div>
          </div>

          {/* MESA DE TRABAJO */}
          <div className="lg:col-span-2 relative bg-white p-8 rounded-[56px] shadow-2xl shadow-slate-200 border-2 border-slate-50 overflow-hidden flex items-center justify-center min-h-[500px]">
            <img 
              src={getMotherboardImage()} 
              alt="Placa Base" 
              className="w-full h-auto rounded-[40px] shadow-2xl transition-all duration-700" 
            />

            {/* ÁREA TARGET (SLOT DINÁMICO) */}
            <div 
              ref={slotRef}
              className={`absolute ${getSlotPosition()} flex items-center justify-center rounded-xl transition-all duration-700 z-20 
                ${(step < 3 && isCarrying) ? 'bg-[#0D7FF2]/20 border-[4px] border-[#0D7FF2] border-dashed scale-110 shadow-[0_0_50px_rgba(13,127,242,0.4)] animate-pulse' : ''}`}
            >
              {step < 3 && isCarrying && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
                  <div className="relative">
                    <span className="text-[#0D7FF2] font-black text-[9px] uppercase bg-white px-4 py-2 rounded-xl shadow-xl border-2 border-[#0D7FF2] whitespace-nowrap">
                      ¡INSERTAR AQUÍ!
                    </span>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#0D7FF2] rotate-45"></div>
                  </div>
                </div>
              )}
            </div>

            {step === 3 && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-green-500/10 to-transparent animate-in fade-in duration-1000"></div>
            )}
          </div>
        </div>

        {step === 3 && (
          <div className="mt-12 flex justify-center animate-in slide-in-from-bottom-8 duration-700">
            <button onClick={onLevelComplete} className="px-20 py-8 bg-[#0D7FF2] text-white rounded-[32px] font-black text-2xl hover:bg-slate-900 transition-all hover:scale-105 shadow-xl flex items-center gap-6 group">
              <span>¡SIGUIENTE NIVEL!</span>
              <span className="text-3xl transition-transform group-hover:translate-x-3">🚀</span>
            </button>
          </div>
        )}

        {/* BARRA DE PROGRESO */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="flex justify-between items-end mb-3">
             <span className="text-slate-400 font-black text-[10px] uppercase tracking-[2px]">Progreso de Instalación</span>
             <span className="text-[#0D7FF2] font-black text-sm">{progress}%</span>
          </div>
          <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
             <div 
               className="h-full bg-gradient-to-r from-[#0D7FF2] to-[#3b82f6] rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(13,127,242,0.4)]"
               style={{ width: `${progress}%` }}
             ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
