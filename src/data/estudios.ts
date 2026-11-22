/** Fuente: .claude/skills/dm-branding/certificaciones.md (14 credenciales deduplicadas). */

export type Area = "musculacion" | "funcional" | "salud" | "nutricion" | "online";

export type Credencial = {
  id: string;
  titulo: string;
  detalle?: string;
  emisor: "Gualda Training";
  selloAlifid: boolean;
  /** ISO "AAAA-MM". */
  fecha: `${number}-${number}`;
  area: Area;
  tipo: "certificacion" | "asistencia";
  destacada: boolean;
  imagen?: { src: `/images/certificados/${string}.webp`; width: number; height: number };
};

export const AREAS = {
  musculacion: "Musculación e hipertrofia",
  funcional: "Entrenamiento funcional",
  salud: "Salud, prevención y seguridad",
  nutricion: "Nutrición y recuperación",
  online: "Coaching online",
} as const satisfies Record<Area, string>;

export const credenciales = [
  {
    id: "master-personal-trainer",
    titulo: "Master Personal Trainer",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-04",
    area: "musculacion",
    tipo: "certificacion",
    destacada: true,
    imagen: { src: "/images/certificados/master-personal-trainer.webp", width: 1200, height: 848 },
  },
  {
    id: "instructor-avanzado-fitness",
    titulo: "Instructor Avanzado en Fitness y Actividad Física",
    detalle:
      "Integra Personal Trainer y Musculación, Musculación e Hipertrofia, Nutrición Deportiva, Funcional HIIT y GAP, y Lesiones Deportivas.",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-04",
    area: "musculacion",
    tipo: "certificacion",
    destacada: true,
    imagen: { src: "/images/certificados/instructor-avanzado-fitness.webp", width: 1200, height: 848 },
  },
  {
    id: "personal-trainer-musculacion",
    titulo: "Instructorado de Personal Trainer y Musculación",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-03",
    area: "musculacion",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/personal-trainer-musculacion.webp", width: 1200, height: 848 },
  },
  {
    id: "musculacion-hipertrofia",
    titulo: "Instructor de Musculación y Especialista en Hipertrofia",
    emisor: "Gualda Training",
    selloAlifid: false,
    fecha: "2026-04",
    area: "musculacion",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/musculacion-hipertrofia.webp", width: 1200, height: 848 },
  },
  {
    id: "biomecanica",
    titulo: "Biomecánica",
    emisor: "Gualda Training",
    selloAlifid: false,
    fecha: "2026-04",
    area: "musculacion",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/biomecanica.webp", width: 1200, height: 848 },
  },
  {
    id: "entrenamiento-gluteos",
    titulo: "Guía de Entrenamiento de Glúteos",
    emisor: "Gualda Training",
    selloAlifid: false,
    fecha: "2026-08",
    area: "musculacion",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/entrenamiento-gluteos.webp", width: 1200, height: 848 },
  },
  {
    id: "webinar-hipertrofia-fuerza",
    titulo: "Webinar «Hipertrofia y Fuerza: mitos, verdades y los métodos que realmente funcionan»",
    emisor: "Gualda Training",
    selloAlifid: false,
    fecha: "2026-03",
    area: "musculacion",
    tipo: "asistencia",
    destacada: false,
    imagen: { src: "/images/certificados/webinar-hipertrofia-fuerza.webp", width: 1200, height: 676 },
  },
  {
    id: "funcional-hiit-gap",
    titulo: "Instructor de Entrenamiento Funcional, HIIT y GAP",
    detalle: "Incluye Tabata, AMRAP, EMOM y circuitos.",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-03",
    area: "funcional",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/funcional-hiit-gap.webp", width: 1200, height: 848 },
  },
  {
    id: "salud-personal-trainer",
    titulo: "Especialización en Salud para Personal Trainer",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-04",
    area: "salud",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/salud-personal-trainer.webp", width: 1200, height: 848 },
  },
  {
    id: "lesiones-deportivas",
    titulo: "Lesiones Deportivas",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-04",
    area: "salud",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/lesiones-deportivas.webp", width: 1200, height: 848 },
  },
  {
    id: "reanimacion-cardiopulmonar",
    titulo: "Reanimación cardiopulmonar",
    detalle: "Protocolo AHA, examen teórico aprobado.",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-03",
    area: "salud",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/reanimacion-cardiopulmonar.webp", width: 1200, height: 848 },
  },
  {
    id: "nutricion-deportiva",
    titulo: "Nutrición Deportiva",
    emisor: "Gualda Training",
    selloAlifid: true,
    fecha: "2026-04",
    area: "nutricion",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/nutricion-deportiva.webp", width: 1200, height: 848 },
  },
  {
    id: "sueno-rendimiento",
    titulo: "Sueño y Rendimiento",
    emisor: "Gualda Training",
    selloAlifid: false,
    fecha: "2026-04",
    area: "nutricion",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/sueno-rendimiento.webp", width: 1200, height: 848 },
  },
  {
    id: "entrenamiento-online",
    titulo: "Especialista en Entrenamiento Online",
    detalle: "Programación de entrenamiento online.",
    emisor: "Gualda Training",
    selloAlifid: false,
    fecha: "2026-04",
    area: "online",
    tipo: "certificacion",
    destacada: false,
    imagen: { src: "/images/certificados/entrenamiento-online.webp", width: 1200, height: 848 },
  },
] as const satisfies readonly Credencial[];

export function destacadas(): readonly Credencial[] {
  return credenciales.filter((c) => c.destacada);
}

/** Resto de credenciales agrupadas por área; la asistencia (webinar) va al final de su grupo. */
export function porArea(): { area: Area; titulo: string; items: Credencial[] }[] {
  return (Object.keys(AREAS) as Area[])
    .map((area) => ({
      area,
      titulo: AREAS[area],
      items: credenciales
        .filter((c) => !c.destacada && c.area === area)
        .sort((a, b) => Number(a.tipo === "asistencia") - Number(b.tipo === "asistencia")),
    }))
    .filter((g) => g.items.length > 0);
}

export const totalCertificaciones = credenciales.filter((c) => c.tipo === "certificacion").length;

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** "2026-04" → "abr 2026". Determinístico (sin Intl ni zona horaria). */
export function formatearFecha(fecha: Credencial["fecha"]): string {
  const [anio, mes] = fecha.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

export function emisorLabel(c: Credencial): string {
  return c.selloAlifid ? `${c.emisor} · sello ALIFID` : c.emisor;
}
