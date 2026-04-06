import Mexplorador from "../../../assets/images/Mascota/Mexplorador.png";
import Mhablando from "../../../assets/images/Mascota/Mhablando.png";
import Mfeliz1 from "../../../assets/images/Mascota/Mfeliz1.png";
import Mpensando1 from "../../../assets/images/Mascota/Mpensando1.png";
import MbienHecho from "../../../assets/images/Mascota/MbienHecho.png";
import Masombrado1 from "../../../assets/images/Mascota/Masombrado1.png";
import Mreparando from "../../../assets/images/Mascota/Mreparando.png";

const MOODS = {
  explorador: Mexplorador,
  hablando: Mhablando,
  feliz: Mfeliz1,
  pensando: Mpensando1,
  bienhecho: MbienHecho,
  asombrado: Masombrado1,
  reparando: Mreparando
};

export default function AssemblyMascotBubble({ mensaje, mood = "hablando" }) {
  const selectedImage = MOODS[mood] || MOODS.hablando;
  
  return (
    <div className="flex items-center gap-4 mb-6 w-full animate-in fade-in zoom-in duration-500 relative">
      
      {/* Mascota */}
      <div className="shrink-0 w-32 h-40 relative animate-[floatMascot_3s_ease-in-out_infinite]">
        <img 
          src={selectedImage} 
          alt="Isaac" 
          className="w-full h-full object-contain relative z-10 drop-shadow-lg" 
        />
      </div>

      {/* Globo */}
      <div className="relative flex-1 animate-[floatBubble_4s_ease-in-out_infinite]">
        
        <div className="relative bg-white border-2 border-blue-100 rounded-[24px] px-6 py-3 shadow-xl shadow-blue-900/5 min-h-[56px] flex items-center justify-center overflow-hidden">
          
          {/* Brillo interno */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-50/20 to-transparent -skew-x-12 translate-x-[-200%] animate-[shimmerText_6s_infinite]"></div>
          </div>

          {/* Texto */}
          <p className="relative z-10 text-[14px] font-bold text-slate-600 leading-tight tracking-tight text-center first-letter:uppercase">
            {mensaje}
          </p>
        </div>

        {/* Cola */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-blue-100 rotate-45 z-0 shadow-sm"></div>
      </div>

      {/* Animaciones */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatBubble {
          0% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-4px) scale(1.01);
          }
          50% {
            transform: translateY(-8px) scale(1.02);
          }
          75% {
            transform: translateY(-4px) scale(1.01);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }


        @keyframes shimmerText {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          25% {
            transform: translateX(300%) skewX(-12deg);
          }
          100% {
            transform: translateX(300%) skewX(-12deg);
          }
        }
      `}} />
    </div>
  );
}