import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAssemblyLevel } from "../../services/assemblyUtils";
import AssemblyLayout from "../AssemblyLayout";
import AssemblyBoard from "../AssemblyBoard";
import SataCable from "./SataCable";

import MotherBoardCon2Ram from "../../../../assets/images/Components/MotherBoard/MotherBoardCon2Ram.png";
import DiscoSSD from "../../../../assets/images/Components/Disco/DiscoSSD.png";
import PuntaCableSata1 from "../../../../assets/images/Components/Cables/PuntaCableSata1.png";
import StorageIcon from "../../../ModulePieces/components/icons/StorageIcon";

const SSD_POSITION = { x: 580, y: 200 };
const CABLE_START_POSITION = { x: 400, y: 380 };
const CABLE_END_POSITION = { x: 580, y: 210 };

export default function Level3Storage({ onBack, onLevelComplete, user }) {
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

  const [cableConnectedToSSD, setCableConnectedToSSD] = useState(false);
  const boardContainerRef = useRef(null);
  const slotRef = useRef(null);
  const cableSlotRef = useRef(null);
  const ssdCableSlotRef = useRef(null);

  const instructions = {
    1: { mensaje: "Toma el SSD y colócalo en la bahía lateral derecha.", mood: "explorador" },
    2: { mensaje: isCarrying?.id === 'cable' ? "¡Excelente! Suéltalo en el área verde resaltada." : "¡Bien! Conecta el cable SATA al puerto de la placa base.", mood: "pensando" },
    3: { mensaje: "Haz clic en el área verde del SSD para conectar el cable.", mood: "reparando" },
    4: { mensaje: "¡Increíble! SSD instalado y listo.", mood: "asombrado" }
  };

  const parts = [
    { 
      id: 'ssd', 
      image: DiscoSSD, 
      availableStep: 1,
      label: 'SSD',
      className: "w-16 h-16 lg:w-24 lg:h-24"
    },
    { 
      id: 'cable', 
      image: (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <img src={PuntaCableSata1} className="w-5 h-5 lg:w-6 lg:h-6 -rotate-45" />
            <div className="w-5 h-1 lg:w-6 lg:h-1 bg-rose-500 rounded-full"></div>
            <img src={PuntaCableSata1} className="w-5 h-5 lg:w-6 lg:h-6 rotate-45" />
          </div>
        </div>
      ), 
      availableStep: 2,
      label: 'Cable SATA',
      carryImage: (
        <div className="flex items-center gap-1 bg-white/60 p-2 lg:p-3 rounded-full border border-white shadow-xl">
          <img src={PuntaCableSata1} alt="" className="w-6 h-6 lg:w-8 lg:h-8 -rotate-45" />
          <div className="w-8 h-1 lg:w-10 lg:h-1.5 bg-rose-600 rounded-full"></div>
          <img src={PuntaCableSata1} alt="" className="w-6 h-6 lg:w-8 lg:h-8 rotate-45" />
        </div>
      )
    }
  ];

  const handlePickUp = (id, e) => {
    const part = parts.find(p => p.id === id);
    if (isMobile) {
      setStep(prev => prev + 1);
    } else {
      setIsCarrying({ id, image: part.carryImage || part.image, className: part.className });
    }
  };

  const handleContainerClick = (e) => {
    if (!isCarrying) return;
    
    if (isCarrying.id === 'ssd') {
      const slotRect = slotRef.current?.getBoundingClientRect();
      if (slotRect && e.clientX >= slotRect.left && e.clientX <= slotRect.right && e.clientY >= slotRect.top && e.clientY <= slotRect.bottom) {
        setIsCarrying(null);
        setStep(prev => prev + 1);
      } else {
        setIsCarrying(null);
      }
    } else if (isCarrying.id === 'cable') {
      const cableSlotRect = cableSlotRef.current?.getBoundingClientRect();
      if (cableSlotRect && e.clientX >= cableSlotRect.left && e.clientX <= cableSlotRect.right && e.clientY >= cableSlotRect.top && e.clientY <= cableSlotRect.bottom) {
        setIsCarrying(null);
        setStep(prev => prev + 1);
      } else {
        setIsCarrying(null);
      }
    }
  };

  const getSlotPosition = () => {
    switch (step) {
      case 1: return { left: SSD_POSITION.x + 'px', top: SSD_POSITION.y + 'px', width: '120px', height: '120px' };
      case 2: return { left: CABLE_START_POSITION.x + 'px', top: CABLE_START_POSITION.y + 'px', width: '80px', height: '80px' };
      case 3: return { left: CABLE_END_POSITION.x + 'px', top: CABLE_END_POSITION.y + 'px', width: '100px', height: '100px' };
      default: return { left: '400px', top: '285px', width: '80px', height: '80px' };
    }
  };

  return (
    <AssemblyLayout
      onBack={onBack}
      icon={StorageIcon}
      title="Almacenamiento"
      subtitle="Ensamble del Componente"
      user={user}
      levelNumber={3}
      progress={progressPercent}
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
        <div className="absolute left-[40px] top-[30px] w-[480px] h-[510px] rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-50">
          <img src={MotherBoardCon2Ram} className="w-full h-full object-contain p-2" alt="MB" />
        </div>

        <div className="absolute" style={{ left: (SSD_POSITION.x - 60) + 'px', top: (SSD_POSITION.y - 60) + 'px', width: '120px', height: '120px' }}>
          {step >= 2 ? (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-full h-full flex items-center justify-center">
              <img src={DiscoSSD} className="w-full h-full object-contain drop-shadow-xl" />
            </motion.div>
          ) : (
            <div className="w-full h-full border-2 border-slate-200 rounded-2xl lg:rounded-3xl flex items-center justify-center bg-slate-50/50">
              <span className="text-slate-300 font-black text-[8px] uppercase tracking-widest text-center px-2">DISCO</span>
            </div>
          )}
        </div>

        {step === 1 && isCarrying?.id === 'ssd' && (
          <div ref={slotRef} className="absolute z-50 pointer-events-auto" style={{ left: getSlotPosition().left, top: getSlotPosition().top, width: getSlotPosition().width, height: getSlotPosition().height, transform: 'translate(-50%, -50%)' }}>
            <div className="w-full h-full bg-green-500/15 border-4 border-green-500 border-dashed rounded-xl lg:rounded-2xl animate-pulse shadow-[0_0_40px_rgba(34,197,94,0.35)]"></div>
            <div className="absolute -top-12 lg:-top-20 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none" style={{ zIndex: 10000, top: '-50px' }}>
              <div className="relative bg-green-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl shadow-xl border-2 border-green-500 whitespace-nowrap">
                <span className="font-black text-[7px] lg:text-[9px] uppercase tracking-widest italic">¡INSERTAR AQUÍ!</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && isCarrying?.id === 'cable' && (
          <div ref={cableSlotRef} className="absolute z-50 pointer-events-auto" style={{ left: getSlotPosition().left, top: getSlotPosition().top, width: getSlotPosition().width, height: getSlotPosition().height, transform: 'translate(-50%, -50%)' }}>
            <div className="w-full h-full bg-green-500/15 border-4 border-green-500 border-dashed rounded-lg lg:rounded-xl animate-pulse shadow-[0_0_40px_rgba(34,197,94,0.35)]"></div>
            <div className="absolute -top-12 lg:-top-20 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none" style={{ zIndex: 10000, top: '-50px' }}>
              <div className="relative bg-green-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl shadow-xl border-2 border-green-500 whitespace-nowrap">
                <span className="font-black text-[7px] lg:text-[9px] uppercase tracking-widest italic">¡CONECTAR SATA!</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div ref={ssdCableSlotRef} className="absolute z-50 pointer-events-auto" style={{ left: getSlotPosition().left, top: getSlotPosition().top, width: getSlotPosition().width, height: getSlotPosition().height, transform: 'translate(-50%, -50%)' }} onClick={(e) => { e.stopPropagation(); setCableConnectedToSSD(true); setStep(4); }}>
            <div className="w-full h-full bg-green-500/15 border-4 border-green-500 border-dashed rounded-lg lg:rounded-xl animate-pulse shadow-[0_0_40px_rgba(34,197,94,0.35)]"></div>
            <div className="absolute -top-12 lg:-top-20 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none" style={{ zIndex: 10000, top: '-50px' }}>
              <div className="relative bg-green-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl shadow-xl border-2 border-green-500 whitespace-nowrap">
                <span className="font-black text-[7px] lg:text-[9px] uppercase tracking-widest italic">¡CONECTAR AL SSD!</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <SataCable 
            startPoint={CABLE_START_POSITION} 
            endPoint={CABLE_END_POSITION} 
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
      </AssemblyBoard>
    </AssemblyLayout>
  );
}
