import type { CSSProperties } from "react";
import {
  destacadas,
  emisorLabel,
  formatearFecha,
  porArea,
  totalCertificaciones,
} from "@/data/estudios";
import { WhatsappButton } from "../whatsapp-button";

const stagger = (i: number) => ({ "--reveal-delay": `${Math.min(i, 4) * 50}ms` }) as CSSProperties;

export function Formacion() {
  const grupos = porArea();

  return (
    <section id="formacion" className="bg-blanco py-20 text-carbon md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-accent text-xs font-semibold tracking-[0.16em] uppercase sm:text-sm" data-reveal>
            Formación
          </p>
          <h2
            className="mt-4 font-display text-[clamp(2rem,3.4vw+0.8rem,3rem)] leading-[1.08] font-bold tracking-[-0.01em]"
            data-reveal
          >
            Formación que respalda cada plan.
          </h2>
          <p className="mt-6 max-w-prose text-[1.0625rem]" data-reveal>
            {totalCertificaciones} certificaciones de Gualda Training en musculación, salud, nutrición y entrenamiento
            online. Varias llevan además el sello de ALIFID, la Alianza Latinoamericana de Instructores de Fitness y
            Deporte.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {destacadas().map((c, i) => (
            <li key={c.id} className="flex flex-col rounded-2xl bg-menta p-7 sm:p-9" data-reveal style={stagger(i)}>
              <span className="font-accent text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
                Credencial principal
              </span>
              <h3 className="mt-4 font-display text-2xl leading-tight font-bold sm:text-[1.75rem]">{c.titulo}</h3>
              {c.detalle && <p className="mt-3 text-[0.95rem]">{c.detalle}</p>}
              <div className="mt-auto pt-6">
              <p className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-carbon/20 pt-4 text-sm font-medium">
                <span>{emisorLabel(c)}</span>
                <time dateTime={c.fecha} className="tabular-nums">
                  {formatearFecha(c.fecha)}
                </time>
              </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 gap-x-16 lg:columns-2">
          {grupos.map((g) => (
            <div key={g.area} className="mb-12 break-inside-avoid last:mb-0">
              <h3 className="font-accent text-xs font-semibold tracking-[0.16em] uppercase" data-reveal>
                {g.titulo}
              </h3>
              <ul className="mt-4 border-b border-carbon/15">
                {g.items.map((c, i) => (
                  <li
                    key={c.id}
                    className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-t border-carbon/15 py-4"
                    data-reveal
                    style={stagger(i)}
                  >
                    <div>
                      <p className="font-display font-semibold">
                        {c.titulo}
                        {c.tipo === "asistencia" && (
                          <span className="ml-2 align-middle font-accent text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
                            · Asistencia
                          </span>
                        )}
                      </p>
                      {c.detalle && <p className="mt-1 text-sm">{c.detalle}</p>}
                      <p className="mt-1 text-sm text-carbon/75">{emisorLabel(c)}</p>
                    </div>
                    <time dateTime={c.fecha} className="pt-0.5 text-sm font-medium whitespace-nowrap tabular-nums">
                      {formatearFecha(c.fecha)}
                    </time>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-16 flex flex-col gap-6 rounded-2xl border border-carbon/15 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
          data-reveal
        >
          <p className="max-w-md font-display text-xl leading-snug font-semibold sm:text-2xl">
            Entrená con un plan hecho sobre esta base.
          </p>
          <WhatsappButton placement="formacion" variant="carbon" className="w-full sm:w-auto">
            Consultá tu entrenamiento
          </WhatsappButton>
        </div>
      </div>
    </section>
  );
}
