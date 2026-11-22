export type Foto = {
  src: `/images/${string}.webp`;
  alt: string;
  width: number;
  height: number;
};

export type Modalidad = {
  id: "presencial" | "online";
  titulo: string;
  texto: string;
  detalle: string;
};

export type Paso = { titulo: string; texto: string };

/**
 * Copy basado solo en datos verificables (certificaciones y modalidades confirmadas).
 * Sin años de experiencia, cantidad de alumnos ni resultados prometidos.
 */
export const perfil = {
  nombre: "Daniel Alejandro Sánchez",
  nombreCorto: "Daniel Sánchez",
  rol: "Master Personal Trainer",
  zona: { ciudad: "Resistencia", provincia: "Chaco", pais: "AR" },

  hero: {
    eyebrow: "Master Personal Trainer · Resistencia, Chaco",
    titulo: ["Entrená con método.", "Avanzá con disciplina."],
    bajada:
      "Soy Daniel Sánchez. Armo tu entrenamiento según tu objetivo y te acompaño en cada etapa, en el gimnasio o a distancia.",
  },

  sobreMi: {
    eyebrow: "Sobre mí",
    titulo: "Tu objetivo marca el plan.",
    bio: [
      "Soy Daniel Alejandro Sánchez, Master Personal Trainer e Instructor Avanzado en Fitness y Actividad Física. Mi trabajo empieza por una pregunta simple: ¿qué querés lograr?",
      "Ganar masa muscular, sumar fuerza, mejorar tu composición corporal o volver a entrenar cuidando tu salud: cada objetivo pide un plan distinto. Lo armo con base en biomecánica, hipertrofia, nutrición deportiva y prevención de lesiones, y lo ajusto a medida que avanzás.",
      "No se trata solo de pasarte una rutina. Te enseño a ejecutar cada ejercicio con buena técnica, a entender por qué hacés lo que hacés y a sostenerlo en el tiempo.",
    ],
    cita: "La fuerza se construye con constancia. La disciplina, acompañado.",
  },

  modalidades: {
    eyebrow: "Modalidades",
    titulo: "Presencial u online. El mismo método.",
    items: [
      {
        id: "presencial",
        titulo: "Presencial",
        texto:
          "Entrenamos juntos: corrijo tu técnica en el momento, ajusto las cargas y te guío serie a serie.",
        detalle: "En Resistencia, Chaco. Consultá horarios por WhatsApp.",
      },
      {
        id: "online",
        titulo: "Online",
        texto:
          "Recibís un plan programado para tu objetivo y seguimiento a distancia para ajustarlo según cómo respondés.",
        detalle: "Entrenás donde estés, con un plan pensado para vos.",
      },
    ] satisfies Modalidad[],
    pasos: [
      { titulo: "Contame tu objetivo", texto: "Escribime por WhatsApp y empezamos por lo que querés lograr." },
      { titulo: "Definimos el punto de partida", texto: "Tu nivel, tu disponibilidad y lo que tenés que cuidar." },
      { titulo: "Plan y ajustes", texto: "Entrenás con un plan claro que se revisa a medida que progresás." },
    ] satisfies Paso[],
  },

  /** 1–2 retratos. Se cargan con `npm run medios` (ver medios-fuente/LEEME.md). */
  fotos: [
    {
      src: "/images/daniel-retrato.webp",
      alt: "Daniel Sánchez de brazos cruzados en el gimnasio",
      width: 896,
      height: 1200,
    },
  ] as Foto[],
} as const;
