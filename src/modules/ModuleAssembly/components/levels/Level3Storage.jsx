import { useState, useRef, useEffect } from "react";
import MascotaDialogo from "../../../../components/MascotaDialogo";
import MotherBoardCon2Ram from "../../../../assets/images/Components/MotherBoard/MotherBoardCon2Ram.png";
import MotherBoardConUnConectorSATA from "../../../../assets/images/Components/MotherBoard/MotherBoardConUnConectorSATA.png";
import MotherBoardSATA1ConSSDSinConectar from "../../../../assets/images/Components/MotherBoard/MotherBoardSATA1ConSSDSinConectar.png";
import MotherBoardSATA1ConSSDConectado from "../../../../assets/images/Components/MotherBoard/MotherBoardSATA1ConSSDConectado.png";
import CableSATA from "../../../../assets/images/Components/Cables/CableSATA.png";
import DiscoSSD from "../../../../assets/images/Components/Disco/DiscoSSD.png";

/**
 * NIVEL 3: ALMACENAMIENTO (SSD + SATA)
 * Flujo mejorado: 
 * 1. Conectar SATA a MB
 * 2. Colocar SSD en el chasis (Muestra MotherBoardSATA1ConSSDSinConectar)
 * 3. Tomar punta del cable SATA y conectarla al puerto del SSD
 * 4. Éxito (Muestra MotherBoardSATA1ConSSDConectado)
 */
