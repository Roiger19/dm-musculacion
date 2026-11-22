---
name: dm-branding
description: Manual de identidad de DM Musculación ("Fuerza y Disciplina") aplicado a la landing en Next.js + Tailwind v4. Usar SIEMPRE antes de crear o modificar UI, estilos, colores, tipografía, copy, CTAs de WhatsApp, animaciones, fotos, videos o la sección de certificaciones; también al revisar o auditar cualquier pantalla del proyecto.
---

# DM Musculación — Manual de marca aplicado

Marca personal del entrenador **Daniel Alejandro Sánchez**. Eslogan: **Fuerza y Disciplina**.
Objetivo de la landing: presentar al entrenador, respaldar su conocimiento con sus certificaciones,
mostrar 1–2 fotos y videos de entrenamiento, y llevar al visitante a **WhatsApp**. No hay planes,
precios, formularios, login ni base de datos.

Personalidad: sobria, firme, disciplinada, cercana. La energía la ponen las fotos y los videos;
la interfaz es limpia y plana.

## 1. Paleta oficial (exacta, sin variantes)

| Token Tailwind | Hex | Nombre oficial | Rol |
|---|---|---|---|
| `menta` | `#9CE3CD` | Verde Menta Fresco | Campo de marca (fondo del logo), bandas de CTA, bloques destacados |
| `carbon` | `#172421` | Carbón Petróleo Profundo | Texto principal, secciones oscuras, logo sobre claro, overlays |
| `blanco` | `#FFFFFF` | Blanco Puro | Fondo de lectura, texto sobre carbón |
| `esmeralda` | `#5AB59B` | Menta Oscuro / Esmeralda Apagado | Acento: botones, filetes, íconos, estados activos (≤10 % de la superficie) |

- **Prohibido** cualquier otro color: ni grises de Tailwind, ni negro puro, ni el verde de WhatsApp (#25D366).
- Transparencia permitida solo sobre colores oficiales (`bg-carbon/70`, `border-carbon/15`) para overlays,
  divisores y estados; nunca para inventar un tono nuevo como color de texto principal.
- Gradientes: solo carbón → carbón transparente como scrim de legibilidad sobre foto/video. Nada de
  gradientes decorativos entre tonos.
- Sin modo oscuro automático (`prefers-color-scheme`): el ritmo claro/oscuro lo define la marca por sección.

### Contraste WCAG 2.2 (calculado)

| Texto / Fondo | Ratio | Uso |
|---|---|---|
| carbon / blanco | 16.02 | ✅ Todo texto |
| carbon / menta | 10.90 | ✅ Todo texto |
| menta / carbon | 10.90 | ✅ Todo texto |
| blanco / carbon | 16.02 | ✅ Todo texto |
| carbon / esmeralda | 6.50 | ✅ Texto de botón y etiquetas |
| esmeralda / carbon | 6.50 | ✅ Texto y acentos sobre fondo oscuro |
| **blanco / esmeralda** | **2.47** | ❌ Nunca, ni en texto grande |
| **esmeralda / blanco** | **2.47** | ❌ Ni texto ni bordes de UI esenciales (exigen 3:1); solo decorativo |
| **menta / blanco** | **1.47** | ❌ Solo como bloque de fondo; nunca texto ni borde |
| menta ↔ esmeralda | 1.68 | ❌ Nunca texto |

Consecuencia directa: **los botones esmeralda llevan texto carbón**, nunca blanco.

## 2. Tipografía (Google Fonts vía `next/font`, auto-hospedadas)

| Familia | Variable CSS | Utilidad Tailwind | Uso |
|---|---|---|---|
| Montserrat | `--font-montserrat` | `font-display` | Wordmark, H1–H3, etiquetas de CTA, cifras destacadas. 700–800 en H1, 600–700 en H2/H3. |
| Raleway | `--font-raleway` | `font-accent` | Eslogan, eyebrows y subtítulos cortos. Mayúsculas, 500–600, `tracking-[0.16em]`. Si muestra números: `lining-nums` (Raleway trae cifras old-style). |
| Inter | `--font-inter` | `font-sans` (default) | Cuerpo, listas, metadatos de certificados, pie. 400–500; fechas con `tabular-nums`. |

- Las tres son variables en Google Fonts: no declarar `weight`.
- Cuerpo mínimo 16 px (`text-base`), interlineado 1.6, medida 60–70 caracteres (`max-w-prose`).
- H1 fluido con `clamp()` (aprox. 2.5rem → 4.5rem). Mayúsculas solo en H1, eyebrows y eslogan.
- Nada de itálicas falsas, outline text ni tipografías extra.

```tsx
// src/app/layout.tsx
import { Inter, Montserrat, Raleway } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// <html lang="es-AR" className={`${montserrat.variable} ${raleway.variable} ${inter.variable}`}>
```

## 3. Tokens en Tailwind v4 (`src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-*: initial; /* elimina la paleta default: solo existen los colores de marca */
  --color-menta: #9ce3cd;
  --color-carbon: #172421;
  --color-blanco: #ffffff;
  --color-esmeralda: #5ab59b;

  --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
}

