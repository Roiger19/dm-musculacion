#!/usr/bin/env node
/**
 * Optimiza fotos y videos de medios-fuente/ y los deja listos en public/.
 * Requiere ffmpeg y ffprobe en el PATH. Sin dependencias de npm.
 *
 *   medios-fuente/fotos/*.jpg|jpeg|jfif|png|webp  → public/images/<nombre>.webp   (≤1600 px, sin EXIF/GPS)
 *   medios-fuente/videos/*.mp4|mov|m4v|webm  → public/videos/<nombre>-720.mp4 + <nombre>-poster.webp
 *                                              (H.264, lado corto 720 px, sin audio ni metadatos, faststart)
 *   Un video cuyo nombre empiece con "hero" se recorta a 15 s (clip de fondo del hero).
 *
 * Uso: npm run medios            (procesa solo lo nuevo o modificado)
 *      npm run medios -- --forzar (reprocesa todo)
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { extname, join, parse } from "node:path";

const root = process.cwd();
const SRC_FOTOS = join(root, "medios-fuente", "fotos");
const SRC_VIDEOS = join(root, "medios-fuente", "videos");
const OUT_FOTOS = join(root, "public", "images");
const OUT_VIDEOS = join(root, "public", "videos");
const forzar = process.argv.includes("--forzar");

const FOTO_EXT = new Set([".jpg", ".jpeg", ".jfif", ".png", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".m4v", ".webm"]);
const MAX_VIDEO_MB = 4;

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8" });
  if (r.error) throw new Error(`No se encontró ${cmd}. ¿Está instalado y en el PATH?`);
  if (r.status !== 0) throw new Error(`${cmd} falló:\n${r.stderr.trim().split("\n").slice(-8).join("\n")}`);
  return r.stdout;
}

function slug(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function probe(file) {
  const out = run("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height:format=duration,size",
    "-of", "json", file,
  ]);
  const j = JSON.parse(out);
  return {
    width: j.streams[0].width,
    height: j.streams[0].height,
    duracion: Number(j.format.duration ?? 0),
    mb: Number(j.format.size ?? statSync(file).size) / 1024 / 1024,
  };
}

const vigente = (src, out) => !forzar && existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;
const listar = (dir, exts) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => exts.has(extname(f).toLowerCase())).sort() : [];

const fotos = [];
const videos = [];
const avisos = [];

// ---------- Fotos ----------
mkdirSync(OUT_FOTOS, { recursive: true });
for (const file of listar(SRC_FOTOS, FOTO_EXT)) {
  const src = join(SRC_FOTOS, file);
  const nombre = slug(parse(file).name);
  const out = join(OUT_FOTOS, `${nombre}.webp`);
  if (!vigente(src, out)) {
    process.stdout.write(`Foto  ${file} → public/images/${nombre}.webp\n`);
    run("ffmpeg", [
      "-v", "error", "-y", "-i", src,
      "-map_metadata", "-1",
      "-vf", "scale='min(1600,iw)':-2",
      "-c:v", "libwebp", "-quality", "82", "-frames:v", "1",
      out,
    ]);
  }
  const { width, height } = probe(out);
  fotos.push({ src: `/images/${nombre}.webp`, width, height });
}

// ---------- Videos ----------
mkdirSync(OUT_VIDEOS, { recursive: true });
for (const file of listar(SRC_VIDEOS, VIDEO_EXT)) {
  const src = join(SRC_VIDEOS, file);
  const nombre = slug(parse(file).name);
  const esHero = nombre.startsWith("hero");
  const out = join(OUT_VIDEOS, `${nombre}-720.mp4`);
  const poster = join(OUT_VIDEOS, `${nombre}-poster.webp`);

  if (!vigente(src, out)) {
    process.stdout.write(`Video ${file} → public/videos/${nombre}-720.mp4${esHero ? " (hero, ≤15 s)" : ""}\n`);
    run("ffmpeg", [
      "-v", "error", "-y", "-i", src,
      ...(esHero ? ["-t", "15"] : []),
      "-map_metadata", "-1", "-map_chapters", "-1",
      "-an",
      // Lado corto a 720 px (sirve para horizontal y vertical) y máximo 30 fps.
      "-vf", "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)',fps='min(30,source_fps)'",
      "-c:v", "libx264", "-preset", "slow", "-crf", esHero ? "28" : "26",
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      out,
    ]);
    const dur = probe(out).duracion;
    run("ffmpeg", [
      "-v", "error", "-y", "-ss", String(Math.min(1, dur / 2)), "-i", out,
      "-frames:v", "1", "-map_metadata", "-1",
      "-c:v", "libwebp", "-quality", "80",
      poster,
    ]);
  }

  const info = probe(out);
  if (info.mb > MAX_VIDEO_MB) {
    avisos.push(`${nombre}-720.mp4 pesa ${info.mb.toFixed(1)} MB (objetivo ≤ ${MAX_VIDEO_MB} MB): recortalo o acortalo.`);
  }
  if (esHero && info.duracion > 15.5) avisos.push(`${nombre}: el clip del hero dura más de 15 s.`);
  videos.push({ nombre, esHero, ...info });
}

// ---------- Resumen para pegar en src/data/ ----------
if (!fotos.length && !videos.length) {
  console.log("No hay archivos en medios-fuente/fotos ni medios-fuente/videos.");
  process.exit(0);
}

if (fotos.length) {
  console.log("\n// src/data/perfil.ts → fotos (completá el alt):");
  for (const f of fotos) {
    console.log(`  { src: "${f.src}", alt: "TODO", width: ${f.width}, height: ${f.height} },`);
  }
}
if (videos.length) {
  console.log("\n// src/data/videos.ts (completá los títulos):");
  for (const v of videos) {
    console.log(
      `  { id: "${v.nombre}", titulo: "TODO", src: "/videos/${v.nombre}-720.mp4", poster: "/videos/${v.nombre}-poster.webp", width: ${v.width}, height: ${v.height}, duracionSeg: ${Math.round(v.duracion)} },${v.esHero ? "  // → heroClip" : ""}  // ${v.mb.toFixed(1)} MB`,
    );
  }
}
if (avisos.length) console.log(`\nAvisos:\n- ${avisos.join("\n- ")}`);
