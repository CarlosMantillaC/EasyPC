import MbienHecho from "../../../assets/images/Mascota/MbienHecho.png";

export default function SuccessModal({ levelName, onRepeat, onNext, onBackToMenu, isLastLevel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500">
      
      {/* Estilos locales para animaciones "jugosas" */}
      <style>{`
        @keyframes modalBounce {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes mascotPop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          70% { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
        }
        .animate-modal { animation: modalBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-mascot { animation: mascotPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards; opacity: 0; }
        .confetti { animation: confettiFall 3s linear infinite; }
      `}</style>

      <div className="bg-white rounded-[48px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden border-4 border-[#0D7FF2]/20 animate-modal relative">
        
        {/* Partículas decorativas animadas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="confetti absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-sm" style={{ animationDelay: '0s' }}></div>
          <div className="confetti absolute top-20 right-20 w-3 h-3 bg-[#0D7FF2] rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="confetti absolute top-40 left-1/4 w-3 h-3 bg-green-400 rotate-45" style={{ animationDelay: '1.2s' }}></div>
          <div className="confetti absolute top-10 right-1/3 w-4 h-4 bg-red-400 rounded-full" style={{ animationDelay: '0.8s' }}></div>
          <div className="confetti absolute top-60 right-10 w-3 h-3 bg-purple-400" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
          
          {/* Mascot Section con animación de pop */}
          <div className="relative mb-8 group animate-mascot">
            <div className="absolute inset-0 bg-[#0D7FF2]/10 blur-3xl rounded-full scale-150 opacity-50 group-hover:opacity-80 transition-opacity animate-pulse"></div>
            <img 
              src={MbienHecho} 
              alt="Mascota Isaac celebrando" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 transition-transform duration-500 hover:scale-110 drop-shadow-[0_20px_30px_rgba(13,127,242,0.3)]"
            />
          </div>

          {/* Text Content con entrada escalonada */}
          <div className="space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-forwards">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              ¡EXCELENTE!
            </h2>
            <div className="inline-block px-8 py-3 bg-green-50 rounded-2xl border-2 border-green-500/30">
              <p className="text-green-600 font-black text-base md:text-lg uppercase tracking-[3px]">
                {levelName} COMPLETADO
              </p>
            </div>
            <p className="text-lg md:text-xl font-bold text-slate-500 max-w-md mx-auto leading-relaxed">
              Isaac está muy orgulloso de tu trabajo. ¡Sigue así, ya casi eres un maestro!
            </p>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-forwards">
            <button
              onClick={onRepeat}
              className="group relative h-18 bg-white border-4 border-slate-200 text-slate-600 rounded-3xl font-black text-lg transition-all hover:border-[#0D7FF2] hover:text-[#0D7FF2] active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-sm"
            >
              <span className="text-2xl transition-transform group-hover:rotate-180 duration-500">↺</span>
              REPETIR NIVEL
            </button>

            {!isLastLevel && (
              <button
                onClick={onNext}
                className="h-18 bg-[#0D7FF2] text-white rounded-3xl font-black text-lg shadow-[0_8px_0_0_#0a65c2] hover:shadow-[0_4px_0_0_#0a65c2] hover:translate-y-[2px] active:translate-y-[8px] active:shadow-none transition-all flex items-center justify-center gap-3 group"
              >
                SIGUIENTE NIVEL
                <span className="text-2xl transition-transform group-hover:translate-x-2">🚀</span>
              </button>
            )}

            <button
              onClick={onBackToMenu}
              className={`${isLastLevel ? 'md:col-span-2' : 'md:col-span-2'} h-18 bg-slate-900 text-white rounded-3xl font-black text-lg shadow-[0_8px_0_0_#000] hover:shadow-[0_4px_0_0_#000] hover:translate-y-[2px] active:translate-y-[8px] active:shadow-none transition-all flex items-center justify-center gap-3 mt-2`}
            >
              VOLVER AL TALLER
            </button>
          </div>

        </div>

        {/* Barra decorativa inferior animada */}
        <div className="h-4 w-full bg-slate-100 flex relative overflow-hidden">
           <div className="h-full bg-green-500 w-1/3 animate-pulse"></div>
           <div className="h-full bg-[#0D7FF2] w-1/3 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
           <div className="h-full bg-yellow-400 w-1/3 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
