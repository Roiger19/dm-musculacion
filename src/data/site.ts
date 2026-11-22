export const site = {
  marca: "DM Musculación",
  eslogan: "Fuerza y Disciplina",
  descripcion:
    "Daniel Sánchez, Master Personal Trainer. Entrenamiento de musculación presencial en Resistencia, Chaco, y online, armado según tu objetivo.",
  /**
   * Dominio de producción. En Vercel sale de VERCEL_PROJECT_PRODUCTION_URL (se resuelve en el build
   * y pasa a ser el dominio propio cuando se conecte uno). En local queda null.
   */
  dominio: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null,
  /** Año de publicación del sitio (estático: cacheComponents no permite `new Date()` en el prerender). */
  anio: 2026,
  redes: {
    instagram: {
      label: "Instagram",
      usuario: "@dm.mastertrainer",
      // Sin el parámetro de seguimiento `evlk` que trae el enlace compartido.
      href: "https://www.instagram.com/dm.mastertrainer/",
    },
  },
  desarrollador: {
    nombre: "Juan Pablo Roig",
    href: "https://www.linkedin.com/in/juanpablosotoroig/",
  },
  nav: [
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#modalidades", label: "Modalidades" },
    { href: "#formacion", label: "Formación" },
    { href: "#videos", label: "Videos" },
  ],
} as const;
