import React from "react";

export default function AssemblyBoard({ children, scale, width = 800, height = 571, boardContainerRef }) {
  const gridBg = 'linear-gradient(#0D7FF2 1px, transparent 1px), linear-gradient(90deg, #0D7FF2 1px, transparent 1px)';

  return (
    <div className="col-span-1 lg:col-span-8 xl:col-span-8 flex justify-center items-start py-4">
      <div style={{ width: (width * scale) + 'px', height: (height * scale) + 'px' }}>
        <div 
          ref={boardContainerRef} 
          className="relative w-[800px] h-[571px] rounded-2xl lg:rounded-[48px] bg-white border-2 border-slate-50 shadow-[0_25px_60px_rgba(0,0,0,0.12)] overflow-hidden transform-gpu origin-top-left" 
          style={{ transform: 'scale(' + scale + ')' }}
        >
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: gridBg, backgroundSize: '20px 20px' }}></div>
          {children}
        </div>
      </div>
    </div>
  );
}
