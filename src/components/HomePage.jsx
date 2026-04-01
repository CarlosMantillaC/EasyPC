import LearningCard from "./LearningCard";
import MascotaDialogo from "./MascotaDialogo";
import CleaningIcon from "./CleaningIcon";
import ComponentsIcon from "./ComponentsIcon";
import AssemblyIcon from "./AssemblyIcon";

export const DAILY_MESSAGES = [
  "Un computador tiene varias partes que trabajan juntas.",
  "Cada parte del computador tiene una función.",
  "El computador necesita energía para funcionar.",
  "Armar bien un computador es importante.",
  "Mantener limpio el computador ayuda a que funcione mejor.",
  "Las piezas del computador deben cuidarse.",
  "Un computador limpio dura más tiempo.",
  "Seguir pasos ayuda a hacer las cosas bien.",
  "Aprender sobre computadores es útil.",
  "Puedes aprender paso a paso."
];

const getDailyMessage = () => {
  const today = new Date();
  const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dayNumber = Math.floor(dayStart.getTime() / 86400000);
  return DAILY_MESSAGES[dayNumber % DAILY_MESSAGES.length];
};

export default function HomePage({ user, onOpenPieces, onOpenAssembly }) {
  const primerNombre = user?.displayName?.split(' ')[0] || 'Explorador';
  const dailyMessage = getDailyMessage();

  return (
    <div className="pb-20">
      {/* MASCOTA CON DIÁLOGO */}
      <MascotaDialogo 
        titulo={`¡Hola, ${primerNombre}!`}
        mensaje={dailyMessage}
      />

      {/* GRID PRINCIPAL DE APRENDIZAJE */}
      <section className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-16 max-w-6xl">
          <LearningCard
            title="Componentes"
            description="¡Descubre las partes del computador!"
            borderColor="#6BCB77"
            softColor="rgba(107, 203, 119, 0.2)"
            buttonColor="#6BCB77"
            buttonLabel="¡A explorar!"
            icon={ComponentsIcon}
            onClick={onOpenPieces}
          />

          <LearningCard
            title="Armado"
            description="¡Arma un computador paso a paso!"
            borderColor="#FFB800"
            softColor="rgba(255, 184, 0, 0.2)"
            buttonColor="#FFB800"
            buttonLabel="¡A armar!"
            icon={AssemblyIcon}
            onClick={onOpenAssembly}
          />

          <LearningCard
            title="Limpieza"
            description="¡Limpia el computador correctamente!"
            borderColor="#FFD93D"
            softColor="rgba(255, 217, 61, 0.2)"
            buttonColor="#FFD93D"
            buttonLabel="¡A limpiar!"
            icon={CleaningIcon}
            locked
          />
        </div>
      </section>
    </div>
  );
}
