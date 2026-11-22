#!/usr/bin/env node
// Hook Stop — quality gate de DM Musculación.
// Bloquea el cierre de un turno (exit 2) si el proyecto viola reglas de marca o de
// seguridad, o si fallan `npx tsc --noEmit` / `npm run lint`. Solo corre cuando hay
// cambios sin commitear en código o configuración (para no penalizar turnos de consulta), y
// los chequeos de marca/seguridad se aplican solo a los archivos modificados.
// Reglas completas: .claude/skills/dm-branding y .claude/skills/nextjs-security.

import { execSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  input = {};
}
// Segunda pasada tras un bloqueo: no volver a bloquear para evitar bucles.
if (input.stop_hook_active) process.exit(0);

const WATCHED = [
  "src",
  "public",
  "proxy.ts",
  "next.config.ts",
  "package.json",
  "tsconfig.json",
  "eslint.config.mjs",
];

// Archivos con cambios sin commitear (incluye no versionados). null = sin git: se revisa todo.
let changedFiles = null;
try {
  const out = execSync(`git status --porcelain -z -uall -- ${WATCHED.join(" ")}`, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  const entries = out.split("\0").filter(Boolean);
  changedFiles = new Set();
  for (let i = 0; i < entries.length; i++) {
    const status = entries[i].slice(0, 2);
    changedFiles.add(entries[i].slice(3));
    if (/[RC]/.test(status)) i++; // con -z, la ruta original del rename va en la entrada siguiente
  }
} catch {
  changedFiles = null;
}
if (changedFiles && changedFiles.size === 0) process.exit(0);
// Los chequeos de marca y seguridad se aplican a los archivos tocados; tsc y lint, a todo el proyecto.
const isChanged = (rel) => changedFiles === null || changedFiles.has(rel);

const problems = [];
const report = (file, line, msg) =>
  problems.push(`${file}${line ? `:${line}` : ""} — ${msg}`);

// 1. Dependencias prohibidas: base de datos, ORM, auth, formularios.
const FORBIDDEN_DEPS = [
  "prisma", "@prisma/client", "drizzle-orm", "drizzle-kit", "mongoose", "mongodb",
  "typeorm", "sequelize", "knex", "pg", "mysql2", "sqlite3", "better-sqlite3",
  "@libsql/client", "@supabase/supabase-js", "firebase", "firebase-admin",
  "@vercel/postgres", "@neondatabase/serverless", "@planetscale/database",
  "redis", "ioredis", "@upstash/redis", "next-auth", "@auth/core", "better-auth",
  "@clerk/nextjs", "react-hook-form", "formik", "@tanstack/react-form",
  "@conform-to/react", "react-final-form",
];
try {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const name of FORBIDDEN_DEPS) {
    if (name in deps) {
      report("package.json", 0, `dependencia prohibida "${name}" (sin base de datos, ORM, auth ni formularios).`);
    }
  }
} catch {
  report("package.json", 0, "no se pudo leer o parsear.");
}

// 2. Análisis estático de src/.
const PALETTE = new Set(["9ce3cd", "172421", "ffffff", "fff", "5ab59b"]);
const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]);

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const lineOf = (text, index) => text.slice(0, index).split("\n").length;

// Devuelve el texto de la etiqueta JSX que contiene `index`, respetando llaves y comillas.
function enclosingTag(text, index) {
  const start = text.lastIndexOf("<", index);
  let depth = 0;
  let quote = null;
  for (let i = start + 1; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    else if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (ch === ">" && depth === 0) return text.slice(start, i + 1);
  }
  return text.slice(start);
}

