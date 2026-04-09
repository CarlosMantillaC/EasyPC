import React from "react";

/**
 * COMPONENTE: PartsTray
 * Maneja la bandeja de piezas con estética unificada para todos los niveles.
 */
export default function PartsTray({ parts, activeStep, isMobile, onPickUp, isCarrying }) {
  return (
    <div className="bg-white rounded-2xl lg:rounded-[32px] p-4 lg:p-6 border-2 border-slate-100 shadow-lg flex flex-col items-center gap-4 lg:gap-6">
      <h3 className="text-slate-900 font-bold uppercase text-[10px] lg:text-xs tracking-widest">
        Bandeja de Piezas
      </h3>
      
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] bg-slate-50/50 rounded-[24px] border border-dashed border-slate-200 p-4 gap-6">
        {parts.map((part, index) => {
          const isAvailable = part.availableStep === activeStep;
          const isCompleted = activeStep > part.availableStep;
          const isCurrentlyCarried = isCarrying?.id === part.id;

          return (
            <div key={part.id || index} className="relative w-full flex justify-center">
              {isCompleted ? (
                /* ESTADO: INSTALADO (Estética Premium) */
                <div className="relative w-40 h-32 flex items-center justify-center animate-in fade-in zoom-in duration-700">
                  {/* Silueta de la pieza */}
                  <div className="opacity-10 grayscale scale-75">
                    {typeof part.image === 'string' ? (
                      <img src={part.image} className="w-24 h-24 object-contain" alt="" />
                    ) : (
                      part.image
                    )}
                  </div>
                  
                  {/* Icono de éxito y texto */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_-5px_rgba(34,197,94,0.4)] animate-in zoom-in duration-500 delay-200 relative">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-3 bg-white/20 rounded-full blur-[1px]"></div>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-green-600 font-black text-[9px] uppercase tracking-[2px]">{part.label || 'Instalado'}</p>
                      <div className="w-4 h-0.5 bg-green-500/30 rounded-full mt-1 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ESTADO: DISPONIBLE O BLOQUEADO */
                <div 
                  onClick={(e) => isAvailable && onPickUp(part.id, e)}
                  className={`relative w-40 h-32 flex items-center justify-center transition-all duration-300 rounded-[24px] border-2
                    ${isAvailable 
                      ? (isCurrentlyCarried ? 'opacity-0 scale-50' : 'bg-white border-slate-100 cursor-pointer hover:border-[#0D7FF2] hover:scale-105 active:scale-95 shadow-sm') 
                      : 'bg-slate-100/50 border-transparent opacity-40 grayscale pointer-events-none'
                    }
                  `}
                >
                  {typeof part.image === 'string' ? (
                    <img src={part.image} className="w-20 h-20 object-contain" alt={part.id} />
                  ) : (
                    part.image
                  )}

                  {/* Globo "Recoger" dinámico */}
                  {isAvailable && !isCurrentlyCarried && (
                    <div className="absolute -top-2 -right-2 bg-[#0D7FF2] text-white px-3 py-1 rounded-xl shadow-lg animate-bounce text-[9px] font-black uppercase tracking-tight z-10">
                      Recoger
                    </div>
                  )}

                  {/* Label de la pieza (opcional) */}
                  {part.label && !isCurrentlyCarried && (
                    <div className="absolute -bottom-2 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest border border-slate-200">
                      {part.label}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