@theme inline {
  --font-display: var(--font-montserrat);
  --font-accent: var(--font-raleway);
  --font-sans: var(--font-inter);
}

body {
  background: var(--color-blanco);
  color: var(--color-carbon);
}
```

Hex solo en este archivo; en componentes, siempre tokens (`bg-menta`, `text-carbon`…).

## 4. Logo

- Monograma **DM** (bíceps integrado en la D, mancuerna en la M) + wordmark **DM MUSCULACIÓN**
  (sans geométrica bold, mayúsculas) + filete fino + eslogan **FUERZA Y DISCIPLINA** espaciado.
- Original: `assets/brand/dm-musculacion-logo-original.jpeg` (1536×1024, fondo menta texturado).
  Es material fuente: no se publica ni se usa directo en la web.
- Variantes para la web en `public/brand/`: PNG transparente, color exacto de la paleta, sin metadatos,
  derivadas del original. **Usar siempre estos archivos**; nunca recrear el logo con texto HTML ni
  recolorearlo con filtros CSS.

| Archivo | Px | Fondo permitido |
|---|---|---|
| `dm-logo-carbon.png` | 880×656 | blanco, menta |
| `dm-logo-blanco.png` | 880×656 | carbon, o scrim carbón sobre foto/video |
| `dm-logo-menta.png` | 880×656 | carbon, o scrim carbón sobre foto/video |
| `dm-monograma-carbon.png` | 696×448 | blanco, menta |
| `dm-monograma-blanco.png` | 696×448 | carbon |
| `dm-monograma-menta.png` | 696×448 | carbon |

  *Logo* = monograma + wordmark + filete + eslogan. *Monograma* = solo "DM".

- Usos previstos al construir la web:
  - **Header**: monograma de 32–40 px de alto como enlace a inicio (`alt="DM Musculación, inicio"`).
  - **Hero**: logo completo en blanco o menta sobre el scrim carbón del video, o en carbón sobre panel menta.
    Como ya contiene el eslogan, no repetir "Fuerza y Disciplina" como texto al lado.
  - **Cierre/footer**: logo completo en tamaño contenido.
  - **Favicon** (`src/app/icon.png`) y **Open Graph** (`opengraph-image`): derivar del monograma o del logo
    en carbón sobre menta; reemplazan el `favicon.ico` default de Next.
- Implementación: `next/image` con `width`/`height` intrínsecos de la tabla y `sizes`. `alt` del logo completo:
  "DM Musculación — Fuerza y Disciplina".
- Límite de resolución: logo completo nítido hasta ~440 px de ancho CSS en pantallas 2x; monograma hasta ~350 px.
  Para piezas más grandes hace falta el **SVG** (pedirlo al cliente).
- Prohibido: recolorear fuera de la paleta, sombras, glow, biseles, 3D, contornos, deformar, rotar, o
  ponerlo sobre fotos/videos sin scrim carbón o panel sólido.
- Área de resguardo: altura de la "M" del wordmark en los cuatro lados. Monograma mínimo 32 px de alto.

## 5. Reglas duras del manual

1. **Sin sombras paralelas pesadas ni brillos 3D**: no `shadow-lg/xl/2xl`, `drop-shadow-*` grandes,
   `text-shadow`, glow, bisel, emboss, glassmorphism ni reflejos. La profundidad se logra con color plano,
   filetes de 1 px (`border-carbon/15`) y contraste de secciones.
2. **Nunca `#172421` sobre fotos o videos oscuros sin contenedor o inversión.** Opciones válidas:
   - *Inversión*: texto blanco o menta sobre scrim `bg-carbon/60`–`/80` encima de la imagen.
   - *Contenedor*: panel sólido `bg-blanco` o `bg-menta` detrás del texto carbón.
   Texto carbón directo sobre una foto clara solo si cada zona del texto mide ≥ 4.5:1; ante la duda, contenedor.
3. **Enlaces externos** siempre con `target="_blank" rel="noopener noreferrer"` vía el componente
   `ExternalLink` (ver skill `nextjs-security`).
4. Sin formularios, sin precios, sin planes: el único canal de contacto es WhatsApp.

## 6. CTA de WhatsApp

- Botón principal: `bg-esmeralda text-carbon` o `bg-carbon text-menta`; sobre fondo menta usar `bg-carbon text-blanco`.
  Ícono de WhatsApp monocromo en `currentColor`, nunca su verde oficial.
- Texto en voseo y con verbo: "Escribime por WhatsApp", "Pedí información", "Consultá tu entrenamiento".
- Mensaje precargado distinto por ubicación (hero, certificaciones, cierre) para que Daniel sepa desde dónde
  llega la consulta. Ej.: `Hola Daniel, vi tu página DM Musculación y quiero información para empezar a entrenar.`
