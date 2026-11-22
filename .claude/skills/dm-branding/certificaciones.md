# Certificaciones de Daniel Alejandro Sánchez

Fuente: carpeta `certificados/`, depurada el 2026-11-21. Quedan **14 PDF, uno por credencial**.
Los 14 duplicados (versiones en inglés y versiones "Certificado de aprobación" de Gualda) se enviaron
a la Papelera de reciclaje de Windows; sus fechas exactas quedaron registradas abajo.

Emisor: **Gualda Training** (Argentina). Los certificados de diseño blanco llevan además el sello de
**ALIFID** (Alianza Latinoamericana de Instructores de Fitness y Deporte). Todos son de 2026.

## Credenciales principales (destacar)

| Credencial | Fecha | Archivo | Sello |
|---|---|---|---|
| Master Personal Trainer | abr 2026 | `Master Personal Trainer.pdf` | Gualda + ALIFID |
| Instructor Avanzado en Fitness y Actividad Física (integra Personal Trainer y Musculación, Musculación e Hipertrofia, Nutrición Deportiva, Funcional HIIT y GAP, Lesiones Deportivas) | abr 2026 | `INSTRUCTOR AVANZADO EN FITNESS Y ACTIVIDAD FÍSICA.pdf` | Gualda + ALIFID |

## Musculación e hipertrofia

| Credencial | Fecha | Archivo | Sello |
|---|---|---|---|
| Instructorado de Personal Trainer y Musculación | mar 2026 (20/03) | `Instructorado de Personal Trainer y Musculación (1).pdf` | Gualda + ALIFID |
| Instructor de Musculación y Especialista en Hipertrofia | abr 2026 (10/04) | `INSTRUCTORADO DE MUSCULACIÓN Y ESPECIALISTA EN HIPERTROFIA.pdf` | Gualda |
| Biomecánica | abr 2026 (10/04) | `BIOMECÁNICA.pdf` | Gualda |
| Guía de Entrenamiento de Glúteos | ago 2026 (07/08) | `ENTRENAMIENTO DE GLÚTEOS.pdf` | Gualda |
| Webinar "Hipertrofia y Fuerza: mitos, verdades y los métodos que realmente funcionan" (asistencia) | mar 2026 (26/03) | `Certificado #GualdaWebinar.pdf` | Gualda |

## Entrenamiento funcional

| Credencial | Fecha | Archivo | Sello |
|---|---|---|---|
| Instructor de Entrenamiento Funcional, HIIT y GAP (incluye Tabata, AMRAP, EMOM y circuitos) | mar 2026 (27/03) | `Instructor de Entrenamiento Funcional, HIIT y GAP.pdf` | Gualda + ALIFID |

## Salud, prevención y seguridad

| Credencial | Fecha | Archivo | Sello |
|---|---|---|---|
| Especialización en Salud para Personal Trainer | abr 2026 (17/04) | `Especialización en Salud para Personal Trainer.pdf` | Gualda + ALIFID |
| Lesiones Deportivas | abr 2026 (10/04) | `Lesiones Deportivas.pdf` | Gualda + ALIFID |
| Reanimación Cardiopulmonar (jornada según protocolo AHA, examen teórico aprobado) | mar 2026 (27/03) | `REANIMACIÓN CARDIOPULMONAR.pdf` | Gualda + ALIFID |

## Nutrición y recuperación

| Credencial | Fecha | Archivo | Sello |
|---|---|---|---|
| Nutrición Deportiva | abr 2026 (10/04) | `NUTRICIÓN DEPORTIVA.pdf` | Gualda + ALIFID |
| Sueño y Rendimiento | abr 2026 (17/04) | `CURSO SUEÑO Y RENDIMIENTO.pdf` | Gualda |

## Coaching online

| Credencial | Fecha | Archivo | Sello |
|---|---|---|---|
| Especialista en Entrenamiento Online (Programación de Entrenamiento Online) | abr 2026 (17/04) | `CURSO ESPECIALIZACIÓN EN ENTRENAMIENTO ONLINE.pdf` | Gualda |

## Reglas de presentación

- Los datos viven tipados en `src/data/estudios.ts` (título, emisor, sello, fecha ISO, área,
  imagen, `destacada`). La UI no hardcodea títulos.
- Orden: credenciales principales primero; después por área. El webinar va como mención menor (es asistencia).
- Fechas en formato "mes año" para uniformar.
- Emisor como "Gualda Training · sello ALIFID" solo donde la columna Sello lo indica; no afirmar avales
  que el documento no muestra.
- Los certificados con sello ALIFID incluyen firmas manuscritas de terceros (docentes): ver
  `nextjs-security` §5 antes de publicar imágenes.
- No se observaron DNI ni datos de contacto en los documentos; revisarlo de nuevo si el cliente agrega certificados.
