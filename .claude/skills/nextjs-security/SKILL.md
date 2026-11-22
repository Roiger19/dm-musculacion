---
name: nextjs-security
description: Criterios de seguridad y privacidad de la landing estática de DM Musculación (Next.js 16 App Router, sin base de datos ni formularios). Usar SIEMPRE al tocar next.config.ts, headers/CSP, enlaces externos o de WhatsApp, next/image, videos, scripts de terceros, metadata/JSON-LD, dependencias, variables de entorno o archivos en public/ (fotos, videos, certificados), y antes de un deploy.
---

# Seguridad — Landing DM Musculación

## 1. Modelo de amenazas

Sitio estático de una página: sin base de datos, sin auth, sin formularios, sin datos de usuarios.
La superficie real es:

| Riesgo | Control |
|---|---|
| XSS / inyección de scripts | CSP estricta, cero `dangerouslySetInnerHTML` (salvo JSON-LD escapado), cero scripts de terceros por defecto |
| Clickjacking | `frame-ancestors 'none'` + `X-Frame-Options: DENY` |
| Tabnabbing en enlaces externos | `rel="noopener noreferrer"` obligatorio vía `ExternalLink` |
| Fuga de datos en medios | EXIF/GPS en fotos, metadatos en videos y PDF, firmas de terceros en certificados |
| Abuso del optimizador de imágenes | `images.localPatterns` + `qualities` cerrados, sin `remotePatterns` |
| Cadena de suministro | Dependencias mínimas, lockfile versionado, `npm audit` antes de deploy |
| Fingerprinting | `poweredByHeader: false` |

## 2. Lo que este proyecto NO tiene (y no debe agregar)

