import type { CSSProperties } from "react";
import { clips } from "@/data/videos";
import { VideoClip } from "../video-clip";

const stagger = (i: number) => ({ "--reveal-delay": `${Math.min(i, 4) * 50}ms` }) as CSSProperties;

/** No se renderiza hasta que haya clips cargados en src/data/videos.ts. Pensado para clips verticales. */
export function Videos() {
  if (clips.length === 0) return null;

  return (
    <section id="videos" data-tone="dark" className="bg-carbon py-20 text-blanco md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
        <div>
          <p className="font-accent text-xs font-semibold tracking-[0.16em] text-menta uppercase sm:text-sm" data-reveal>
            Entrenamiento
          </p>
          <h2
            className="mt-4 font-display text-[clamp(2rem,3.4vw+0.8rem,3rem)] leading-[1.08] font-bold tracking-[-0.01em]"
            data-reveal
          >
            Así se entrena.
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem]" data-reveal>
            Técnica, control y rango completo en cada repetición. Tocá un video para verlo.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:w-[560px]">
          {clips.map((clip, i) => (
            <li key={clip.id} data-reveal style={stagger(i)}>
              <VideoClip clip={clip} />
              <p className="mt-3 font-display text-[0.95rem] font-semibold text-menta sm:text-base">{clip.titulo}</p>
              {clip.descripcion && <p className="mt-0.5 text-sm">{clip.descripcion}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
