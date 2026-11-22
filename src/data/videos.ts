export type Clip = {
  id: string;
  titulo: string;
  descripcion?: string;
  src: `/videos/${string}.mp4`;
  poster: `/videos/${string}.webp`;
  width: number;
  height: number;
  duracionSeg: number;
};

/**
 * Clip de ambiente del hero: ≤ 15 s, ≤ 4 MB, sin audio. `null` = hero sin video.
 * Origen: celular (WhatsApp), 480×848 vertical. Muestra a Daniel asistiendo una sentadilla.
 */
export const heroClip: Clip | null = {
  id: "hero-gimnasio",
  titulo: "Daniel asistiendo una sentadilla con barra",
  src: "/videos/hero-gimnasio-720.mp4",
  poster: "/videos/hero-gimnasio-poster.webp",
  width: 480,
  height: 848,
  duracionSeg: 7,
};

/** 2–4 clips de ejercicios. Vacío = la sección Videos no se renderiza. */
export const clips: readonly Clip[] = [
  {
    id: "jalon-al-pecho",
    titulo: "Jalón al pecho",
    descripcion: "Polea alta, espalda.",
    src: "/videos/jalon-al-pecho-720.mp4",
    poster: "/videos/jalon-al-pecho-poster.webp",
    width: 480,
    height: 848,
    duracionSeg: 9,
  },
  {
    id: "curl-biceps-polea",
    titulo: "Curl de bíceps en polea",
    descripcion: "Polea baja, bíceps.",
    src: "/videos/curl-biceps-polea-720.mp4",
    poster: "/videos/curl-biceps-polea-poster.webp",
    width: 480,
    height: 848,
    duracionSeg: 6,
  },
];