- Base de datos, ORM, clientes de DB/KV, auth (`next-auth`, Clerk…), librerías de formularios.
- `<form>`, `<input>`, `<textarea>`, `<select>`, Server Actions (`"use server"`), Route Handlers de API.
  Rutas de metadata (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.tsx`) sí están permitidas.
- `proxy.ts` (ex-middleware): no hace falta; los headers son estáticos.
- Secretos o `.env`: el número de WhatsApp es dato público y vive en `src/data/whatsapp.ts`.
  Nunca poner secretos en variables `NEXT_PUBLIC_*`.

Si el cliente pide "un formulario de contacto", la respuesta es un CTA de WhatsApp.
El hook `.claude/hooks/quality-gate.mjs` bloquea dependencias prohibidas, formularios y `"use server"`.

## 3. Headers de seguridad y CSP (`next.config.ts`)

**Por qué CSP estática y no nonce:** el proyecto usa `cacheComponents` y prerenderizado parcial. Según
`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`, los nonces obligan a renderizar
dinámicamente cada request y son incompatibles con PPR. Sin datos de usuario, una CSP estática en
`headers()` es el equilibrio correcto. Integrar este bloque **conservando** la configuración existente
(`cacheComponents`, `partialPrefetching`, `turbopack`):

```ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // ...configuración existente
  poweredByHeader: false,
  images: {
    qualities: [75],
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/brand/**", search: "" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
```

- `'unsafe-eval'` solo en desarrollo (lo exige React para depurar). Nunca en producción.
- `font-src 'self'` funciona porque `next/font/google` auto-hospeda las fuentes: **no** usar `<link>` a fonts.googleapis.com.
- `media-src 'self'`: los videos se sirven desde `public/videos/`. Si se decide embeber YouTube, cambiar
  `frame-src` a `https://www.youtube-nocookie.com` (nunca `*`) y usar `loading="lazy"` + `title`.
- `preload` en HSTS solo si el dominio se registra en hstspreload.org.
- Endurecimiento opcional: `experimental.sri` para quitar `'unsafe-inline'` de `script-src`. Adoptarlo solo si
  `npm run build && npm run start` no muestra violaciones CSP en la consola.
- Toda fuente nueva (analytics, mapa, embed) exige ampliar la CSP **directiva por directiva**, con host exacto.

## 4. Enlaces externos y WhatsApp

Todo `target="_blank"` lleva `rel="noopener noreferrer"` (la regla `react/jsx-no-target-blank` está
**apagada** en `eslint-config-next`; la controla el quality gate). Usar siempre este componente:

```tsx
// src/components/external-link.tsx
import type { ComponentPropsWithoutRef } from "react";

const ALLOWED_HOSTS = new Set(["wa.me", "api.whatsapp.com", "www.instagram.com", "instagram.com"]);

type ExternalLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "rel"> & {
  href: string;
};

export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  const url = new URL(href);
  if (url.protocol !== "https:" || !ALLOWED_HOSTS.has(url.hostname)) {
    throw new Error(`Enlace externo no permitido: ${href}`);
  }
  return (
    <a {...rest} href={url.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
```

```ts
// src/data/whatsapp.ts — única fuente del número
const WHATSAPP_NUMBER = "TODO"; // formato internacional, solo dígitos (AR móvil: 549 + área + número)

if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  throw new Error("WHATSAPP_NUMBER inválido: usar formato internacional solo con dígitos");
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

- Ampliar `ALLOWED_HOSTS` solo con hosts reales del cliente (Instagram, YouTube…), siempre `https:`.
- Prohibido `javascript:` en cualquier `href`. Enlaces internos con `next/link` o anclas `#seccion`.

## 5. Higiene de medios (todo lo de `public/` se sirve tal cual)

`next/image` limpia metadatos en la versión optimizada, pero el original en `public/` sigue siendo
descargable. Por eso **se limpia antes de copiar**. `ffmpeg` está instalado en esta máquina.

```bash
# Foto del entrenador: sin EXIF/GPS, WebP
ffmpeg -i original.jpg -map_metadata -1 -c:v libwebp -quality 82 public/images/daniel-retrato.webp

# Video: sin metadatos ni audio, 720p H.264, faststart para streaming progresivo
ffmpeg -i clip.mov -map_metadata -1 -an -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/videos/press-banca-720.mp4

# Poster del video
ffmpeg -ss 1 -i public/videos/press-banca-720.mp4 -frames:v 1 -map_metadata -1 public/videos/press-banca-poster.webp

# Verificar que no quedan tags de ubicación o fecha
ffprobe -v error -show_entries format_tags:stream_tags -of json public/videos/press-banca-720.mp4
```

- **Certificados**: `certificados/` es material fuente y queda fuera de `public/`. Nunca publicar PDF
  (metadatos, texto copiable, peso). Exportar a WebP a `public/images/certificados/` con ancho ≤ 1200 px.
- Los certificados ALIFID tienen **firmas manuscritas de docentes**: recortar o difuminar la zona de firmas
  antes de publicar. Nombre del entrenador, título, fecha y logos de emisores pueden quedar visibles.
- Logo: las variantes de `public/brand/` ya se generaron sin metadatos; el original queda en
  `assets/brand/` (fuera de `public/`, no se sirve).
- Si el repositorio va a ser público, agregar `/certificados/` a `.gitignore` antes del primer push.
- Nombres de archivo en minúsculas, sin espacios ni tildes (`master-personal-trainer.webp`).

## 6. Imágenes

- Siempre `next/image` con `alt`, `sizes` y dimensiones. LCP del hero: `preload` o `fetchPriority="high"`
  (en Next 16 `priority` está deprecado).
- Sin `remotePatterns` (todo es local). `dangerouslyAllowSVG` queda en `false`: el logo SVG se usa con
  `<img>` directo o como componente inline, no por el optimizador.
- `qualities` es obligatorio desde Next 16; agregar valores solo si se usan.

## 7. Scripts de terceros, metadata y JSON-LD

- Por defecto, **cero** scripts de terceros. Si el cliente pide analytics: proveedor respetuoso de la
  privacidad, cargado con `next/script`, y CSP ampliada solo con su host exacto.
- JSON-LD (`Person` / `LocalBusiness`) es el único uso permitido de `dangerouslySetInnerHTML`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
/>
```

- `metadata` con `title`, `description`, `openGraph` y `metadataBase` del dominio real; no exponer
  rutas internas ni nombres de archivos fuente.

## 8. Dependencias

- Runtime: solo `next`, `react`, `react-dom`. Cada dependencia nueva necesita justificación explícita
  (el `settings.json` del proyecto pide confirmación para `npm install`).
- Versiones exactas y `package-lock.json` versionado. Antes de deploy: `npm audit --omit=dev`.

## 9. Verificación antes de cerrar o desplegar

1. `npx tsc --noEmit` y `npm run lint` sin errores (el hook Stop los corre si hay cambios).
2. `npm run build` sin advertencias de seguridad ni de imágenes.
3. `npm run start` → `curl -sI http://localhost:3000` muestra CSP, HSTS, nosniff, Referrer-Policy,
   Permissions-Policy y **no** muestra `x-powered-by`.
4. Consola del navegador sin violaciones CSP (hero con video, certificados, CTA).
5. Cada CTA abre `wa.me` en pestaña nueva con el mensaje correcto y `window.opener === null`.
6. Ningún PDF en `public/`; fotos y videos sin metadatos (`ffprobe`).
7. Tras el deploy: revisar headers en securityheaders.com.
