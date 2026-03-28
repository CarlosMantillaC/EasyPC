import { useState, useRef, useEffect } from "react";
import MascotaDialogo from "../../../../components/MascotaDialogo";
import MotherBoardSinNada from "../../../../assets/images/Components/MotherBoard/MotherBoardSinNada.png";
import MotherBoardSocketAbierto from "../../../../assets/images/Components/MotherBoard/MotherBoardSocketAbierto.png";
import MotherBoardConProcesadorSocketAbierto from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesadorSocketAbierto.png";
import MotherBoardConProcesador from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesador.png";
import Procesador1 from "../../../../assets/images/Components/Procesador/Procesador1.png";
import { StarIcon } from "../../../../shared/components/StarIcon";


/**
 * NIVEL 1: EL PROCESADOR (FLUJO COMPLETO CON NUEVAS IMÁGENES)
 */
export default function Level1Motherboard({ onBack, onLevelComplete }) {
  const [step, setStep] = useState(1); // 1: Abrir, 2: Cargar CPU, 3: Cerrar Socket, 4: Éxito
  const [isCarrying, setIsCarrying] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const trayPieceRef = useRef(null);
  const socketRef = useRef(null);
  const containerRef = useRef(null);

  const instructions = {
    1: { titulo: "Prepara el Terreno", mensaje: "¡Hola! Toca el socket en el centro para abrirlo y preparar la instalación.", mood: "hablando" },
    2: { titulo: "Sujeta el Cerebro", mensaje: isCarrying ? "¡Muy bien! Ahora haz clic sobre el socket para colocarlo." : "Haz clic en el procesador para recogerlo.", mood: "asombrado" },
    3: { titulo: "Asegura la Pieza", mensaje: "¡Ya casi está! Toca de nuevo el socket para cerrar la palanca y asegurarlo.", mood: "reparando" },
    4: { titulo: "¡Perfecto!", mensaje: "Has instalado el procesador correctamente. ¡Ya tenemos cerebro!", mood: "bienhecho" }
  };

  // SEGUIMIENTO DEL MOUSE
  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (!isCarrying || !trayPieceRef.current) return;

      const trayContainer = trayPieceRef.current.parentElement;
      const trayRect = trayContainer.getBoundingClientRect();
      
      // Calculamos el centro del contenedor donde "nace" la pieza
      const centerX = trayRect.left + trayRect.width / 2;
      const centerY = trayRect.top + trayRect.height / 2;

      // El desplazamiento es la distancia entre el mouse y ese centro inicial
      const newX = e.clientX - centerX;
      const newY = e.clientY - centerY;

      setPosition({ x: newX, y: newY });
    };

    if (isCarrying) {
      window.addEventListener("pointermove", handleGlobalMove);
    }
    return () => window.removeEventListener("pointermove", handleGlobalMove);
  }, [isCarrying]);

  const handleContainerClick = (e) => {
    if (!isCarrying) return;

    const socketRect = socketRef.current.getBoundingClientRect();
    const isOverSocket = (
      e.clientX >= socketRect.left &&
      e.clientX <= socketRect.right &&
      e.clientY >= socketRect.top &&
      e.clientY <= socketRect.bottom
    );

    if (isOverSocket) {
      setIsCarrying(false);
      setStep(3); // Cambia al paso de cerrar socket
    } else {
      setIsCarrying(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handlePieceClick = (e) => {
    if (step === 2 && !isCarrying) {
      e.stopPropagation();
      
      // Calculamos posición inicial inmediatamente para evitar saltos
      const trayContainer = trayPieceRef.current.parentElement;
      const trayRect = trayContainer.getBoundingClientRect();
      const centerX = trayRect.left + trayRect.width / 2;
      const centerY = trayRect.top + trayRect.height / 2;
      
      setPosition({ 
        x: e.clientX - centerX, 
        y: e.clientY - centerY 
      });
      
      setIsCarrying(true);
    }
  };

  const handleSocketAction = () => {
    if (step === 1) {
      setStep(2); // Abre el socket
    } else if (step === 3) {
      setStep(4); // Cierra el socket y termina
    }
  };

  const current = instructions[step];

  // DETERMINAR POSICIÓN DEL SOCKET SEGÚN EL PASO
  const getSocketPosition = () => {
    switch (step) {
      case 1:
        return "top-[40%] left-[58%] w-[5%] h-[5%]"; // POSICIÓN 1: ABRIR (PALANCA)
      case 2:
        return "top-[26%] left-[44%] w-[17%] h-[15%]"; // POSICIÓN 2: COLOCAR PROCESADOR (CENTRO)
      case 3:
        return "top-[6%] left-[60%] w-[5%] h-[5%]"; // POSICIÓN 3: CERRAR (PALANCA)
      default:
        return "top-[26%] left-[44%] w-[17%] h-[15%]";
    }
  };

  // DETERMINAR IMAGEN DE PLACA
  const getMotherboardImage = () => {
    if (step === 1) return MotherBoardSinNada;
    if (step === 2) return MotherBoardSocketAbierto;
    if (step === 3) return MotherBoardConProcesadorSocketAbierto;
    return MotherBoardConProcesador;
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
              <span className="text-[#0D7FF2] font-black text-xs uppercase tracking-[2px]">El Procesador</span>
           </div>
        </header>

        <MascotaDialogo titulo={current.titulo} mensaje={current.mensaje} mood={current.mood} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-10">
          
          {/* BANDEJA DE PIEZAS */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-10 rounded-[48px] border-2 border-slate-100 flex flex-col items-center shadow-xl shadow-slate-200/50 flex-1 relative">
              <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[3px] mb-8 bg-slate-50 px-6 py-2 rounded-full">Bandeja de Piezas</h3>
              
              <div className="flex-1 flex items-center justify-center w-full">
                {step < 3 && (
                  <div 
                    ref={trayPieceRef}
                    onClick={handlePieceClick}
                    style={{ 
                      transform: `translate(${position.x}px, ${position.y}px)`,
                      transition: isCarrying ? 'none' : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      zIndex: isCarrying ? 100 : 10
                    }}
                    className={`relative w-48 h-48 flex items-center justify-center transition-all duration-300
                      ${isCarrying ? 'p-0 pointer-events-none' : 'p-8 bg-white rounded-[40px] border-2 shadow-lg cursor-pointer hover:scale-105 border-[#0D7FF2]/20'}
                      ${step === 1 ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                  >
                    <img 
                      src={Procesador1} 
                      alt="Procesador" 
                      className={`w-full h-full object-contain pointer-events-none transition-transform ${isCarrying ? 'scale-65 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]' : ''}`} 
                    />
                    {step === 2 && !isCarrying && (
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#0D7FF2] rounded-2xl flex items-center justify-center shadow-xl animate-bounce border-4 border-white">
                         <StarIcon className="w-6 h-6 text-white" filled />
                      </div>
                    )}
                  </div>
                )}
                
                {step >= 3 && (
                  <div className="flex flex-col items-center justify-center w-full animate-in zoom-in duration-500">
                    <div className={`relative p-8 rounded-[32px] bg-white border-2 flex flex-col items-center shadow-2xl transition-all duration-500 ${step === 4 ? 'border-green-500 shadow-green-100' : 'border-[#0D7FF2] shadow-blue-100 animate-pulse'}`}>
                      
                      {/* ICONO VECTORIAL DE VERIFICACIÓN */}
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-700 ${step === 4 ? 'bg-green-500 rotate-[360deg]' : 'bg-[#0D7FF2]'}`}>
                        {step === 4 ? (
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>

                      <h4 className={`text-[12px] font-black uppercase tracking-[2px] mb-1 ${step === 4 ? 'text-green-600' : 'text-[#0D7FF2]'}`}>
                        {step === 4 ? 'PROCESADOR ASEGURADO' : 'PROCESADOR DETECTADO'}
                      </h4>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                        {step === 4 ? 'Componente listo' : 'Esperando al cierre del socket...'}
                      </p>

                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* MESA DE TRABAJO */}
          <div className="lg:col-span-2 relative bg-white p-8 rounded-[56px] shadow-2xl shadow-slate-200 border-2 border-slate-50 overflow-hidden flex items-center justify-center min-h-[500px]">
            <img 
              src={getMotherboardImage()} 
              alt="Placa Base" 
              className="w-full h-auto rounded-[40px] shadow-2xl transition-all duration-500" 
            />

            {/* ÁREA TARGET (SOCKET) */}
            <div 
              ref={socketRef}
              onClick={handleSocketAction}
              className={`absolute ${getSocketPosition()} flex items-center justify-center rounded-[24px] transition-all duration-700 z-20 
                ${(step === 1 || step === 3) ? 'bg-[#0D7FF2]/20 border-[4px] border-[#0D7FF2] border-dashed cursor-pointer shadow-[0_0_50px_rgba(13,127,242,0.4)] animate-pulse' : ''}
                ${isCarrying ? 'bg-[#0D7FF2]/20 border-[4px] border-[#0D7FF2] border-dashed scale-110 shadow-[0_0_50px_rgba(13,127,242,0.3)]' : ''}`}
            >
              {(step === 1 || step === 3) && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
                  <div className="relative">
                    <span className="text-[#0D7FF2] font-black text-[9px] uppercase bg-white px-3 py-1.5 rounded-lg shadow-xl border border-[#0D7FF2] whitespace-nowrap">
                      {step === 1 ? '¡TOCA PARA ABRIR!' : '¡TOCA PARA CERRAR!'}
                    </span>
                    {/* Flechita del cartel */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#0D7FF2] rotate-45"></div>
                  </div>
                </div>
              )}
            </div>

            {step === 4 && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-green-500/10 to-transparent animate-in fade-in duration-1000"></div>
            )}
          </div>
        </div>

        {step === 4 && (
          <div className="mt-12 flex justify-center animate-in slide-in-from-bottom-8 duration-700">
            <button onClick={onLevelComplete} className="px-20 py-8 bg-[#0D7FF2] text-white rounded-[32px] font-black text-2xl hover:bg-slate-900 transition-all hover:scale-105 shadow-xl flex items-center gap-6 group">
              <span>¡SIGUIENTE NIVEL!</span>
              <span className="text-3xl transition-transform group-hover:translate-x-3"></span>
            </button>
          </div>
        )}

        {/* BARRA DE PROGRESO (ABRAZO INFERIOR) */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="flex justify-between items-end mb-3">
             <span className="text-slate-400 font-black text-[10px] uppercase tracking-[2px]">Progreso de Instalación</span>
             <span className="text-[#0D7FF2] font-black text-sm">{Math.round(((step - 1) / 3) * 100)}%</span>
          </div>
          <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
             <div 
               className="h-full bg-gradient-to-r from-[#0D7FF2] to-[#3b82f6] rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(13,127,242,0.4)]"
               style={{ width: `${((step - 1) / 3) * 100}%` }}
             ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
