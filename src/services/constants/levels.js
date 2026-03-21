/**
 * Configuración de niveles del módulo de Piezas
 */

export const PIECES_LEVELS = {
  1: {
    id: 1,
    title: "Nivel 1: El Cerebro",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Aprende sobre el procesador, el cerebro de la computadora",
    icon: "BrainIcon"
  },
  2: {
    id: 2,
    title: "Nivel 2: La Memoria",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Descubre cómo funciona la memoria RAM",
    icon: "MemoryIcon"
  },
  3: {
    id: 3,
    title: "Nivel 3: El Corazón",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Conoce la fuente de poder, el corazón del sistema",
    icon: "HeartIcon"
  },
  4: {
    id: 4,
    title: "Nivel 4: El Almacén",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Explora el almacenamiento de datos",
    icon: "StorageIcon"
  }
};

export const MODULE_INFO = {
  name: "Piezas",
  totalLevels: 4,
  description: "Explora los componentes de tu computadora y conviértete en un experto!"
};

export const PROGRESS_MESSAGES = {
  0: "¡Comienza tu primera aventura!",
  4: "¡Felicidades, completaste todo!",
  default: "¡Sigue así, vas por buen camino!"
};
