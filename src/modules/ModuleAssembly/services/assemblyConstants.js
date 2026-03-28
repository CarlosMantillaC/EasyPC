/**
 * Configuración de niveles del módulo de Armando (Ensamble)
 */

export const ASSEMBLY_LEVELS = {
  1: {
    id: 1,
    title: "El Procesador",
    subtitle: {
      locked: "Bloqueado",
      active: "¡A jugar!",
      completed: "¡Listo!"
    },
    description: "Coloca el cerebro de la computadora en su sitio.",
    icon: "CpuIcon",
    component: "Level1Motherboard"
  },
  2: {
    id: 2,
    title: "La Memoria RAM",
    subtitle: {
      locked: "Bloqueado",
      active: "¡A jugar!",
      completed: "¡Listo!"
    },
    description: "Inserta la memoria para que tu PC sea rápida.",
    icon: "MemoryIcon",
    component: "Level2Ram"
  },
  3: {
    id: 3,
    title: "El Disco Duro",
    subtitle: {
      locked: "Bloqueado",
      active: "¡A jugar!",
      completed: "¡Listo!"
    },
    description: "Guarda tus juegos en el disco SSD.",
    icon: "StorageIcon",
    component: "Level3Storage"
  },
  4: {
    id: 4,
    title: "El Equipo Completo",
    subtitle: {
      locked: "Bloqueado",
      active: "¡A jugar!",
      completed: "¡Listo!"
    },
    description: "¡Arma todo el computador!",
    icon: "ComponentsIcon",
    component: "Level4Full"
  },
  5: {
    id: 5,
    title: "El Chasis",
    subtitle: {
      locked: "Bloqueado",
      active: "¡A jugar!",
      completed: "¡Listo!"
    },
    description: "¡Coloca todo dentro de la caja!",
    icon: "ComponentsIcon",
    component: "Level5Chasis"
  }
};

export const MODULE_INFO = {
  name: "Armando",
  totalLevels: 5,
  description: "¡Es hora de construir tu propia computadora paso a paso!"
};

export const PROGRESS_MESSAGES = {
  0: "¡Saca las herramientas, vamos a armar!",
  5: "¡Eres un experto armador de PC!",
  default: "¡Cada pieza cuenta, sigue así!"
};
