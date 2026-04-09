import { useRef } from "react";
import { useAssemblyLevel } from "../../services/assemblyUtils";
import AssemblyLayout from "../AssemblyLayout";
import AssemblyBoard from "../AssemblyBoard";
import { PROGRESS_MESSAGES } from "../../../ModulePieces/services/piecesConstants";

import MotherBoardSinNada from "../../../../assets/images/Components/MotherBoard/MotherBoardSinNada.png";
import MotherBoardSocketAbierto from "../../../../assets/images/Components/MotherBoard/MotherBoardSocketAbierto.png";
import MotherBoardConProcesadorSocketAbierto from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesadorSocketAbierto.png";
import MotherBoardConProcesador from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesador.png";
import Procesador1 from "../../../../assets/images/Components/Procesador/Procesador1.png";
import BrainIcon from "../../../ModulePieces/components/icons/BrainIcon";

export default function Level1Motherboard({ onBack, onLevelComplete, user }) {
  const {
    step,
    setStep,
    isCarrying,
    setIsCarrying,
    mousePos,
    isMobile,
    scale,
    progressPercent
  } = useAssemblyLevel({ stepsCount: 3, onLevelComplete });

  const socketRef = useRef(null);
  const boardContainerRef = useRef(null);

  const instructions = {
    1: { mensaje: "Haz clic en la palanca para abrir el socket del procesador.", mood: "hablando" },
    2: { mensaje: isCarrying ? "¡Excelente! Suéltalo en el área resaltada." : "Recoge el CPU de la bandeja lateral.", mood: "asombrado" },
    3: { mensaje: "Baja la palanca para asegurar el procesador en su lugar.", mood: "reparando" },
    4: { mensaje: "¡Increíble! El cerebro del PC ha sido instalado correctamente.", mood: "bienhecho" }
  };

  const parts = [
    { 
      id: 'cpu', 
      image: Procesador1, 
      availableStep: 2,
      label: 'Procesador',
      className: "w-24 h-24"
    }
  ];

  const handlePickUp = (id, e) => {
    if (step === 2 && !isCarrying) {
      if (isMobile) {
        setIsCarrying(false);
        setStep(3);
      } else {
        setIsCarrying({ id, image: Procesador1, className: "w-24 h-24" });
      }
    }
  };

  const handleContainerClick = (e) => {
    if (step === 1 || step === 3) {
      const socketRect = socketRef.current?.getBoundingClientRect();
      if (socketRect && e.clientX >= socketRect.left && e.clientX <= socketRect.right && e.clientY >= socketRect.top && e.clientY <= socketRect.bottom) {
        setStep(prev => prev + 1);
        return;
      }
    }

    if (!isCarrying) return;
    
    const socketRect = socketRef.current?.getBoundingClientRect();
    if (socketRect && e.clientX >= socketRect.left && e.clientX <= socketRect.right && e.clientY >= socketRect.top && e.clientY <= socketRect.bottom) {
      setIsCarrying(null);
      setStep(3);
    } else {
      setIsCarrying(null);
    }
  };

  const getSocketPosition = () => {
    // These percentages need to be mapped to the 800x571 coordinate system or kept as percentages if handled correctly.
    // Level 1 original used percentages on a relative container.
    // In AssemblyBoard, the container is 800x571.
    switch (step) {
      case 1: return { top: '215px', left: '455px', width: '50px', height: '50px' };
      case 2: return { top: '135px', left: '345px', width: '100px', height: '100px' };
      case 3: return { top: '5px', left: '455px', width: '50px', height: '50px' };
      default: return { top: '140px', left: '345px', width: '97px', height: '97px' };
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

  const progressMessage = progressPercent === 0 ? PROGRESS_MESSAGES.start : progressPercent === 100 ? PROGRESS_MESSAGES.complete : PROGRESS_MESSAGES.default;

  return (
    <AssemblyLayout
      onBack={onBack}
      icon={BrainIcon}
      title="El Procesador"
      subtitle="Ensamble del Componente"
      user={user}
      levelNumber={1}
      progress={progressPercent}
      progressMessage={progressMessage}
      instruction={instructions[step]}
      parts={parts}
      activeStep={step}
      isMobile={isMobile}
      onPickUp={handlePickUp}
      isCarrying={isCarrying}
      mousePos={mousePos}
      onContainerClick={handleContainerClick}
    >
      <AssemblyBoard scale={scale} boardContainerRef={boardContainerRef}>
        <div className="absolute left-[40px] top-[30px] w-[720px] h-[510px] rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-50">
           <img src={MotherBoardSinNada} alt="" className="w-full h-full object-contain z-0" />

           <img src={MotherBoardSocketAbierto} alt=""
                className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-10 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`} />

           <img src={MotherBoardConProcesadorSocketAbierto} alt=""
                className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-20 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`} />

           <img src={MotherBoardConProcesador} alt=""
                className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-30 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        <div
          ref={socketRef}
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
      </AssemblyBoard>
    </AssemblyLayout>
  );
}
