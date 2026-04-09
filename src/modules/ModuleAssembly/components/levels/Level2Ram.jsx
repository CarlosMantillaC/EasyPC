import { useRef } from "react";
import { useAssemblyLevel } from "../../services/assemblyUtils";
import AssemblyLayout from "../AssemblyLayout";
import AssemblyBoard from "../AssemblyBoard";
import { PROGRESS_MESSAGES } from "../../../ModulePieces/services/piecesConstants";

import MotherBoardConProcesador from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesador.png";
import MotherBoardCon1Ram from "../../../../assets/images/Components/MotherBoard/MotherBoardCon1Ram.png";
import MotherBoardCon2Ram from "../../../../assets/images/Components/MotherBoard/MotherBoardCon2Ram.png";
import Ram1 from "../../../../assets/images/Components/Ram/Ram1.png";
import RamVertical from "../../../../assets/images/Components/Ram/RamVertical.png";
import MemoryIcon from "../../../ModulePieces/components/icons/MemoryIcon";

export default function Level2Ram({ onBack, onLevelComplete, user }) {
  const {
    step,
    setStep,
    isCarrying,
    setIsCarrying,
    mousePos,
    isMobile,
    scale,
    progressPercent
  } = useAssemblyLevel({ stepsCount: 2, onLevelComplete });

  const slotRef = useRef(null);
  const boardContainerRef = useRef(null);

  const instructions = {
    1: { mensaje: "Toma la primera memoria RAM de la bandeja para empezar la instalación.", mood: "hablando" },
    2: { mensaje: isCarrying ? "¡Excelente! Suéltalo en el área resaltada." : "Recoge la segunda memoria RAM. ¡Vamos a activar el Dual Channel!", mood: "asombrado" },
    3: { mensaje: "¡Increíble! Has activado el Dual Channel. Tu PC ahora es mucho más potente.", mood: "bienhecho" }
  };

  const parts = [
    { 
      id: 'ram1', 
      image: Ram1, 
      availableStep: 1,
      label: 'RAM 1',
      carryImage: <img src={RamVertical} alt="" className="w-full h-full object-contain scale-y-[1.8] scale-x-[1.5]" />,
      className: "w-40 h-40"
    },
    { 
      id: 'ram2', 
      image: Ram1, 
      availableStep: 2,
      label: 'RAM 2',
      carryImage: <img src={RamVertical} alt="" className="w-full h-full object-contain scale-y-[1.8] scale-x-[1.5]" />,
      className: "w-40 h-40"
    }
  ];

  const handlePickUp = (id, e) => {
    if ((step === 1 || step === 2) && !isCarrying) {
      if (isMobile) {
        setStep(prev => prev + 1);
      } else {
        const part = parts.find(p => p.id === id);
        setIsCarrying({ id, image: part.carryImage, className: part.className });
      }
    }
  };

  const handleContainerClick = (e) => {
    if (!isCarrying) return;
    const slotRect = slotRef.current?.getBoundingClientRect();
    if (slotRect && e.clientX >= slotRect.left && e.clientX <= slotRect.right && e.clientY >= slotRect.top && e.clientY <= slotRect.bottom) {
      setIsCarrying(null);
      setStep((prev) => prev + 1);
    } else {
      setIsCarrying(null);
    }
  };

  const getSlotPosition = () => {
    // Mapping percentages to 800x571
    // Original: 
    // case 1: return { top: '11%', left: '72%', width: '4%', height: '42%' };
    // case 2: return { top: '11%', left: '76%', width: '4%', height: '42%' };
    switch (step) {
      case 1: return { top: '60px', left: '575px', width: '32px', height: '240px' };
      case 2: return { top: '60px', left: '610px', width: '32px', height: '240px' };
      default: return { top: '80px', left: '560px', width: '64px', height: '220px' };
    }
  };

  const progressMessage = progressPercent === 0 ? PROGRESS_MESSAGES.start : progressPercent === 100 ? PROGRESS_MESSAGES.complete : PROGRESS_MESSAGES.default;

  return (
    <AssemblyLayout
      onBack={onBack}
      icon={MemoryIcon}
      title="La Memoria RAM"
      subtitle="Ensamble del Componente"
      user={user}
      levelNumber={2}
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
           <img src={MotherBoardConProcesador} alt="" className="w-full h-full object-contain z-0" />

           <img src={MotherBoardCon1Ram} alt=""
                className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-10 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`} />

           <img src={MotherBoardCon2Ram} alt=""
                className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out absolute inset-0 z-20 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        <div
          ref={slotRef}
          style={getSlotPosition()}
          className={`absolute flex items-center justify-center rounded-lg z-50 pointer-events-auto
            ${step < 3 && isCarrying ? 'bg-green-500/15 border-4 border-green-500 border-dashed scale-110 shadow-[0_0_40px_rgba(34,197,94,0.35)] animate-pulse' : ''}`}
        >
          {step < 3 && isCarrying && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none" style={{ zIndex: 10000 }}>
              <div className="relative bg-green-500 text-white px-3 py-1.5 rounded-xl shadow-xl border-2 border-green-500">
                <span className="font-black text-[9px] uppercase tracking-widest whitespace-nowrap italic">¡INSERTAR AQUÍ!</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
              </div>
            </div>
          )}
        </div>

        {step === 3 && (
          <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17L4 12"/></svg>
            </div>
            <p className="text-green-600 font-black text-[10px] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-100">DUAL CHANNEL OK</p>
          </div>
        )}
      </AssemblyBoard>
    </AssemblyLayout>
  );
}
