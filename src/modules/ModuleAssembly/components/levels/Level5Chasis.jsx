import { useState } from "react";
import MascotaDialogo from "../../../../components/MascotaDialogo";
import Chasis1 from "../../../../assets/images/Components/Chasis/Chasis1.png";
import MotherBoardConProcesador from "../../../../assets/images/Components/MotherBoard/MotherBoardConProcesador.png";
import { StarIcon } from "../../../../shared/components/StarIcon";

/**
 * NIVEL 5: EL MONTAJE FINAL (CHASIS)
 * En este nivel colocamos la placa base armada dentro de la caja.
 */
export default function Level5Chasis({ onBack, onLevelComplete }) {
  // step: 1 (Elegir placa), 2 (Poner en chasis), 3 (Éxito)
  const [step, setStep] = useState(1);
  const [isPlaced, setIsPlaced] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  // TEXTOS DE ISAAC: Edítalos para el cierre del curso
  const instructions = {
    1: { titulo: "El Montaje Final", mensaje: "¡Nuestra placa está armada! Ahora toca la placa base para levantarla y ponerla en la caja.", mood: "reparando" },
    2: { titulo: "Dentro de la Caja", mensaje: "¡Muy bien! Ahora toca el centro del chasis para atornillar la placa en su sitio.", mood: "pensando" },
    3: { titulo: "¡PC CONSTRUIDA!", mensaje: "¡Felicidades! Has terminado de armar todo el computador. ¡Eres un experto!", mood: "bienhecho" }
  };

  // FUNCIÓN: Al tocar la placa base en la mesa
  const handlePieceClick = () => {
    if (step === 1) {
      setStep(2);
      setShowHighlight(true);
    }
  };

  // FUNCIÓN: Al tocar el interior del chasis
  const handleSocketClick = () => {
    if (step === 2) {
      setIsPlaced(true);
      setShowHighlight(false);
      setStep(3);
    }
  };

  const current = instructions[step];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA */}
        <header className="mb-10 flex justify-between items-center bg-white p-4 rounded-[32px] shadow-sm border border-slate-100">
           <button onClick={onBack} className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-[#0D7FF2] transition-all group">
             <span className="transition-transform group-hover:-translate-x-1">←</span> SALIR
           </button>
           <div className="bg-[#0D7FF2]/10 px-6 py-2 rounded-2xl border border-[#0D7FF2]/20">
              <span className="text-[#0D7FF2] font-black text-xs uppercase tracking-[2px]">Nivel 5: Montaje Final</span>
           </div>
        </header>

        {/* DIÁLOGO DE ISAAC */}
        <MascotaDialogo titulo={current.titulo} mensaje={current.mensaje} mood={current.mood} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch mt-12">
          
          {/* MESA DE TRABAJO (IZQUIERDA) */}
          <div className="bg-white p-10 rounded-[56px] border-2 border-slate-100 flex flex-col items-center shadow-xl shadow-slate-200/50">
            <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[3px] mb-12 bg-slate-50 px-6 py-2 rounded-full">Mesa de Trabajo</h3>
            <div className="flex-1 flex items-center justify-center w-full">
              {!isPlaced && (
                <div onClick={handlePieceClick} className={`relative w-56 h-56 cursor-pointer transition-all duration-500 bg-slate-50 p-8 rounded-[48px] border-2 ${step === 1 ? 'hover:scale-110 shadow-2xl border-[#0D7FF2]/20 bg-white' : 'opacity-50 grayscale scale-90 border-transparent'}`}>
                  <img src={MotherBoardConProcesador} alt="Placa Completa" className="w-full h-full object-contain" />
                  {step === 1 && <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#0D7FF2] rounded-2xl flex items-center justify-center animate-bounce shadow-xl border-4 border-white"><StarIcon className="w-6 h-6 text-white" filled /></div>}
                </div>
              )}
              {isPlaced && (
                <div className="text-center animate-in zoom-in duration-700">
                   <div className="text-8xl mb-6">🏆</div>
                   <p className="text-[#0D7FF2] font-black text-xs uppercase tracking-[4px]">TRABAJO COMPLETO</p>
                </div>
              )}
            </div>
          </div>

          {/* ÁREA DE ENSAMBLAJE (DERECHA): El Chasis */}
          <div className="lg:col-span-2 relative bg-white p-8 rounded-[64px] shadow-2xl shadow-slate-200 border-2 border-slate-50 overflow-hidden flex items-center justify-center">
            <img src={Chasis1} alt="Chasis" className="w-full h-auto rounded-[48px] shadow-2xl" />
            
            {/* ZONA DE MONTAJE: Cambia top/left/width/height para ajustar dónde encaja la placa */}
            <div onClick={handleSocketClick} className={`absolute top-[20%] left-[25%] w-[50%] h-[60%] flex items-center justify-center rounded-[32px] transition-all duration-500 ${showHighlight ? 'bg-[#0D7FF2]/20 border-[6px] border-[#0D7FF2] border-dashed animate-pulse cursor-pointer z-20' : 'pointer-events-none opacity-0'}`}>
              {showHighlight && <StarIcon className="w-16 h-16 text-[#0D7FF2] animate-bounce" filled />}
            </div>

            {/* PLACA INSTALADA */}
            {isPlaced && (
              <div className="absolute top-[20%] left-[25%] w-[50%] h-[60%] z-10 animate-in fade-in zoom-in duration-1000 p-4">
                <img src={MotherBoardConProcesador} alt="Placa Montada" className="w-full h-full object-contain brightness-110" />
              </div>
            )}
          </div>
        </div>

        {/* BOTÓN FINAL DE CURSO */}
        {step === 3 && (
          <div className="mt-16 flex justify-center pb-12 animate-in slide-in-from-bottom-8 duration-700">
            <button onClick={onLevelComplete} className="px-24 py-10 bg-[#0D7FF2] text-white rounded-[40px] font-black text-3xl hover:bg-slate-900 transition-all hover:scale-110 shadow-2xl flex items-center gap-8 group">
              <span>¡TERMINAR CURSO!</span>
              <span className="text-4xl animate-bounce">🎓</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
