import LearningCard from "./LearningCard";
import MascotaDialogo from "./MascotaDialogo";
import CleaningIcon from "./CleaningIcon";
import ComponentsIcon from "./ComponentsIcon";
import AssemblyIcon from "./AssemblyIcon";

export default function HomePage({ user, onOpenPieces, onOpenAssembly }) {
  const primerNombre = user?.displayName?.split(' ')[0] || 'Explorador';

  return (
    <div className="pb-20">
      {/* MASCOTA CON DIÁLOGO */}
      <MascotaDialogo 
        titulo={`¡Hola, ${primerNombre}!`}
        mensaje="¿Sabías que el primer procesador del mundo era del tamaño de una uña? ¡Hoy vamos a aprender más secretos!"
      />

      {/* GRID PRINCIPAL DE APRENDIZAJE */}
      <section className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-16 max-w-6xl">
          <LearningCard
            title="Piezas"
            description="Descubre qué hay dentro de la caja mágica."
            borderColor="#6BCB77"
            softColor="rgba(107, 203, 119, 0.2)"
            buttonColor="#6BCB77"
            buttonLabel="Explorar"
            icon={ComponentsIcon}
            onClick={onOpenPieces}
          />

          <LearningCard
            title="Armado"
            description="¡Construye la PC de tus sueños desde cero!"
            borderColor="#FFB800"
            softColor="rgba(255, 184, 0, 0.2)"
            buttonColor="#FFB800"
            buttonLabel="¡A armar!"
            icon={AssemblyIcon}
            onClick={onOpenAssembly}
          />

          <LearningCard
            title="Limpieza"
            description="¡Quita el polvo y haz que tu PC vuele!"
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
