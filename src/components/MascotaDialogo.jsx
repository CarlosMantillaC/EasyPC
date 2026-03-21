import Mpensando1 from "../assets/images/Mascota/Mpensando1.png";

export default function MascotaDialogo({ titulo, mensaje, reverse = false }) {
  return (
    <section className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-12`}>
      <div className="relative group">
        <div className="w-40 h-40 md:w-48 md:h-48">
          <img 
            src={Mpensando1} 
            alt="Mascota EasyPC" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = "https://api.dicebear.com/9.x/bottts/svg?seed=EasyPC";
            }}
          />
        </div>
      </div>

      <div className="relative flex-1 w-full">
        {/* Globo de texto (Speech Bubble) */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-[32px] p-8 shadow-sm relative">
          {/* Triángulo del globo (colita) adaptable */}
          <div className={`absolute ${reverse ? 'right-[-12px]' : 'left-[-12px]'} top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 border-l-2 border-b-2 border-slate-200 rotate-45 hidden md:block ${reverse ? 'rotate-[225deg]' : 'rotate-45'}`}></div>
          <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-50 border-l-2 border-t-2 border-slate-200 rotate-45 md:hidden"></div>
          
          {titulo && (
            <h1 className="text-3xl md:text-[34px] leading-tight font-black tracking-[-0.75px] text-slate-900 mb-2">
              {titulo}
            </h1>
          )}
          <p className="text-xl leading-7 font-medium text-slate-500">
            {mensaje}
          </p>
        </div>
      </div>
    </section>
  );
}
