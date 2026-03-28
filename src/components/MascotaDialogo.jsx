import Mexplorador from "../assets/images/Mascota/Mexplorador.png";
import Mhablando from "../assets/images/Mascota/Mhablando.png";
import Mfeliz1 from "../assets/images/Mascota/Mfeliz1.png";
import Mpensando1 from "../assets/images/Mascota/Mpensando1.png";
import MbienHecho from "../assets/images/Mascota/MbienHecho.png";
import Masombrado1 from "../assets/images/Mascota/Masombrado1.png";
import Mreparando from "../assets/images/Mascota/Mreparando.png";

const MOODS = {
  explorador: Mexplorador,
  hablando: Mhablando,
  feliz: Mfeliz1,
  pensando: Mpensando1,
  bienhecho: MbienHecho,
  asombrado: Masombrado1,
  reparando: Mreparando
};

export default function MascotaDialogo({ titulo, mensaje, mood = "hablando", reverse = false }) {
  const selectedImage = MOODS[mood] || MOODS.hablando;

  return (
    <section className={`flex flex-col ${reverse ? 'flex-row-reverse' : 'flex-row'} items-center gap-6 mb-8 w-full max-w-5xl mx-auto`}>
      <div className="relative group shrink-0">
        <div className="w-32 h-32 md:w-44 md:h-44 transition-transform duration-500 hover:scale-110">
          <img 
            src={selectedImage} 
            alt={`Isaac está ${mood}`} 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        {/* Halo de luz decorativo según mood */}
        <div className={`absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full ${
          mood === 'bienhecho' ? 'bg-green-400' : mood === 'feliz' ? 'bg-yellow-400' : 'bg-blue-400'
        }`}></div>
      </div>

      <div className="relative flex-1 w-full animate-in slide-in-from-bottom-4 duration-500">
        {/* Globo de texto (Speech Bubble) */}
        <div className="bg-white border-2 border-[#0D7FF2]/10 rounded-[40px] p-6 md:p-8 shadow-xl shadow-[#0D7FF2]/5 relative">
          {/* Triángulo del globo (colita) adaptable */}
          <div className={`absolute ${reverse ? 'right-[-10px]' : 'left-[-10px]'} top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-l-2 border-b-2 border-[#0D7FF2]/10 rotate-45 hidden md:block ${reverse ? 'rotate-[225deg]' : 'rotate-45'}`}></div>
          
          {titulo && (
            <h1 className="text-2xl md:text-3xl leading-tight font-black tracking-[-0.5px] text-slate-900 mb-2">
              {titulo}
            </h1>
          )}
          <p className="text-lg md:text-xl leading-relaxed font-semibold text-slate-500">
            {mensaje}
          </p>
        </div>
      </div>
    </section>
  );
}