export default function Level3Storage({ onBack, onLevelComplete }) {
  // step: 1 (SATA -> MB), 2 (SSD -> Chasis), 3 (Punta SATA -> SSD), 4 (Éxito)
  const [step, setStep] = useState(1);
  const [isCarrying, setIsCarrying] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const trayPieceRef = useRef(null);
  const slotRef = useRef(null);
  const containerRef = useRef(null);

  const instructions = {
    1: { titulo: "Cable de Datos", mensaje: "¡Hola! Primero necesitamos el cable SATA. Tómalo de la bandeja y conéctalo al puerto de la placa base.", mood: "explorador" },
    2: { titulo: "Disco SSD", mensaje: "¡Perfecto! Ahora toma el SSD y colócalo en su lugar dentro del equipo.", mood: "pensando" },
    3: { titulo: "Conexión Final", mensaje: "¡Casi listo! Haz clic en la punta del cable SATA y conéctala al puerto del SSD.", mood: "reparando" },
    4: { titulo: "¡Almacenamiento Listo!", mensaje: "¡Increíble! Has instalado el SSD correctamente. ¡Ahora tenemos mucho espacio para juegos!", mood: "asombrado" }
  };

  // SEGUIMIENTO DEL MOUSE PARA EL ARRASTRE
  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (!isCarrying || !trayPieceRef.current) return;
      
      const referenceElement = trayPieceRef.current.parentElement;
      const rect = referenceElement.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

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
    if (step < 4 && !isCarrying) {
      e.stopPropagation();
      setIsCarrying(true);
    }
  };

  const current = instructions[step];
  const progress = Math.round(((step - 1) / 3) * 100);

  // DETERMINAR IMAGEN DE FONDO SEGÚN EL PASO
  const getMotherboardImage = () => {
    if (step === 1) return MotherBoardCon2Ram;
    if (step === 2) return MotherBoardConUnConectorSATA;
    if (step === 3) return MotherBoardSATA1ConSSDSinConectar;
    return MotherBoardSATA1ConSSDConectado;
  };

  // DETERMINAR POSICIÓN DEL ÁREA DE SOLTADO (TARGET)
  const getSlotPosition = () => {
    if (step === 1) return "top-[90%] left-[68.5%] w-[8%] h-[4%]"; // Puerto SATA en la placa
    if (step === 2) return "top-[68%] left-[45%] w-[25%] h-[20%]"; // Lugar del SSD sobre la placa
    return "top-[73%] left-[54%] w-[8%] h-[10%]"; // Puerto SATA en el SSD (Conexión final)
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
              <span className="text-[#0D7FF2] font-black text-xs uppercase tracking-[2px]">Nivel 3: Almacenamiento</span>
           </div>
        </header>

        <MascotaDialogo titulo={current.titulo} mensaje={current.mensaje} mood={current.mood} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-10">
          
          {/* BANDEJA DE PIEZAS */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-10 rounded-[48px] border-2 border-slate-100 flex flex-col items-center shadow-xl shadow-slate-200/50 flex-1 relative">
              <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[3px] mb-8 bg-slate-50 px-6 py-2 rounded-full">Piezas Disponibles</h3>
              
              <div className="flex-1 flex flex-col items-center justify-center w-full gap-8">
                <div className="flex flex-col gap-4 w-full">
                  {/* CABLE SATA EN BANDEJA (SOLO PASO 1) */}
                  <div 
                    ref={step === 1 ? trayPieceRef : null}
                    onClick={step === 1 ? handlePieceClick : null}
                    style={step === 1 && isCarrying ? { 
                      transform: `translate(${position.x}px, ${position.y}px)`,
                      zIndex: 100, transition: 'none'
                    } : { transition: 'all 0.6s' }}
                    className={`relative w-full h-24 flex items-center justify-center rounded-[24px] border-2
                      ${step === 1 && isCarrying ? 'pointer-events-none border-transparent' : 'bg-slate-50 border-slate-100'}
                      ${step > 1 ? 'opacity-0 scale-90 pointer-events-none' : ''}
                      ${step === 1 ? 'cursor-pointer hover:border-[#0D7FF2]/40 hover:bg-white shadow-lg' : 'opacity-40'}`}
                  >
                    <img src={CableSATA} alt="SATA" className="w-full h-full object-contain p-4" />
                    {step === 1 && !isCarrying && (
                      <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#0D7FF2] rounded-lg shadow-xl animate-bounce border-2 border-white">
                         <span className="text-white font-black text-[8px] uppercase">RECOGER</span>
                      </div>
                    )}
                  </div>

                  {/* DISCO SSD EN BANDEJA (SOLO PASO 2) */}
                  <div 
                    ref={step === 2 ? trayPieceRef : null}
                    onClick={step === 2 ? handlePieceClick : null}
                    style={step === 2 && isCarrying ? { 
                      transform: `translate(${position.x}px, ${position.y}px)`,
                      zIndex: 100, transition: 'none'
                    } : { transition: 'all 0.6s' }}
                    className={`relative w-full h-32 flex items-center justify-center rounded-[24px] border-2
                      ${step === 2 && isCarrying ? 'pointer-events-none border-transparent' : 'bg-slate-50 border-slate-100'}
                      ${step > 2 || step < 2 ? 'opacity-0 scale-90 pointer-events-none' : ''}
                      ${step === 2 ? 'cursor-pointer hover:border-[#0D7FF2]/40 hover:bg-white shadow-lg' : ''}`}
                  >
                    <img src={DiscoSSD} alt="SSD" className="w-full h-full object-contain p-4" />
                    {step === 2 && !isCarrying && (
                      <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#0D7FF2] rounded-lg shadow-xl animate-bounce border-2 border-white">
                         <span className="text-white font-black text-[8px] uppercase">RECOGER DISCO</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* STATUS BAR */}
                <div className="w-full bg-slate-50 p-6 rounded-[32px] border-2 border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</span>
                    <div className="px-3 py-1 bg-blue-100 text-[#0D7FF2] rounded-full text-[8px] font-black uppercase">
                      {step === 4 ? 'CONECTADO' : `PASO ${step}/3`}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step > i ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MESA DE TRABAJO INTERACTIVA */}
          <div className="lg:col-span-2 relative bg-white p-8 rounded-[56px] shadow-2xl shadow-slate-200 border-2 border-slate-50 overflow-hidden flex items-center justify-center min-h-[500px]">
            <img 
              src={getMotherboardImage()} 
              alt="Placa Base" 
              className="w-full h-auto rounded-[40px] shadow-2xl transition-all duration-700" 
            />

            {/* PASO 3: INTERACCIÓN CON LA PUNTA DEL CABLE QUE YA ESTÁ EN LA PLACA */}
            {step === 3 && !isCarrying && (
              <div 
                ref={trayPieceRef}
                onClick={handlePieceClick}
                className="absolute top-[68%] left-[74%] w-16 h-16 cursor-pointer z-30 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-[#0D7FF2]/20 rounded-full animate-ping"></div>
                <div className="bg-[#0D7FF2] w-6 h-6 rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-125"></div>
                <div className="absolute -top-12 bg-white px-3 py-1 rounded-lg shadow-md border-2 border-[#0D7FF2] whitespace-nowrap">
                  <span className="text-[10px] font-black text-[#0D7FF2] uppercase">Tomar Punta del Cable</span>
                </div>
              </div>
            )}

            {/* ELEMENTO QUE SE ARRASTRA EN EL PASO 3 (Visual de la punta del cable) */}
            {step === 3 && isCarrying && (
              <div 
                style={{ 
                  transform: `translate(${position.x}px, ${position.y}px)`, 
                  zIndex: 100,
                  left: '50%',
                  top: '50%'
                }}
                className="absolute w-16 h-16 pointer-events-none flex items-center justify-center"
              >
                <div className="relative">
                  <img src={CableSATA} alt="Punta" className="w-14 h-14 object-contain rotate-[135deg] drop-shadow-2xl scale-125" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#0D7FF2]/30 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>
            )}

            {/* ÁREA TARGET (HITBOX GRANDE, VISUAL PEQUEÑO) */}
            <div 
              ref={slotRef}
              className={`absolute ${getSlotPosition()} flex items-center justify-center z-20`}
            >
              {/* Este es el indicador visual real (más pequeño que el hitbox) */}
              <div className={`flex items-center justify-center rounded-xl transition-all duration-700
                ${step === 2 ? 'w-full h-full' : 'w-[50%] h-[50%]'} 
                ${isCarrying ? 'bg-[#0D7FF2]/20 border-[4px] border-[#0D7FF2] border-dashed scale-110 shadow-[0_0_50px_rgba(13,127,242,0.4)] animate-pulse' : ''}`}
              >
                {isCarrying && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
                    <div className="relative">
                      <span className="text-[#0D7FF2] font-black text-[9px] uppercase bg-white px-4 py-2 rounded-xl shadow-xl border-2 border-[#0D7FF2] whitespace-nowrap">
                        {step === 1 ? 'CONECTAR A PLACA' : step === 2 ? 'POSICIONAR SSD' : 'CONECTAR AL SSD'}
                      </span>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#0D7FF2] rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN FINAL */}
        {step === 4 && (
          <div className="mt-12 flex justify-center animate-in slide-in-from-bottom-8 duration-700 pb-20">
            <button onClick={onLevelComplete} className="px-20 py-8 bg-[#0D7FF2] text-white rounded-[32px] font-black text-2xl hover:bg-slate-900 transition-all hover:scale-105 shadow-xl flex items-center gap-6 group">
              <span>¡SIGUIENTE NIVEL!</span>
              <span className="text-3xl transition-transform group-hover:translate-x-3">🚀</span>
            </button>
          </div>
        )}

        {/* BARRA DE PROGRESO INFERIOR */}
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
