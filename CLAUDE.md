@AGENTS.md

# DM Musculación — Landing page

Landing de una sola página para **DM Musculación** ("Fuerza y Disciplina"), marca del entrenador
**Daniel Alejandro Sánchez**. Presenta al entrenador, sus certificaciones, 1–2 fotos suyas y videos de
entrenamiento, y lleva al visitante a **WhatsApp**. Sitio estático: sin base de datos, sin sesiones, sin
planes ni precios, sin formularios.

## Fuentes de verdad (cargar antes de trabajar)

| Tarea | Skill |
|---|---|
| UI, estilos, colores, tipografía, copy, CTAs, animación, fotos, videos, certificados | `.claude/skills/dm-branding/SKILL.md` |
| `next.config.ts`, headers/CSP, enlaces externos, imágenes, medios en `public/`, dependencias, deploy | `.claude/skills/nextjs-security/SKILL.md` |
| Catálogo deduplicado de certificaciones | `.claude/skills/dm-branding/certificaciones.md` |
| APIs de Next 16.4 | `node_modules/next/dist/docs/` (ver `AGENTS.md`) |

Skills externas: **impeccable** (`~/.claude/skills/impeccable`, con hooks a nivel usuario) para diseño,
crítica y pulido. Si `/impeccable init` pide PRODUCT.md o DESIGN.md, derivarlos de `dm-branding`; ante
conflicto manda `dm-branding`. Las skills de **Emil Kowalski** (`emil-design-eng`, `animate`,
`review-animations`, `choreograph`…) están en `~/.agents/skills`, que Claude Code no carga: sus criterios
están resumidos en `dm-branding` §9.

## Reglas no negociables

1. **Paleta exacta**: `#9CE3CD` menta · `#172421` carbon · `#FFFFFF` blanco · `#5AB59B` esmeralda.
   Ningún otro color; la paleta default de Tailwind se elimina con `--color-*: initial`.
2. **Tipografías**: Montserrat (display), Raleway (eslogan/eyebrows), Inter (cuerpo) vía `next/font/google`.
3. **Contraste**: nunca blanco sobre esmeralda (2.47:1) ni texto menta/esmeralda sobre blanco.
4. **Sin sombras pesadas ni brillos 3D**. Nunca `#172421` sobre fotos/videos oscuros sin contenedor o inversión.
5. **Enlaces externos** con `target="_blank" rel="noopener noreferrer"` vía `ExternalLink`; WhatsApp solo vía `whatsappUrl()`.
6. **Sin base de datos, ORM, auth, formularios ni Server Actions.** No agregar dependencias sin justificarlo.
7. **Copy factual en voseo**: no inventar testimonios, cifras, años de experiencia, precios ni modalidades.
8. **Medios**: nada de PDF en `public/`; fotos y videos sin metadatos; firmas de terceros difuminadas.
9. **Logo**: siempre desde `public/brand/` con la variante que corresponde al fondo (`dm-branding` §4);
   nunca recrearlo con texto ni recolorearlo con CSS.

## Stack

- Next.js 16.4.6 (App Router, `cacheComponents` y `partialPrefetching` activos), React 19.3, TypeScript `strict`.
- Tailwind CSS 4.3 vía `@tailwindcss/turbopack` (configurado en `next.config.ts`); tokens en `src/app/globals.css` con `@theme`.
- Alias `@/*` → `src/*`. Server Components por defecto; `"use client"` solo en islas mínimas
  (reproducción de video, reveals con `IntersectionObserver`, menú mobile).
- Next 16: Middleware ahora es `proxy.ts` (no se usa aquí); `next/image` usa `preload` en lugar de `priority`
  y exige `images.qualities`.

## Estructura prevista

```
src/
  app/            layout.tsx (fuentes, metadata, lang="es-AR"), page.tsx (composición), globals.css (tokens)
  components/     external-link.tsx, whatsapp-button.tsx, video-clip.tsx, reveal.tsx
  components/sections/  hero, sobre-mi, certificaciones, videos, cierre
  data/           site.ts, whatsapp.ts (número, mensajes, whatsappUrl), perfil.ts, estudios.ts, videos.ts
public/
  images/         retratos y certificados/ (WebP sin metadatos)
  videos/         MP4 720p sin audio + posters WebP
  brand/          logo y monograma en PNG transparente: carbon, blanco, menta (listos para usar)
assets/brand/     logo original del cliente (fuente, no se publica)
certificados/     14 certificados únicos en PDF (fuente, NO se publica)
```

## Comandos

```bash
npm run dev          # desarrollo (Turbopack)
npx tsc --noEmit     # tipos
npm run lint         # ESLint (next core-web-vitals + typescript)
npm run build        # build de producción
```

## Definición de terminado

- `npx tsc --noEmit` y `npm run lint` sin errores. El hook **Stop** (`.claude/hooks/quality-gate.mjs`) los
  ejecuta junto con chequeos de marca y seguridad cada vez que hay cambios sin commitear en `src/`,
  `public/` o la configuración, y bloquea el cierre si algo falla.
- UI verificada en el navegador a 375 px y 1440 px, con `prefers-reduced-motion` y sin errores de CSP en consola.
- Checklists de `dm-branding` §11 y `nextjs-security` §9 cumplidos.

## Pendientes del cliente

- Resuelto (2026-11-22): WhatsApp +54 9 362 488-5076 y mensajes precargados aprobados; ambas modalidades
  (presencial y online); Instagram @dm.mastertrainer; crédito de desarrollo en el footer (Juan Pablo Roig).
- Resuelto (2026-11-22): zona presencial Resistencia, Chaco; retrato y 3 clips (hero + jalón + curl) procesados con `npm run medios`.
- Resuelto (2026-11-22): el cliente aprueba el retrato generado con IA (Gemini) y el alumno del clip del hero autorizó el uso de su imagen.
- Videos originales en mejor resolución (los actuales vienen de WhatsApp a 480×848).
- Deploy en Vercel (repo GitHub de Roiger19). El dominio sale de `VERCEL_PROJECT_PRODUCTION_URL`; si se conecta un dominio propio, se toma solo.
- Logo en SVG para piezas grandes (hoy hay PNG derivados del JPEG original, nítidos hasta ~440 px de ancho).
- Imágenes de certificados: exportar los PDF a WebP con firmas difuminadas (no hay renderizador de PDF instalado).
