import LearningCard from "./LearningCard";
import MascotaDialogo from "./MascotaDialogo";

export default function HomePage({ user }) {
  const primerNombre = user?.displayName?.split(' ')[0] || 'Explorador';

  return (
    <div className="pb-20">
      {/* MASCOTA CON DIÁLOGO */}
      <MascotaDialogo 
        titulo={`¡Hola, ${primerNombre}!`}
        mensaje="¿Sabías que el primer procesador del mundo era del tamaño de una uña? ¡Hoy vamos a aprender más secretos!"
      />

      {/* GRID PRINCIPAL DE APRENDIZAJE */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <LearningCard
          title="Piezas"
          description="Descubre qué hay dentro de la caja mágica."
          borderColor="#6BCB77"
          softColor="rgba(107, 203, 119, 0.2)"
          buttonColor="#6BCB77"
          buttonLabel="Explorar"
        />

        <LearningCard
          title="Limpieza"
          description="¡Quita el polvo y haz que tu PC vuele!"
          borderColor="#FFD93D"
          softColor="rgba(255, 217, 61, 0.2)"
          buttonColor="#FFD93D"
          buttonLabel="¡A limpiar!"
          locked
        />

        <LearningCard
          title="Armado"
          description="¡Construye la PC de tus sueños desde cero!"
          borderColor="#FF6B6B"
          softColor="rgba(255, 107, 107, 0.2)"
          buttonColor="#FF6B6B"
          buttonLabel="¡A armar!"
          locked
        />
      </section>
    </div>
  );
}
