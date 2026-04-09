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

const SSD_POSITION = { x: 580, y: 200 };
const CABLE_START_POSITION = { x: 400, y: 380 };
const CABLE_END_POSITION = { x: 580, y: 210 };

export default function Level3Storage({ onBack, onLevelComplete, user }) {
  const [step, setStep] = useState(1);
  const [isCarrying, setIsCarrying] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cableConnectedToSSD, setCableConnectedToSSD] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  const boardContainerRef = useRef(null);
  const slotRef = useRef(null);
  const cableSlotRef = useRef(null);
  const ssdCableSlotRef = useRef(null);

  const instructions = {
    1: { mensaje: "Toma el SSD y colócalo en la bahía lateral derecha.", mood: "explorador" },
    2: { mensaje: isCarrying === 'cable' ? "¡Excelente! Suéltalo en el área verde resaltada." : "¡Bien! Conecta el cable SATA al puerto de la placa base.", mood: "pensando" },
    3: { mensaje: "Haz clic en el área verde del SSD para conectar el cable.", mood: "reparando" },
    4: { mensaje: "¡Increíble! SSD instalado y listo.", mood: "asombrado" }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (isMobileView) {
        const availableWidth = window.innerWidth - 40;
        const newScale = Math.min(1, availableWidth / 800);
        setScale(newScale);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (isCarrying === 'ssd') {
      const slotRect = slotRef.current?.getBoundingClientRect();
      if (slotRect && e.clientX >= slotRect.left && e.clientX <= slotRect.right && e.clientY >= slotRect.top && e.clientY <= slotRect.bottom) {
        setIsCarrying(null);
        setStep(prev => prev + 1);
        return;
      }
    } else if (isCarrying === 'cable') {
      const cableSlotRect = cableSlotRef.current?.getBoundingClientRect();
      if (cableSlotRect && e.clientX >= cableSlotRect.left && e.clientX <= cableSlotRect.right && e.clientY >= cableSlotRect.top && e.clientY <= cableSlotRect.bottom) {
        setIsCarrying(null);
        setStep(prev => prev + 1);
        return;
      }
    }
    setIsCarrying(null);
  };

  const handleMobileAutoPlace = (item) => {
    if (item === 'ssd' && step === 1) {
      setIsCarrying(null);
      setStep(prev => prev + 1);
    } else if (item === 'cable' && step === 2) {
      setIsCarrying(null);
      setStep(prev => prev + 1);
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

  const getSSDSlotPosition = () => {
    return { left: CABLE_END_POSITION.x + 'px', top: CABLE_END_POSITION.y + 'px', width: '100px', height: '100px' };
  };

  const getSlotMessagePosition = () => '-top-12 lg:-top-20 left-1/2 -translate-x-1/2';

  const progressPercent = Math.round(((step - 1) / 3) * 100);

  const gridBg = 'linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)';

  return (
    <div className={'min-h-screen bg-[#F8FAFC] font-sans select-none overflow-auto relative flex flex-col pb-4 lg:pb-10' + (isCarrying && !isMobile ? ' cursor-none' : '')} onClick={isMobile ? undefined : handleContainerClick}>
      <AnimatePresence>
        {isCarrying && !isMobile && (
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} style={{ position: 'fixed', left: mousePos.x, top: mousePos.y, translateX: '-50%', translateY: '-50%', zIndex: 9999, pointerEvents: 'none' }}>
            {isCarrying === 'ssd' ? (
              <img src={DiscoSSD} alt="" className="w-16 h-16 lg:w-24 lg:h-24 object-contain drop-shadow-xl" />
            ) : (
              <div className="flex items-center gap-1 bg-white/60 p-2 lg:p-3 rounded-full border border-white shadow-xl">
                <img src={PuntaCableSata1} alt="" className="w-6 h-6 lg:w-8 lg:h-8 -rotate-45" />
                <div className="w-8 h-1 lg:w-10 lg:h-1.5 bg-rose-600 rounded-full"></div>
                <img src={PuntaCableSata1} alt="" className="w-6 h-6 lg:w-8 lg:h-8 rotate-45" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: gridBg, backgroundSize: '40px 40px' }}></div>

      <div className="w-full max-w-[1440px] mx-auto py-3 lg:py-5 relative z-10 flex flex-col flex-1 px-4 lg:px-6">

        <header className="shrink-0 mb-4 lg:mb-6">
          <div className="py-2 lg:py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-4">
              <button onClick={onBack} className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center border-2 border-slate-100 shadow-md hover:border-[#0D7FF2] transition-all active:scale-95 mr-1 lg:mr-2 shrink-0">
                <span className="text-lg lg:text-xl">←</span>
              </button>
              <StorageIcon className="w-7 h-9 lg:w-9 lg:h-11 shrink-0" color="#0D7FF2" />
              <div className="flex flex-col min-w-0">
                <h2 className="text-base lg:text-2xl font-bold text-slate-900 tracking-tight uppercase truncate">Almacenamiento</h2>
                <p className="text-xs lg:text-sm text-slate-600">Ensamble del Componente</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
              <StarRating user={user} levelNumber={3} />
              <UserProfileButton user={user} size="small" showBorder={false} fallbackType="icon" />
            </div>
          </div>
        </header>

        <section className="shrink-0 mb-6 lg:mb-12">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            <div className="flex items-center gap-2">
              <TrophyIcon width={14} height={14} color="#0D7FF2" />
              <p className="text-sm lg:text-base font-semibold text-slate-900">Progreso</p>
            </div>
            <p className="text-sm lg:text-base font-semibold text-blue-600 uppercase">{progressPercent}% Completado</p>
          </div>
          <ProgressBar progress={progressPercent} />
        </section>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start flex-1 min-h-0">

          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4 lg:gap-6">
            <AssemblyMascotBubble mensaje={instructions[step].mensaje} mood={instructions[step].mood} />

            <div className="bg-white rounded-2xl lg:rounded-[32px] p-4 lg:p-6 border-2 border-slate-100 shadow-lg flex flex-col items-center gap-4 lg:gap-6">
              <h3 className="text-slate-900 font-bold uppercase text-[10px] lg:text-xs tracking-widest">Bandeja de Piezas</h3>
              <div className="grid grid-cols-1 gap-3 lg:gap-4 w-full">
                <div className={'h-20 lg:h-24 rounded-xl lg:rounded-2xl border-2 border-dashed flex items-center justify-center transition-all' + (step === 1 ? ' bg-blue-50 border-blue-200 cursor-pointer hover:border-blue-400 active:scale-95' : ' bg-slate-50 border-slate-100 opacity-50')} onClick={(e) => { e.stopPropagation(); if (step === 1) { if (isMobile) { handleMobileAutoPlace('ssd'); } else { handlePickUpFromTray('ssd', e); } } }}>
                  {step === 1 ? <img src={DiscoSSD} className="w-12 h-12 lg:w-16 lg:h-16 object-contain hover:scale-110 transition-transform" /> :
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                </div>
                <div className={'h-20 lg:h-24 rounded-xl lg:rounded-2xl border-2 border-dashed flex items-center justify-center transition-all' + (step === 2 ? ' bg-blue-50 border-blue-200 cursor-pointer hover:border-blue-400 active:scale-95' : ' bg-slate-50 border-slate-100 opacity-50')} onClick={(e) => { e.stopPropagation(); if (step === 2) { if (isMobile) { handleMobileAutoPlace('cable'); } else { handlePickUpFromTray('cable', e); } } }}>
                  {step <= 2 ? (
                    <div className="flex items-center gap-1 hover:scale-110 transition-transform">
                      <img src={PuntaCableSata1} className="w-5 h-5 lg:w-6 lg:h-6 -rotate-45" />
                      <div className="w-5 h-1 lg:w-6 lg:h-1 bg-rose-500 rounded-full"></div>
                      <img src={PuntaCableSata1} className="w-5 h-5 lg:w-6 lg:h-6 rotate-45" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-8 xl:col-span-8 flex justify-center items-start py-4">
            <div style={{ width: (800 * scale) + 'px', height: (571 * scale) + 'px' }}>
              <div ref={boardContainerRef} className="relative w-[800px] h-[571px] rounded-2xl lg:rounded-[48px] bg-white border-2 border-slate-50 shadow-[0_25px_60px_rgba(0,0,0,0.12)] overflow-hidden transform-gpu origin-top-left" style={{ transform: 'scale(' + scale + ')' }}>
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: gridBg, backgroundSize: '20px 20px' }}></div>

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

                {step === 1 && isCarrying === 'ssd' && (
                  <div ref={slotRef} className="absolute z-50 pointer-events-auto" style={{ left: getSlotPosition().left, top: getSlotPosition().top, width: getSlotPosition().width, height: getSlotPosition().height, transform: 'translate(-50%, -50%)' }}>
                    <div className="w-full h-full bg-green-500/15 border-4 border-green-500 border-dashed rounded-xl lg:rounded-2xl animate-pulse shadow-[0_0_40px_rgba(34,197,94,0.35)]"></div>
                    <div className={'absolute ' + getSlotMessagePosition() + ' animate-bounce pointer-events-none'} style={{ zIndex: 10000, top: '-50px', left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="relative bg-green-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl shadow-xl border-2 border-green-500 whitespace-nowrap">
                        <span className="font-black text-[7px] lg:text-[9px] uppercase tracking-widest italic">¡INSERTAR AQUÍ!</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && isCarrying === 'cable' && (
                  <div ref={cableSlotRef} className="absolute z-50 pointer-events-auto" style={{ left: getSlotPosition().left, top: getSlotPosition().top, width: getSlotPosition().width, height: getSlotPosition().height, transform: 'translate(-50%, -50%)' }}>
                    <div className="w-full h-full bg-green-500/15 border-4 border-green-500 border-dashed rounded-lg lg:rounded-xl animate-pulse shadow-[0_0_40px_rgba(34,197,94,0.35)]"></div>
                    <div className={'absolute ' + getSlotMessagePosition() + ' animate-bounce pointer-events-none'} style={{ zIndex: 10000, top: '-50px', left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="relative bg-green-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl shadow-xl border-2 border-green-500 whitespace-nowrap">
                        <span className="font-black text-[7px] lg:text-[9px] uppercase tracking-widest italic">¡CONECTAR SATA!</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div ref={ssdCableSlotRef} className="absolute z-50 pointer-events-auto" style={{ left: getSSDSlotPosition().left, top: getSSDSlotPosition().top, width: getSSDSlotPosition().width, height: getSSDSlotPosition().height, transform: 'translate(-50%, -50%)' }} onClick={(e) => { e.stopPropagation(); setCableConnectedToSSD(true); setStep(4); }}>
                    <div className="w-full h-full bg-green-500/15 border-4 border-green-500 border-dashed rounded-lg lg:rounded-xl animate-pulse shadow-[0_0_40px_rgba(34,197,94,0.35)]"></div>
                    <div className={'absolute ' + getSlotMessagePosition() + ' animate-bounce pointer-events-none'} style={{ zIndex: 10000, top: '-50px', left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="relative bg-green-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl shadow-xl border-2 border-green-500 whitespace-nowrap">
                        <span className="font-black text-[7px] lg:text-[9px] uppercase tracking-widest italic">¡CONECTAR AL SSD!</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 border-r-2 border-b-2 border-green-500 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <SataCable startPoint={CABLE_START_POSITION} endPoint={CABLE_END_POSITION} isConnected={cableConnectedToSSD} containerRef={boardContainerRef} onConnect={() => { setCableConnectedToSSD(true); setStep(4); }} startRotation={0} startCableRotation={0} startOffsetX={12} startOffsetY={12} startCurve={{ x: 30, y: 0 }} endRotation={180} endCableRotation={180} endOffsetX={12} endCurve={{ x: -30, y: 0 }} strokeWidth={10} rigidLength={25} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