const TW_DEFAULT_COLORS =
  /\b(?:bg|text|border|ring|ring-offset|fill|stroke|from|via|to|outline|decoration|divide|placeholder|caret|accent|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b|\b(?:bg|text|border|ring|fill|stroke|from|via|to|outline|divide)-(?:white|black)\b/g;
const HEAVY_SHADOW =
  /\b(?:shadow|drop-shadow|inset-shadow|text-shadow)-(?:lg|xl|2xl)\b|box-shadow:[^;]*\b(?:[2-9]\d|\d{3,})px/g;

for (const file of walk(join(root, "src"))) {
  const ext = extname(file);
  const rel = relative(root, file).replaceAll("\\", "/");
  if (!CODE_EXT.has(ext) || !isChanged(rel)) continue;
  const text = readFileSync(file, "utf8");
  const isMarkup = ext === ".tsx" || ext === ".jsx";
  let m;

  if (/^\s*["']use server["']/m.test(text)) {
    report(rel, 0, `"use server" prohibido: el sitio no tiene Server Actions ni mutaciones.`);
  }

  if (isMarkup) {
    const formRe = /<(form|input|textarea|select)\b/g;
    while ((m = formRe.exec(text))) {
      report(rel, lineOf(text, m.index), `<${m[1]}> prohibido: el contacto es solo por WhatsApp.`);
    }

    const blankRe = /target\s*=\s*(?:"_blank"|'_blank'|\{\s*["'`]_blank["'`]\s*\})/g;
    while ((m = blankRe.exec(text))) {
      const tag = enclosingTag(text, m.index);
      if (!/noopener/.test(tag) || !/noreferrer/.test(tag)) {
        report(rel, lineOf(text, m.index), `target="_blank" sin rel="noopener noreferrer".`);
      }
    }

    if (/dangerouslySetInnerHTML/.test(text) && !/application\/ld\+json/.test(text)) {
      report(rel, 0, "dangerouslySetInnerHTML solo se permite para JSON-LD escapado.");
    }
  }

  const jsUrlRe = /["'`]\s*javascript:/gi;
  while ((m = jsUrlRe.exec(text))) {
    report(rel, lineOf(text, m.index), "URL javascript: prohibida.");
  }

  const hexRe = /#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;
  while ((m = hexRe.exec(text))) {
    if (!PALETTE.has(m[1].toLowerCase())) {
      report(rel, lineOf(text, m.index), `color ${m[0]} fuera de la paleta oficial (#9CE3CD, #172421, #FFFFFF, #5AB59B).`);
    }
  }

  TW_DEFAULT_COLORS.lastIndex = 0;
  while ((m = TW_DEFAULT_COLORS.exec(text))) {
    report(rel, lineOf(text, m.index), `clase "${m[0]}" usa la paleta default de Tailwind; usar tokens menta/carbon/blanco/esmeralda.`);
  }

  HEAVY_SHADOW.lastIndex = 0;
  while ((m = HEAVY_SHADOW.exec(text))) {
    report(rel, lineOf(text, m.index), `sombra pesada "${m[0]}" prohibida por el manual de marca.`);
  }
}

// 3. public/ se sirve tal cual: nada de PDFs (los certificados se exportan a imagen).
for (const file of walk(join(root, "public"))) {
  const rel = relative(root, file).replaceAll("\\", "/");
  if (extname(file).toLowerCase() === ".pdf" && isChanged(rel)) {
    report(rel, 0, "PDF en public/: exportar el certificado a WebP sin metadatos.");
  }
}

// 4. Tipos y lint.
function run(label, command) {
  const r = spawnSync(command, { cwd: root, shell: true, encoding: "utf8" });
  if (r.status !== 0) {
    const out = `${r.stdout ?? ""}${r.stderr ?? ""}`.trim().split("\n").slice(-40).join("\n");
    problems.push(`${label} falló:\n${out}`);
  }
}
run("npx tsc --noEmit", "npx tsc --noEmit");
run("npm run lint", "npm run lint");

if (problems.length) {
  process.stderr.write(
    `Quality gate DM Musculación: ${problems.length} problema(s). Corregí antes de cerrar la tarea.\n- ` +
      problems.join("\n- ") +
      "\n",
  );
  process.exit(2);
}
process.exit(0);
