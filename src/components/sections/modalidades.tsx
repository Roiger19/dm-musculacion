import type { CSSProperties } from "react";
import { perfil } from "@/data/perfil";

const stagger = (i: number) => ({ "--reveal-delay": `${i * 50}ms` }) as CSSProperties;

export function Modalidades() {
  const { modalidades } = perfil;

  return (
    <section id="modalidades" data-tone="dark" className="bg-carbon py-20 text-blanco md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-accent text-xs font-semibold tracking-[0.16em] text-menta uppercase sm:text-sm" data-reveal>
          {modalidades.eyebrow}
        </p>
        <h2
          className="mt-4 max-w-3xl font-display text-[clamp(2rem,3.4vw+0.8rem,3rem)] leading-[1.08] font-bold tracking-[-0.01em]"
          data-reveal
        >
          {modalidades.titulo}
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          {modalidades.items.map((m, i) => (
            <article key={m.id} className="border-t border-blanco/15 pt-7" data-reveal style={stagger(i)}>
              <h3 className="font-display text-3xl font-bold text-menta sm:text-4xl">{m.titulo}</h3>
              <p className="mt-4 max-w-md text-[1.0625rem]">{m.texto}</p>
              <p className="mt-4 text-sm font-medium text-esmeralda">{m.detalle}</p>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="font-accent text-xs font-semibold tracking-[0.16em] text-menta uppercase sm:text-sm" data-reveal>
            Cómo empezamos
          </h3>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-blanco/15 md:grid-cols-3">
            {modalidades.pasos.map((paso, i) => (
              <li key={paso.titulo} className="bg-carbon p-6 sm:p-8" data-reveal style={stagger(i)}>
                <span className="font-display text-sm font-bold text-esmeralda tabular-nums" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-lg font-semibold">{paso.titulo}</p>
                <p className="mt-2 text-[0.95rem]">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
