import { useEffect } from "react";
import confetti from "canvas-confetti";
import MCelebrando from "../../../assets/images/Mascota/MCelebrando.png";

export default function SuccessModal({ levelName, onRepeat, onNext, onBackToMenu, isLastLevel }) {
  useEffect(() => {
    const duration = 1500;
    const end = Date.now() + duration;

    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, { resize: true });

    const frame = () => {
      myConfetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.2 },
        colors: ['#0D7FF2', '#22C55E', '#FACC15', '#3B82F6', '#A855F7'],
        drift: 0.4,
        gravity: 1.2,
        startVelocity: 30,
        ticks: 60,
        scalar: 0.8
      });
      myConfetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.2 },
        colors: ['#0D7FF2', '#22C55E', '#FACC15', '#3B82F6', '#A855F7'],
        drift: -0.4,
        gravity: 1.2,
        startVelocity: 30,
        ticks: 60,
        scalar: 0.8
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500">

      {/* Estilos locales para animaciones limpias */}
      <style>{`
        @keyframes modalPop {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes mascotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-modal-pop { animation: modalPop 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards; }
        .animate-mascot-bounce { animation: mascotBounce 3s ease-in-out infinite; }
      `}</style>

      <div className="bg-white rounded-[32px] shadow-[0_30px_60px_-12px_rgba(13,127,242,0.2)] w-full max-w-md overflow-hidden border-4 border-blue-50 animate-modal-pop relative">

        {/* Canvas para confetti dentro del modal */}
        <canvas id="confetti-canvas" className="absolute inset-0 pointer-events-none z-50" style={{ width: '100%', height: '100%', borderRadius: '32px' }}></canvas>

        {/* Adorno de esquina tipo "Sello de Calidad" */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#0D7FF2]/5 rounded-bl-full pointer-events-none"></div>

        {/* Header del Certificado */}
        <div className="bg-blue-50/50 px-5 py-2 border-b-2 border-blue-100 flex justify-between items-center">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#0D7FF2]"></div>
            <div className="w-2 h-2 rounded-full bg-[#0D7FF2]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#0D7FF2]/10"></div>
          </div>
        </div>

        <div className="relative p-6 md:p-8 flex flex-col items-center text-center">

          {/* Mascot Section */}
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-blue-50 blur-[40px] rounded-full scale-125 opacity-60"></div>
            <img
              src={MCelebrando}
              alt="Mascota Isaac celebrando"
              className="w-36 h-36 md:w-36 md:h-36 object-contain relative z-10 animate-mascot-bounce drop-shadow-2xl"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-3 mb-6 relative z-10">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">
                ¡TRABAJO <span className="text-[#0D7FF2]">TERMINADO!</span>
              </h2>
              <p className="text-[#0D7FF2] font-black text-[9px] uppercase tracking-[4px]">Control de Calidad Aprobado</p>
            </div>

            <div className="inline-block px-5 py-2 bg-green-50 rounded-xl border-2 border-green-500/20">
              <p className="text-green-600 font-black text-sm uppercase tracking-[2px]">
                {levelName} : COMPLETADO
              </p>
            </div>

            <p className="text-sm font-bold text-slate-500 max-w-xs mx-auto leading-relaxed">
              "Has ensamblado los componentes con gran precisión. ¡Isaac está impresionado!"
            </p>
          </div>

          {/* Buttons Grid */}
          <div className="flex flex-col gap-3 w-full relative z-10">
            {!isLastLevel ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onRepeat}
                  className="h-12 bg-white text-slate-500 border-2 border-slate-100 rounded-xl font-black text-xs transition-all hover:border-[#0D7FF2] hover:text-[#0D7FF2] active:scale-95 flex items-center justify-center gap-2 uppercase tracking-[1px]"
                >
                  <span className="text-base italic">↺</span>
                  Repetir
                </button>
                <button
                  onClick={onNext}
                  className="h-12 bg-[#0D7FF2] text-white rounded-xl font-black text-xs shadow-[0_4px_0_0_#0a65c2] hover:shadow-[0_2px_0_0_#0a65c2] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase tracking-[1px] group"
                >
                  Siguiente
                  <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onRepeat}
                className="h-12 bg-white text-slate-500 border-2 border-slate-100 rounded-xl font-black text-xs transition-all hover:border-[#0D7FF2] hover:text-[#0D7FF2] active:scale-95 flex items-center justify-center gap-2 uppercase tracking-[1px]"
              >
                <span className="text-base italic">↺</span>
                Repetir
              </button>
            )}

            <button
              onClick={onBackToMenu}
              className="h-12 bg-slate-900 text-white rounded-xl font-black text-xs shadow-[0_4px_0_0_#000] hover:shadow-[0_2px_0_0_#000] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase tracking-[1px]"
            >
              Menú
            </button>
          </div>

        </div>

        {/* Barra decorativa inferior */}
        <div className="h-2.5 w-full bg-slate-50 flex">
           <div className="h-full bg-[#0D7FF2] w-1/4"></div>
           <div className="h-full bg-green-500 w-1/2"></div>
           <div className="h-full bg-yellow-400 w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
