# Medios fuente (no se publican)

Dejá acá los archivos **originales**, tal como salen del celular o la cámara. Esta carpeta está en
`.gitignore` (salvo este archivo) y nunca se sirve en la web.

```
medios-fuente/
  fotos/    1–2 retratos de Daniel (JPG, PNG o WebP)
  videos/   clips de entrenamiento (MP4, MOV, M4V o WebM)
```

Después corré:

```bash
npm run medios
```

El script (`scripts/optimizar-medios.mjs`, usa ffmpeg) genera:

- `public/images/<nombre>.webp`: foto de 1600 px como máximo, sin EXIF ni GPS.
- `public/videos/<nombre>-720.mp4`: H.264, 720p, sin audio ni metadatos, listo para streaming.
- `public/videos/<nombre>-poster.webp`: imagen de portada del video.

Al final imprime las líneas listas para pegar en `src/data/perfil.ts` y `src/data/videos.ts`.

## Recomendaciones de material

- **Nombres**: descriptivos, por ejemplo `retrato-gimnasio.jpg` o `press-banca.mov`. El script quita tildes
  y espacios.
- **Video del hero**: si el nombre empieza con `hero` (por ejemplo `hero-ambiente.mov`), se recorta a 15 s.
  Conviene que sea un plano general del gimnasio, con poco movimiento de cámara y sin texto encima.
- **Clips de ejercicios**: de 2 a 4 clips de 5 a 20 s cada uno, con un solo ejercicio por clip y buena luz.
  Todos en la misma orientación: vertical 9:16 o todos horizontales.
- **Fotos**: retrato real, con luz natural o del gimnasio. Sin filtros de color, stickers ni texto.
- **iPhone**: si las fotos salen en HEIC, exportalas como JPG ("Más compatible" en
  Ajustes → Cámara → Formatos) antes de copiarlas acá.
- **Peso**: cada video final tiene que pesar 4 MB o menos. Si el script avisa que se pasa, recortalo.
