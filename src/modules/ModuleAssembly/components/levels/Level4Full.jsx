import { useState } from "react";
import MascotaDialogo from "../../../../components/MascotaDialogo";
import MotherBoardSinNada from "../../../../assets/images/Components/MotherBoard/MotherBoardSinNada.png";
import Procesador1 from "../../../../assets/images/Components/Procesador/Procesador1.png";
import Ram1 from "../../../../assets/images/Components/Ram/Ram1.png";
import DiscoSSD from "../../../../assets/images/Components/Disco/DiscoSSD.png";
import { StarIcon } from "../../../../shared/components/StarIcon";

/**
 * NIVEL 4: ENSAMBLE TOTAL
 * El usuario debe colocar CPU, RAM y SSD en un solo nivel.
 */
export default function Level4Full({ onBack, onLevelComplete }) {
  // ESTADO: Controla qué piezas han sido ya colocadas
  const [placedItems, setPlacedItems] = useState({ cpu: false, ram: false, ssd: false });
  
  // ESTADO: Controla qué pieza tiene el usuario seleccionada actualmente
  const [activeItem, setActiveItem] = useState(null); // 'cpu', 'ram', 'ssd' o null
  
  const [isFinished, setIsFinished] = useState(false);

  // TEXTOS DE ISAAC: Puedes editarlos según la pieza activa
  const instructions = {
    start: { titulo: "¡El Gran Reto!", mensaje: "¡Es hora de armar todo el computador! Toca una pieza de la mesa para empezar.", mood: "explorador" },
    cpu: { titulo: "Colocando el Cerebro", mensaje: "Pon el procesador en el socket central.", mood: "reparando" },
    ram: { titulo: "Añadiendo Memoria", mensaje: "Inserta la RAM en su puerto largo.", mood: "pensando" },
    ssd: { titulo: "Guardando los Datos", mensaje: "Conecta el SSD en su lugar.", mood: "reparando" },
    finish: { titulo: "¡PC TERMINADA!", mensaje: "¡Eres un maestro del ensamble! Has construido una computadora increíble.", mood: "bienhecho" }
  };

  // FUNCIÓN: Se ejecuta al tocar una pieza en la bandeja de la izquierda
  const handleInventoryClick = (item) => {
    if (!placedItems[item]) {
      setActiveItem(item);
    }
  };

  // FUNCIÓN: Se ejecuta al tocar la zona correcta en la placa base
  const handlePlaceItem = (item) => {
    if (activeItem === item) {
      const newPlaced = { ...placedItems, [item]: true };
      setPlacedItems(newPlaced);
      setActiveItem(null); // Soltamos la pieza
      
      // Si todas las llaves de placedItems son true, terminamos
      if (newPlaced.cpu && newPlaced.ram && newPlaced.ssd) {
        setIsFinished(true);
      }
    }
  };

  // Determina qué instrucción mostrar
  const getInstruction = () => {
    if (isFinished) return instructions.finish;
    if (activeItem) return instructions[activeItem];
    return instructions.start;
  };

  const currentInstr = getInstruction();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-center bg-white p-4 rounded-[32px] shadow-sm border border-slate-100">
           <button onClick={onBack} className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-[#0D7FF2] transition-all group">
             <span className="transition-transform group-hover:-translate-x-1">←</span> SALIR
           </button>
           <div className="bg-[#0D7FF2]/10 px-6 py-2 rounded-2xl border border-[#0D7FF2]/20">
              <span className="text-[#0D7FF2] font-black text-xs uppercase tracking-[2px]">Nivel Final: Ensamble Total</span>
           </div>
        </header>

        <MascotaDialogo titulo={currentInstr.titulo} mensaje={currentInstr.mensaje} mood={currentInstr.mood} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch mt-12">
          
          {/* BANDEJA DE PIEZAS (IZQUIERDA) */}
          <div className="bg-white p-10 rounded-[56px] border-2 border-slate-100 flex flex-col gap-8 items-center shadow-xl shadow-slate-200/50">
            <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[3px] mb-4 bg-slate-50 px-6 py-2 rounded-full">Piezas de hoy</h3>
            
            <InventoryItem 
              img={Procesador1} label="Procesador" 
              active={activeItem === 'cpu'} placed={placedItems.cpu}
              onClick={() => handleInventoryClick('cpu')}
            />
            
            <InventoryItem 
              img={Ram1} label="Memoria RAM" 
              active={activeItem === 'ram'} placed={placedItems.ram}
              onClick={() => handleInventoryClick('ram')}
            />
            
            <InventoryItem 
              img={DiscoSSD} label="Disco SSD" 
              active={activeItem === 'ssd'} placed={placedItems.ssd}
              onClick={() => handleInventoryClick('ssd')}
            />
          </div>

          {/* MESA DE TRABAJO (DERECHA) */}
          <div className="lg:col-span-2 relative bg-white p-8 rounded-[64px] shadow-2xl shadow-slate-200 border-2 border-slate-50 overflow-hidden flex items-center justify-center">
            <img src={MotherBoardSinNada} alt="Placa Base" className="w-full h-auto rounded-[48px] shadow-2xl" />
            
            {/* ZONAS DE COLOCACIÓN: Cambia top/left para mover cada hueco */}
            <DropZone 
              top="35%" left="45%" w="20%" h="20%" 
              active={activeItem === 'cpu'} placed={placedItems.cpu} 
              img={Procesador1} onClick={() => handlePlaceItem('cpu')} 
            />
            
            <DropZone 
              top="25%" left="65%" w="10%" h="40%" 
              active={activeItem === 'ram'} placed={placedItems.ram} 
              img={Ram1} onClick={() => handlePlaceItem('ram')} 
            />
            
            <DropZone 
              top="60%" left="60%" w="20%" h="15%" 
              active={activeItem === 'ssd'} placed={placedItems.ssd} 
              img={DiscoSSD} onClick={() => handlePlaceItem('ssd')} 
            />
          </div>
        </div>

        {isFinished && (
          <div className="mt-16 flex justify-center pb-12 animate-in slide-in-from-bottom-8 duration-700">
            <button onClick={onLevelComplete} className="px-20 py-8 bg-green-500 text-white rounded-[32px] font-black text-2xl hover:bg-slate-900 transition-all hover:scale-105 shadow-xl flex items-center gap-6 group">
              <span>¡ENSAMBLE COMPLETADO!</span>
              <span className="text-3xl transition-transform group-hover:translate-x-3">🏆</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * COMPONENTE INVENTORYITEM: Representa cada pieza en la bandeja de la izquierda
 */
function InventoryItem({ img, label, active, placed, onClick }) {
  if (placed) return (
    <div className="w-full flex items-center gap-4 bg-green-50 px-6 py-4 rounded-[24px] border border-green-100 opacity-60">
       <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">✅</div>
       <p className="text-[10px] font-black uppercase tracking-widest text-green-700">{label}</p>
    </div>
  );
  
  return (
    <div 
      onClick={onClick}
      className={`w-full flex items-center gap-6 p-4 border-2 rounded-[32px] cursor-pointer transition-all duration-300 ${active ? 'border-[#0D7FF2] bg-[#0D7FF2]/5 scale-105 shadow-xl ring-8 ring-[#0D7FF2]/10' : 'border-slate-100 bg-slate-50 hover:border-[#0D7FF2]/30'}`}
    >
      <div className="w-16 h-16 bg-white p-3 rounded-2xl shadow-sm">
        <img src={img} alt={label} className="w-full h-full object-contain" />
      </div>
      <p className="font-black text-xs uppercase tracking-wider text-slate-600">{label}</p>
      {active && <div className="ml-auto w-3 h-3 bg-[#0D7FF2] rounded-full animate-ping" />}
    </div>
  );
}

/**
 * COMPONENTE DROPZONE: Representa cada lugar donde se puede soltar una pieza
 */
function DropZone({ top, left, w, h, active, placed, img, onClick }) {
  return (
    <div 
      onClick={active ? onClick : undefined}
      style={{ top, left, width: w, height: h }}
      className={`absolute flex items-center justify-center transition-all duration-500 rounded-2xl z-20 ${active ? 'bg-[#0D7FF2]/20 border-4 border-[#0D7FF2] animate-pulse cursor-pointer shadow-[0_0_50px_rgba(13,127,242,0.4)] ring-8 ring-[#0D7FF2]/10' : 'pointer-events-none'}`}
    >
      {placed && (
        <img src={img} alt="Pieza" className="w-full h-full object-contain animate-in zoom-in duration-500 drop-shadow-2xl brightness-110" />
      )}
      {active && !placed && <StarIcon className="w-8 h-8 text-[#0D7FF2] animate-bounce" filled />}
    </div>
  );
}
