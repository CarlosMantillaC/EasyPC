/**
 * Configuración de niveles del módulo de Piezas
 */

export const PIECES_LEVELS = {
  1: {
    id: 1,
    title: "El Procesador",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Es el cerebro del computador",
    icon: "BrainIcon"
  },
  2: {
    id: 2,
    title: "La Memoria RAM",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Guarda datos mientras usas el computador",
    icon: "MemoryIcon"
  },
  3: {
    id: 3,
    title: "La Fuente de Poder",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Da energía al computador",
    icon: "HeartIcon"
  },
  4: {
    id: 4,
    title: "El Disco Duro",
    subtitle: {
      locked: "Bloqueado",
      active: "¡Juega ahora!",
      completed: "¡Completado!"
    },
    description: "Guarda la información",
    icon: "StorageIcon"
  }
};

export const MODULE_INFO = {
  name: "Componentes",
  totalLevels: 4,
  description: "Aprende las partes del computador"
};

export const PROGRESS_MESSAGES = {
  start: "¡Vamos a empezar!",
  complete: "¡Completaste todo!",
  default: "¡Vas bien!"
};