import React from "react";
import AssemblyHeader from "./AssemblyHeader";
import AssemblyProgress from "./AssemblyProgress";
import AssemblyMascotBubble from "./AssemblyMascotBubble";
import PartsTray from "./PartsTray";
import CarryOverlay from "./CarryOverlay";

export default function AssemblyLayout({
  children,
  onBack,
  icon,
  title,
  subtitle,
  user,
  levelNumber,
  progress,
  progressMessage,
  instruction,
  parts,
  activeStep,
  isMobile,
  onPickUp,
  isCarrying,
  mousePos,
  onContainerClick
}) {
  const gridBg = 'linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)';

  return (
    <div 
      className={`min-h-screen bg-[#F8FAFC] font-sans select-none overflow-auto relative flex flex-col pb-4 lg:pb-10 ${isCarrying && !isMobile ? 'cursor-none' : ''}`}
      onClick={isMobile ? undefined : onContainerClick}
    >
      <CarryOverlay isCarrying={isCarrying} mousePos={mousePos} isMobile={isMobile} />

      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: gridBg, backgroundSize: '40px 40px' }}></div>

      <div className="w-full max-w-[1440px] mx-auto py-3 lg:py-5 relative z-10 flex flex-col flex-1 px-4 lg:px-6">
        <AssemblyHeader 
          onBack={onBack} 
          icon={icon} 
          title={title} 
          subtitle={subtitle} 
          user={user} 
          levelNumber={levelNumber} 
        />

        <AssemblyProgress progress={progress} progressMessage={progressMessage} />

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start flex-1 min-h-0">
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4 lg:gap-6">
            <AssemblyMascotBubble mensaje={instruction.mensaje} mood={instruction.mood} />
            <PartsTray parts={parts} activeStep={activeStep} isMobile={isMobile} onPickUp={onPickUp} isCarrying={isCarrying} />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