- URL generada solo con el helper `whatsappUrl()` de `src/data/whatsapp.ts` (número único, `encodeURIComponent`).
- Ubicaciones: hero, después de certificaciones, cierre/footer y botón flotante en mobile (respetando
  `env(safe-area-inset-bottom)` y sin tapar contenido). Objetivo táctil ≥ 44 × 44 px.

## 7. Copy y voz

- Español rioplatense con voseo ("entrená", "escribime"). Frases cortas, afirmativas, concretas.
- **Solo hechos verificables**: no inventar testimonios, cantidad de alumnos, años de experiencia, resultados,
  precios ni modalidades. Si falta un dato, dejar `TODO` y preguntarlo.
- Sin hype ("¡Transformá tu vida en 30 días!"), sin emojis en titulares, sin signos de exclamación en serie.
- Credenciales con su nombre exacto (ver `certificaciones.md`). Nunca decir "título universitario",
  "licenciado" ni "profesorado". RCP se describe como "Reanimación cardiopulmonar (protocolo AHA)".

## 8. Fotos, videos y certificados

- **Fotos (1–2 del entrenador)**: `next/image`, retrato real, sin filtros de color ni duotonos fuera de
  paleta; `alt` descriptivo ("Daniel Sánchez entrenando press de banca en el gimnasio").
- **Videos de entrenamiento**: clip de ambiente en el hero (≤ 15 s, 720p, ≤ 4 MB, sin audio,
  `autoPlay muted loop playsInline` + `poster`) y 2–4 clips de ejercicios con `preload="none"`, `poster` y
  reproducción al tocar. Pausar fuera de viewport. Reservar el espacio (`aspect-video` o `width/height`) para CLS 0.
  Con `prefers-reduced-motion: reduce` no hay autoplay: se muestra el poster con botón de play.
- **Certificados**: catálogo y agrupación en [certificaciones.md](certificaciones.md). Se publican como imagen
  WebP optimizada (nunca PDF) siguiendo la higiene de medios de `nextjs-security`.
- Todo archivo de `public/` se sirve tal cual: quitar metadatos/GPS antes de copiarlo.

## 9. Movimiento (criterios de Emil Kowalski)

Las skills de Emil (`emil-design-eng`, `animate`, `review-animations`, `choreograph`…) están en
`~/.agents/skills`. Estas reglas las resumen para este proyecto:

- Animar solo con propósito: orientar (entrada del hero), confirmar (press) o revelar contenido al hacer scroll.
  Nada en bucle salvo el video de fondo.
- Solo `transform` y `opacity` (y `clip-path` puntual). Nunca `transition: all`, ni animar `width/height/top/left`
  ni sombras.
- Curvas: `ease-out-strong` para entradas y respuestas; `ease-in-out-strong` para desplazamientos en pantalla.
  Nunca `ease-in` en UI. Sin rebotes ni elásticos: la marca es disciplina, no juego.
- Duraciones: press 100–160 ms; hover/color 150–200 ms; reveal de sección 300–450 ms; secuencia del hero ≤ 900 ms total.
- Press: `active:scale-[0.97]`. Entradas desde `opacity-0 translate-y-3` (≈12 px) o `scale-[0.96]`; nunca `scale(0)`.
- Stagger 40–60 ms, máximo 5 elementos por grupo. Reveals una sola vez (`IntersectionObserver`, umbral ~15 %).
- Hover solo en `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce`: sin desplazamientos ni escalas, contenido visible de inmediato, sin autoplay.
- CSS + un `IntersectionObserver` en un componente cliente pequeño. No sumar librerías de animación sin necesidad demostrada.

## 10. Accesibilidad mínima

`lang="es-AR"`, un solo `h1`, jerarquía de headings sin saltos, foco visible (`outline-2 outline-offset-2`:
carbón sobre claro, menta sobre oscuro), navegación completa por teclado, `alt` en toda imagen informativa,
`aria-label` en botones de ícono, videos con subtítulos si hay voz, sin texto incrustado en imágenes salvo certificados.

## 11. Checklist antes de entregar UI

- [ ] Solo tokens `menta/carbon/blanco/esmeralda`; ningún hex fuera de `globals.css`.
- [ ] Ninguna combinación ❌ de la tabla de contraste.
- [ ] Montserrat / Raleway / Inter con los roles definidos; sin otras familias.
- [ ] Sin sombras pesadas, glow ni efectos 3D.
- [ ] Logo y monograma desde `public/brand/`, con la variante correcta para cada fondo.
- [ ] Texto sobre foto/video con scrim carbón o contenedor sólido.
- [ ] Enlaces externos con `ExternalLink`; CTAs vía `whatsappUrl()`.
- [ ] Movimiento con propósito, curvas y duraciones de §9, y variante reduced-motion probada.
- [ ] Verificado a 375 px y 1440 px, sin scroll horizontal.
- [ ] `npx tsc --noEmit` y `npm run lint` sin errores (el hook Stop lo exige).
